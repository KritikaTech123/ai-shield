"""SQLite storage (Samiksha). Scalable to PostgreSQL."""
import sqlite3
import json
from pathlib import Path

DB_PATH = Path(__file__).parent / "aishield.db"


def conn():
    c = sqlite3.connect(DB_PATH, check_same_thread=False)
    c.row_factory = sqlite3.Row
    return c


def init():
    with conn() as c:
        c.execute("""CREATE TABLE IF NOT EXISTS tests(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            target_url TEXT, categories TEXT,
            status TEXT, total INTEGER, created TEXT DEFAULT CURRENT_TIMESTAMP)""")
        c.execute("""CREATE TABLE IF NOT EXISTS results(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            test_id INTEGER, category TEXT, attack TEXT, prompt TEXT,
            reply TEXT, verdict TEXT, evidence TEXT, severity INTEGER,
            expected_safe TEXT, observed TEXT, fix TEXT)""")
        for col in ["expected_safe", "observed", "fix"]:
            try:
                c.execute(f"ALTER TABLE results ADD COLUMN {col} TEXT")
            except Exception:
                pass


def create_test(target_url, categories, total):
    with conn() as c:
        cur = c.execute("INSERT INTO tests(target_url,categories,status,total) VALUES(?,?,?,?)",
                        (target_url, json.dumps(categories), "running", total))
        return cur.lastrowid


def add_result(test_id, r):
    with conn() as c:
        c.execute("""INSERT INTO results(test_id,category,attack,prompt,reply,verdict,evidence,severity,expected_safe,observed,fix)
                     VALUES(?,?,?,?,?,?,?,?,?,?,?)""",
                  (test_id, r["category"], r["attack"], r["prompt"], r["reply"],
                   r["verdict"], r["evidence"], r["severity"],
                   r.get("expected_safe", ""), r.get("observed", ""), r.get("fix", "")))


def set_status(test_id, status):
    with conn() as c:
        c.execute("UPDATE tests SET status=? WHERE id=?", (status, test_id))


def get_test(test_id):
    with conn() as c:
        t = c.execute("SELECT * FROM tests WHERE id=?", (test_id,)).fetchone()
        if not t:
            return None
        rows = c.execute("SELECT * FROM results WHERE test_id=? ORDER BY id", (test_id,)).fetchall()
        return dict(t), [dict(r) for r in rows]


def get_all_tests():
    with conn() as c:
        rows = c.execute("SELECT * FROM tests ORDER BY id DESC").fetchall()
        return [dict(r) for r in rows]
