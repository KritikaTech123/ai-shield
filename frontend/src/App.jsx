import { useEffect, useState } from "react";
import { getCategories, startTest, getReport } from "./api.js";

const RISK_COLOR = {
  Low: "text-green-700",
  Medium: "text-amber-600",
  High: "text-orange-600",
  Critical: "text-red-700",
};

function Header() {
  return (
    <header className="bg-slate-800 text-white px-6 py-4 flex items-center gap-3">
      <span className="text-2xl">🛡️</span>
      <div>
        <h1 className="text-xl font-bold leading-tight">AI-SHIELD</h1>
        <p className="text-xs text-slate-300">Attack AI before attackers do.</p>
      </div>
    </header>
  );
}

// ---------- Screen 1: New test ----------
function NewTest({ onStart }) {
  const [url, setUrl] = useState("http://localhost:9000/chat");
  const [cats, setCats] = useState([]);
  const [picked, setPicked] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    getCategories()
      .then((c) => {
        setCats(c);
        setPicked(c);
      })
      .catch(() => setErr("Backend not reachable. Is it running on port 8000?"));
  }, []);

  const toggle = (c) =>
    setPicked((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));

  const run = async () => {
    try {
      const { id } = await startTest(url, picked);
      onStart(id);
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-bold mb-4">1 · Configure the test</h2>
      <label className="block text-sm font-semibold mb-1">Target agent</label>
      <input
        className="w-full border rounded px-3 py-2 mb-1"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <p className="text-xs text-slate-500 mb-4">
        Only test agents you are authorised to test. The demo agent runs on port 9000.
      </p>
      <p className="text-sm font-semibold mb-2">Attack categories</p>
      <div className="space-y-2 mb-5">
        {cats.map((c) => (
          <label key={c} className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={picked.includes(c)} onChange={() => toggle(c)} />
            {c}
          </label>
        ))}
      </div>
      {err && <p className="text-red-600 text-sm mb-3">{err}</p>}
      <button
        onClick={run}
        disabled={!picked.length}
        className="bg-slate-800 text-white px-5 py-2 rounded font-semibold disabled:opacity-40"
      >
        Run security test
      </button>
    </div>
  );
}

// ---------- Screen 2: Live attack log ----------
function LiveLog({ data }) {
  const pct = data.total ? Math.round((100 * data.done) / data.total) : 0;
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-bold mb-1">2 · Attack in a sandbox</h2>
      <p className="text-sm text-slate-600 mb-2">
        Running test… {data.done} / {data.total}
      </p>
      <div className="h-3 bg-slate-100 rounded mb-4">
        <div className="h-3 bg-amber-500 rounded" style={{ width: `${pct}%` }} />
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-700 text-white text-left">
            <th className="p-2">Attack type</th>
            <th className="p-2">Category</th>
            <th className="p-2">Verdict</th>
          </tr>
        </thead>
        <tbody>
          {data.results.map((r) => (
            <tr key={r.id} className="border-b">
              <td className="p-2">{r.attack}</td>
              <td className="p-2 text-slate-500">{r.category}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-0.5 rounded text-xs font-semibold ${
                    r.verdict === "leaked"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {r.verdict === "leaked" ? "Leaked" : "Blocked"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------- Screen 3: Report ----------
function Report({ data, onAgain }) {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-bold mb-4">3 · Security report</h2>
      <div className="flex items-end gap-3 mb-4">
        <span className={`text-6xl font-bold ${RISK_COLOR[data.risk]}`}>{data.score}</span>
        <span className="text-slate-500 mb-2">/ 100</span>
        <span className={`text-xl font-bold mb-2 ${RISK_COLOR[data.risk]}`}>
          {data.risk} risk
        </span>
      </div>

      <div className="flex h-3 rounded overflow-hidden mb-1">
        <div className="flex-1 bg-green-600" />
        <div className="flex-1 bg-amber-400" />
        <div className="flex-1 bg-orange-500" />
        <div className="flex-1 bg-red-700" />
      </div>
      <div className="relative h-4 mb-6">
        <div
          className="absolute text-xs"
          style={{ left: `calc(${Math.min(data.score, 100)}% - 4px)` }}
        >
          ▲
        </div>
      </div>

      <h3 className="font-semibold mb-2">Attacks that succeeded, by category</h3>
      <div className="space-y-2 mb-6">
        {data.categories.map((c) => (
          <div key={c.category} className="flex items-center gap-3 text-sm">
            <span className="w-44">{c.category}</span>
            <div className="flex-1 h-3 bg-slate-100 rounded">
              <div className="h-3 bg-red-700 rounded" style={{ width: `${c.percent}%` }} />
            </div>
            <span className="w-24 text-right font-semibold">
              {c.percent}% ({c.succeeded}/{c.total})
            </span>
          </div>
        ))}
      </div>

      <h3 className="font-semibold mb-2">Recommended fixes</h3>
      <ul className="list-disc ml-5 text-sm space-y-1 mb-6">
        {data.recommended_fixes.length === 0 && <li>No successful attacks. Nice work!</li>}
        {data.recommended_fixes.map((f) => (
          <li key={f.category}>
            <b>{f.category}:</b> {f.fix}
          </li>
        ))}
      </ul>

      <div className="flex gap-3">
        <button onClick={() => window.print()} className="border px-4 py-2 rounded font-semibold">
          Export / Print
        </button>
        <button onClick={onAgain} className="bg-slate-800 text-white px-4 py-2 rounded font-semibold">
          New test
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [testId, setTestId] = useState(null);
  const [data, setData] = useState(null);

  // Poll the backend every second until the test is done.
  useEffect(() => {
    if (!testId) return;
    let stop = false;
    const tick = async () => {
      try {
        const d = await getReport(testId);
        if (stop) return;
        setData(d);
        if (d.status === "running") setTimeout(tick, 1000);
      } catch {
        if (!stop) setTimeout(tick, 2000);
      }
    };
    tick();
    return () => {
      stop = true;
    };
  }, [testId]);

  const reset = () => {
    setTestId(null);
    setData(null);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="p-6">
        {!testId && <NewTest onStart={setTestId} />}
        {testId && !data && <p className="text-center text-slate-500">Starting…</p>}
        {data && data.status === "running" && <LiveLog data={data} />}
        {data && data.status !== "running" && <Report data={data} onAgain={reset} />}
      </main>
    </div>
  );
}
