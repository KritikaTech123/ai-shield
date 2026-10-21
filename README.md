# 🛡️ AI-SHIELD: Automated Security Testing Lab for AI Agents

![License](https://img.shields.io/badge/License-MIT-green)
![Python](https://img.shields.io/badge/Python-3.11+-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-backend-009688)
![React](https://img.shields.io/badge/React-Vite-61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)
![SQLite](https://img.shields.io/badge/SQLite-storage-003B57)

> **Attack AI before attackers do.** Trusted, repeatable security testing for every AI agent before it goes live.

---

## 📌 Executive Summary

AI-SHIELD is an automated red-team platform for AI agents, built by **Team STRIVERS** for **Hack in Hills** (Exido · Web3 India · Builder Base).

AI agents now handle real data and call real tools, but most teams never test them against prompt injection, secret leakage or tool misuse before launch. AI-SHIELD turns that testing into a one-click flow: **attack → judge → score → report**.

```
Configure target  →  Attack (Red Team)  →  Judge (Blue Team)  →  Risk score  →  Report + fixes
```

---

## ❗ Problem vs ✅ Solution

| ❗ Problem | ✅ AI-SHIELD Solution |
|---|---|
| Teams ship AI agents without security testing | One-click automated attack suite against any agent endpoint |
| Manual red-teaming is slow and inconsistent | Repeatable library of attacks across 6 categories |
| Hard to tell if an attack actually worked | Judge checks replies for leaked secrets, system prompt exposure, tool abuse and followed injections |
| Results are hard to explain to non-experts | Severity-weighted **0–100 risk score** with Low / Medium / High / Critical label |
| Findings without next steps | Report with recommended fixes per category |
| Testing a live agent is risky | Fake secrets and a sandboxed demo agent for safe testing |

---

## 🚀 Key Features

### ⚔️ Red-Team Attack Engine
- 15 attack prompts across 6 categories (easy to extend in `backend/attacks.py`)
- Each attack carries a **severity weight** (1 low to 4 critical)
- Works against any agent that follows a simple `POST /chat` contract

### 🧪 Blue-Team Judge
- Rule-based verdicts: **Blocked** or **Leaked**
- Detects leaked secrets, system prompt exposure, dangerous tool calls and followed malicious instructions
- Hook ready for an **LLM-based judge** (`llm_judge()` in `backend/judge.py`)

### 📊 Risk Scoring
```
Score = 100 × (severity weight of successful attacks) ÷ (severity weight of all attacks)
```

| Score | Risk |
|---|---|
| 0–19 | 🟢 Low |
| 20–39 | 🟡 Medium |
| 40–69 | 🟠 High |
| 70–100 | 🔴 Critical |

### 🖥️ Live Dashboard
- **Screen 1:** configure the target and choose attack categories
- **Screen 2:** live attack log with progress bar
- **Screen 3:** score, category breakdown, recommended fixes, print/export

### 🎯 Demo Victim Agent
- A mock support bot with deliberate weaknesses, so you always have something to find
- Needs no API key, so anyone can run the demo

### 🗄️ Stored Results
- Every run and result saved in SQLite for the report and history

---

## 🎯 Attack Categories

| Category | What we test |
|---|---|
| 💉 Prompt injection | Can a user override the agent's instructions? |
| 🎭 Jailbreaks | Can role-play or framing bypass its rules? |
| 🔑 Data leakage | Does it reveal secrets, keys or credentials? |
| 📜 System prompt leakage | Does it reveal its hidden instructions? |
| 🛠️ Tool misuse | Can it be tricked into dangerous tool calls? |
| ☣️ Unsafe output | Does it produce harmful content on request? |

---

## 🏗️ System Architecture

```mermaid
flowchart LR
    U[👤 User] --> F[Frontend<br/>React + Tailwind]
    F -->|REST| B[Backend<br/>FastAPI]
    B --> A[Attack Library]
    B --> J[Judge<br/>Rules + LLM hook]
    B --> S[Scoring Engine]
    B --> D[(SQLite)]
    A -->|POST /chat| T[🎯 Target Agent]
    T -->|reply + tool_calls| J
    J --> S
    S --> F
```

| Folder | Purpose | Main files |
|---|---|---|
| `agent/` | Demo victim chatbot | `victim.py` |
| `backend/` | Attacks, judge, scoring, API, database | `main.py`, `attacks.py`, `judge.py`, `scoring.py`, `db.py` |
| `frontend/` | Dashboard | `src/App.jsx`, `src/api.js` |

### 🔌 Agent ↔ Backend contract

Request sent to the target:
```json
{ "message": "attack prompt here" }
```
Expected response:
```json
{ "reply": "agent's answer", "tool_calls": [{ "tool": "name", "args": {} }] }
```

### 🌐 API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/health` | System health check, returns `{ "status": "ok" }` |
| GET | `/categories` | List attack categories (OWASP Top 10 LLM vectors) |
| GET | `/attacks` | Full catalog of attack scenarios, severities, and objectives |
| POST | `/tests` | Start an adversarial test run, returns `{ "id": 1, "total": 15 }` |
| GET | `/tests` | Audit history of past security scans |
| GET | `/tests/{id}` | Progress and real-time result stream of a run |
| GET | `/tests/{id}/report` | Final risk score, category breakdown, evidence, and fixes |

Interactive OpenAPI docs: http://localhost:8000/docs


---

## ⚙️ Getting Started

### Requirements
- Python 3.11+
- Node.js (LTS)
- Git

### 1. Clone
```bash
git clone https://github.com/KritikaTech123/ai-shield
cd ai-shield
```

### 2. Run (3 terminals)

**Demo agent (port 9000)**
```bash
cd agent
pip install fastapi uvicorn requests
python -m uvicorn victim:app --port 9000
```

**Backend (port 8000)**
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

**Frontend Option A: Web Development Suite (port 3000)**
```bash
cd ai-shield-web-development-suite
npm install
npm run dev
```

**Frontend Option B: React Vite App (port 5173)**
```bash
cd frontend
npm install
npm run dev
```

### 3. Use it
- Open **http://localhost:3000** (or **http://localhost:5173**).
- Connect to the demo agent at `http://localhost:9000/chat`.
- Click **Run security test** or **START SECURITY TEST** to trigger the red-team attack simulation, blue-team inspection, deterministic risk scoring, and security report generation.

---

## 👥 Team STRIVERS

| Member | Role |
|---|---|
| **Madiwalappa Hanchinamani** | Team Leader, AI & Security |
| **Kritika K** | Frontend & UI/UX |
| **Samiksha** | Backend & Database |

---

## 🗺️ Roadmap

- [x] Attack library, rule-based judge, scoring
- [x] FastAPI backend with SQLite storage
- [x] 3-screen dashboard
- [ ] LLM-based judge (AI Blue Team)
- [ ] Larger attack library and custom attacks
- [ ] Real LLM-powered demo agent
- [ ] Docker sandbox for isolated attack runs
- [ ] PostgreSQL storage
- [ ] PDF report export
- [ ] Authentication and test history

---

## ⚠️ Responsible Use

Only test AI agents you own or have written permission to test. AI-SHIELD is built for **defensive** security testing. The demo agent and its secrets are fake.

---

## 📄 License

MIT (add a `LICENSE` file to the repo before making it public).
