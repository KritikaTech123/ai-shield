# AI-SHIELD prototype (Team STRIVERS)

Automated security testing lab for AI agents: **attack -> judge -> score -> report**.

```
ai-shield/
  agent/     demo "victim" chatbot with deliberate weaknesses   (Madiwalappa)
  backend/   attacks, judge, scoring, API, SQLite               (Madiwalappa + Samiksha)
  frontend/  React + Tailwind dashboard, 3 screens              (Kritika)
```

## Run it (3 terminals, from the ai-shield folder)

**Terminal 1 - demo agent (port 9000)**
```
cd agent
pip install fastapi uvicorn requests
python -m uvicorn victim:app --port 9000
```

**Terminal 2 - backend (port 8000)**
```
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```
Test it at http://localhost:8000/docs

**Terminal 3 - frontend (port 5173)**
```
cd frontend
npm install
npm run dev
```
Open http://localhost:5173, keep the defaults, click **Run security test**.

## Who edits what

| File | Owner | Next task |
|---|---|---|
| `agent/victim.py` | Madiwalappa | Replace the mock `respond()` with a real LLM call |
| `backend/attacks.py` | Madiwalappa | Add more attack prompts |
| `backend/judge.py` | Madiwalappa | Fill in `llm_judge()` (AI Blue-Team) |
| `backend/main.py`, `db.py` | Samiksha | Move SQLite to PostgreSQL (optional), add Docker |
| `frontend/src/App.jsx` | Kritika | Polish the design, match the slide colours |

## Contract between agent and backend

The backend sends `POST <target_url>` with `{"message": "..."}` and expects
`{"reply": "...", "tool_calls": [{"tool": "name", "args": {}}]}` back.

## Demo tips
- Run the default test: the demo agent leaks some attacks (score about 49, Medium).
- Only test agents you are authorised to test.
- Not built yet (future scope): Docker sandbox, PostgreSQL, LLM judge, auth.
