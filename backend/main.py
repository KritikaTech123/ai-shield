"""AI-SHIELD backend (Samiksha). Run: uvicorn main:app --reload --port 8000"""
import json
import time
import threading

import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import db
import scoring
from attacks import ATTACKS, CATEGORIES, generate_test_cases
from judge import judge

app = FastAPI(title="AI-SHIELD API", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
db.init()


class StartTest(BaseModel):
    target_url: str = "http://localhost:9000/chat"
    categories: list[str] | None = None
    num_test_cases: int = 15
    mode: str = "Quick Scan"


def run_attacks(test_id: int, target_url: str, attacks: list[dict]):
    try:
        for idx, a in enumerate(attacks):
            try:
                resp = requests.post(
                    target_url,
                    json={"message": a["prompt"]},
                    timeout=10,
                )
                data = resp.json()
                reply = data.get("reply", "")
                tool_calls = data.get("tool_calls", [])
            except Exception as e:
                # If target is down or timeout, mark graceful simulation / connection error
                reply = f"[Target Response Error: {e}]"
                tool_calls = []

            verdict, evidence, observed = judge(a, reply, tool_calls)

            db.add_result(
                test_id,
                {
                    "category": a["category"],
                    "attack": a["name"],
                    "prompt": a["prompt"],
                    "reply": reply,
                    "verdict": verdict,
                    "evidence": evidence,
                    "severity": a["severity"],
                    "expected_safe": a.get("expected_safe", "Maintain guardrails and policy limits."),
                    "observed": observed,
                    "fix": a.get("fix", "Implement input sanitization and safety classifiers."),
                },
            )
            # Short dynamic pacing so live progress is visible
            time.sleep(0.35)

        db.set_status(test_id, "done")
    except Exception as e:
        print(f"Error in test {test_id}: {e}")
        db.set_status(test_id, "failed")


@app.get("/categories")
def get_categories():
    return CATEGORIES


@app.get("/attacks")
def get_attacks():
    return ATTACKS


@app.post("/tests")
def start_test(body: StartTest):
    # Support 10, 30, 60 or custom test case counts
    count = body.num_test_cases or (30 if "Full" in body.mode else 15)
    chosen = generate_test_cases(body.categories, count)

    test_id = db.create_test(body.target_url, body.categories or CATEGORIES, len(chosen))
    threading.Thread(
        target=run_attacks,
        args=(test_id, body.target_url, chosen),
        daemon=True,
    ).start()
    return {"id": test_id, "total": len(chosen), "mode": body.mode}


def build(test_id: int):
    found = db.get_test(test_id)
    if not found:
        raise HTTPException(404, "Test not found")
    t, rows = found
    is_simulated = "localhost:9000" in t.get("target_url", "") or "demo" in t.get("target_url", "").lower()
    out = {
        "id": t["id"],
        "scan_id": f"AIS-2026-{t['id']:04d}",
        "status": t["status"],
        "target_url": t["target_url"],
        "is_simulated": is_simulated,
        "done": len(rows),
        "total": t["total"],
        "created": t.get("created", ""),
        "results": rows,
    }
    if rows:
        out.update(scoring.compute(rows))
        blocked = sum(1 for r in rows if r["verdict"] == "blocked")
        leaked = sum(1 for r in rows if r["verdict"] == "leaked")
        out["blocked_attacks"] = blocked
        out["successful_attacks"] = leaked
    else:
        out.update({"score": 0, "risk": "Low", "categories": [], "blocked_attacks": 0, "successful_attacks": 0})
    return out


@app.get("/tests/{test_id}")
def get_test(test_id: int):
    return build(test_id)


@app.get("/tests/{test_id}/report")
def report(test_id: int):
    data = build(test_id)
    fixes = {
        "Prompt Injection": "Treat user text as data, not instructions; isolate system instructions with delimited message roles.",
        "Jailbreaks & Role-Play": "Add output moderation classifiers and enforce hard policy boundaries that cannot be bypassed via persona play.",
        "Sensitive Data Leakage": "Never store or embed credentials in LLM prompts; redact API keys, tokens, and PII via automated regex filters.",
        "System Prompt Leakage": "Explicitly instruct the model to conceal system configuration and decline prompt repetition requests.",
        "Tool & API Misuse": "Enforce strict allow-lists, authenticate tool calls, and require human approval before destructive actions.",
        "Unsafe Output": "Integrate an automated safety classifier on outbound completions to filter hazardous content.",
    }
    data["recommended_fixes"] = [
        {"category": c["category"], "fix": fixes.get(c["category"], "Review attack findings and tighten safety guardrails.")}
        for c in data.get("categories", [])
        if c.get("succeeded", 0) > 0
    ]
    return data


@app.get("/tests")
def list_tests():
    raw_tests = db.get_all_tests()
    out = []
    for t in raw_tests:
        found = db.get_test(t["id"])
        item = dict(t)
        if isinstance(item.get("categories"), str):
            try:
                item["categories"] = json.loads(item["categories"])
            except Exception:
                pass
        if found:
            _, rows = found
            item["done"] = len(rows)
            item["scan_id"] = f"AIS-2026-{t['id']:04d}"
            item["is_simulated"] = "localhost:9000" in t.get("target_url", "") or "demo" in t.get("target_url", "").lower()
            if rows:
                item.update(scoring.compute(rows))
                item["blocked_attacks"] = sum(1 for r in rows if r["verdict"] == "blocked")
                item["successful_attacks"] = sum(1 for r in rows if r["verdict"] == "leaked")
            else:
                item["score"] = 0
                item["risk"] = "Low"
                item["blocked_attacks"] = 0
                item["successful_attacks"] = 0
        out.append(item)
    return out


@app.get("/health")
def health():
    return {"status": "ok"}
