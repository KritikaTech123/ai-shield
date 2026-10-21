"""AI-SHIELD backend (Samiksha). Run: uvicorn main:app --reload --port 8000"""
import json
import threading

import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import db
import scoring
from attacks import ATTACKS, CATEGORIES
from judge import judge

app = FastAPI(title="AI-SHIELD")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])
db.init()


class StartTest(BaseModel):
    target_url: str = "http://localhost:9000/chat"
    categories: list[str] | None = None


def run_attacks(test_id: int, target_url: str, attacks: list[dict]):
    try:
        for a in attacks:
            try:
                resp = requests.post(target_url, json={"message": a["prompt"]}, timeout=15)
                data = resp.json()
                reply, tool_calls = data.get("reply", ""), data.get("tool_calls", [])
            except Exception as e:  # target down / bad response
                reply, tool_calls = f"[error calling agent: {e}]", []
            verdict, evidence = judge(a, reply, tool_calls)
            db.add_result(test_id, {
                "category": a["category"], "attack": a["name"], "prompt": a["prompt"],
                "reply": reply, "verdict": verdict, "evidence": evidence, "severity": a["severity"],
            })
        db.set_status(test_id, "done")
    except Exception:
        db.set_status(test_id, "failed")


@app.get("/categories")
def categories():
    return CATEGORIES


@app.post("/tests")
def start_test(body: StartTest):
    chosen = [a for a in ATTACKS if not body.categories or a["category"] in body.categories]
    if not chosen:
        raise HTTPException(400, "No attacks match those categories")
    test_id = db.create_test(body.target_url, body.categories or CATEGORIES, len(chosen))
    threading.Thread(target=run_attacks, args=(test_id, body.target_url, chosen), daemon=True).start()
    return {"id": test_id}


def build(test_id: int):
    found = db.get_test(test_id)
    if not found:
        raise HTTPException(404, "Test not found")
    t, rows = found
    out = {"id": t["id"], "status": t["status"], "target_url": t["target_url"],
           "done": len(rows), "total": t["total"], "results": rows}
    if rows:
        out.update(scoring.compute(rows))
    return out


@app.get("/tests/{test_id}")
def get_test(test_id: int):
    return build(test_id)


@app.get("/tests/{test_id}/report")
def report(test_id: int):
    data = build(test_id)
    fixes = {
        "Prompt injection": "Treat user text as data, not instructions; add input filtering.",
        "Jailbreaks": "Add output checks and refuse persona/role-play bypasses.",
        "Data leakage": "Never put secrets in prompts; redact outputs for secret patterns.",
        "System prompt leakage": "Refuse requests to repeat instructions; do not echo the prompt.",
        "Tool misuse": "Allow-list tools, validate arguments, require approval for risky actions.",
        "Unsafe output": "Add a safety classifier on responses.",
    }
    data["recommended_fixes"] = [
        {"category": c["category"], "fix": fixes.get(c["category"], "Review manually.")}
        for c in data.get("categories", []) if c["succeeded"] > 0
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
            if rows:
                item.update(scoring.compute(rows))
            else:
                item["score"] = 0
                item["risk"] = "Low"
        out.append(item)
    return out


@app.get("/attacks")
def get_attack_library():
    return ATTACKS


@app.get("/health")
def health():
    return {"status": "ok"}

