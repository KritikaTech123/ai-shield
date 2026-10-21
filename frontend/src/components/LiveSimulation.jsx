import React from "react";

export default function LiveSimulation({
  currentTest,
  testData,
  isPaused,
  onTogglePause,
  onCancel,
  onViewReport,
}) {
  const done = testData?.done || 0;
  const total = testData?.total || 15;
  const percent = total > 0 ? Math.min(100, Math.round((done / total) * 100)) : 0;
  const results = testData?.results || [];
  const isFinished = testData?.status === "done" || testData?.status === "completed";
  const currentItem = results[results.length - 1];

  return (
    <div className="space-y-8">
      {/* Simulation Header / Status Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                  isFinished
                    ? "bg-emerald-950/70 text-emerald-300 border border-emerald-800/60"
                    : isPaused
                    ? "bg-amber-950/70 text-amber-300 border border-amber-800/60"
                    : "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isFinished
                      ? "bg-emerald-400"
                      : isPaused
                      ? "bg-amber-400"
                      : "bg-amber-400 animate-ping"
                  }`}
                />
                {isFinished
                  ? "SIMULATION COMPLETED"
                  : isPaused
                  ? "SIMULATION PAUSED"
                  : "LIVE RED-TEAM ATTACK IN PROGRESS"}
              </span>

              <span className="text-xs text-slate-400 font-mono">
                Target: {testData?.target_url || "http://localhost:9000/chat"}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Executing Adversarial Attack Run
            </h1>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            {!isFinished ? (
              <>
                <button
                  onClick={onTogglePause}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-all flex items-center gap-2"
                >
                  <span>{isPaused ? "▶️ Resume" : "⏸️ Pause"}</span>
                </button>
                <button
                  onClick={onCancel}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-red-950/40 hover:bg-red-900/60 border border-red-800 text-red-300 transition-all flex items-center gap-2"
                >
                  <span>⏹️ Cancel</span>
                </button>
              </>
            ) : (
              <button
                onClick={onViewReport}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 transition-all flex items-center gap-2"
              >
                <span>📋 View Security Report</span> →
              </button>
            )}
          </div>
        </div>

        {/* Live Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-slate-800">
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Test Progress</div>
            <div className="text-xl font-bold font-mono text-white mt-0.5">
              {done} <span className="text-slate-500 text-sm">/ {total}</span>
            </div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Current Category</div>
            <div className="text-sm font-bold text-amber-400 truncate mt-1">
              {currentItem?.category || (isFinished ? "All Completed" : "Initializing...")}
            </div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Current Status</div>
            <div className="mt-1">
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-md font-mono ${
                  isFinished
                    ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                    : "bg-amber-950 text-amber-300 border border-amber-800"
                }`}
              >
                {isFinished ? "COMPLETED" : "TESTING"}
              </span>
            </div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Timestamp</div>
            <div className="text-xs font-mono text-slate-300 mt-1">
              {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Animated Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-400 font-mono">
            <span>Attack Execution Completion</span>
            <span className="text-amber-400 font-bold">{percent}%</span>
          </div>
          <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 transition-all duration-300 shadow-sm shadow-amber-500/50"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Live Activity Log Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span>📜</span> Live Red-Team Activity Stream
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Dynamic trace of prompts dispatched, agent responses captured, and Blue-Team verdicts
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <strong className="text-emerald-400 font-mono">
                {results.filter((r) => r.verdict === "blocked").length}
              </strong>{" "}
              Blocked
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <strong className="text-red-400 font-mono">
                {results.filter((r) => r.verdict === "leaked").length}
              </strong>{" "}
              Vulnerabilities
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 w-16">Test ID</th>
                <th className="py-3 px-4">Attack Scenario & Category</th>
                <th className="py-3 px-4">Agent Response Summary</th>
                <th className="py-3 px-4 w-28">Severity</th>
                <th className="py-3 px-4 w-44 text-right">Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {results.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-500 font-sans">
                    <div className="inline-block animate-spin text-2xl mb-2">⚡</div>
                    <p className="text-sm">Connecting to sandbox agent and priming attack vector harness...</p>
                  </td>
                </tr>
              ) : (
                results.map((r, i) => {
                  const isLeaked = r.verdict === "leaked";
                  return (
                    <tr
                      key={r.id || i}
                      className={`hover:bg-slate-800/40 transition-colors ${
                        i === results.length - 1 && !isFinished ? "bg-amber-500/5 animate-pulse" : ""
                      }`}
                    >
                      <td className="py-3 px-4 text-slate-400 font-bold">
                        #{i + 1}
                      </td>
                      <td className="py-3 px-4 font-sans">
                        <div className="font-bold text-slate-200">{r.attack || r.name}</div>
                        <div className="text-[11px] text-slate-400">{r.category}</div>
                      </td>
                      <td className="py-3 px-4 font-sans max-w-md">
                        <p className="text-slate-300 text-xs truncate">
                          {r.reply || "[No response or tool call recorded]"}
                        </p>
                        {r.evidence && (
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">
                            Evidence: {r.evidence}
                          </p>
                        )}
                      </td>
                      <td className="py-3 px-4 font-sans">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            r.severity === 4
                              ? "bg-red-950/60 text-red-400 border border-red-800/40"
                              : r.severity === 3
                              ? "bg-orange-950/60 text-orange-400 border border-orange-800/40"
                              : "bg-slate-800 text-slate-300"
                          }`}
                        >
                          {r.severity === 4
                            ? "Critical"
                            : r.severity === 3
                            ? "High"
                            : r.severity === 2
                            ? "Medium"
                            : "Low"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                            isLeaked
                              ? "bg-red-950/80 text-red-300 border border-red-600/60 shadow-sm shadow-red-900/30"
                              : "bg-emerald-950/80 text-emerald-300 border border-emerald-600/60 shadow-sm shadow-emerald-900/30"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isLeaked ? "bg-red-400" : "bg-emerald-400"
                            }`}
                          />
                          {isLeaked ? "VULNERABILITY DETECTED" : "BLOCKED"}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
