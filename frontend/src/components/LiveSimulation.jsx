import React from "react";
import {
  PlayIcon,
  PauseIcon,
  StopIcon,
  DocumentTextIcon,
  BoltIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  CheckCircleIcon,
  XCircleIcon,
  CommandLineIcon,
  ArrowRightIcon,
  ArrowPathIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";

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

  const blockedCount = results.filter((r) => r.verdict === "blocked").length;
  const leakedCount = results.filter((r) => r.verdict === "leaked").length;

  return (
    <div className="space-y-8">
      {/* Simulation Header / Status Bar */}
      <div className="glass-panel rounded-3xl p-7 shadow-2xl space-y-6 relative overflow-hidden cyber-grid">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono ${
                  isFinished
                    ? "bg-emerald-950/70 text-emerald-300 border border-emerald-700/60"
                    : isPaused
                    ? "bg-amber-950/70 text-amber-300 border border-amber-700/60"
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
                  : "LIVE RED-TEAM ATTACK STREAM"}
              </span>

              <span className="text-xs text-slate-400 font-mono">
                Target: <strong className="text-slate-200">{testData?.target_url || "http://localhost:9000/chat"}</strong>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Executing Adversarial Attack Run
            </h1>
          </div>

          {/* Action buttons with Heroicons */}
          <div className="flex items-center gap-2.5">
            {!isFinished ? (
              <>
                <button
                  onClick={onTogglePause}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 transition-all flex items-center gap-2 shadow-sm"
                >
                  {isPaused ? (
                    <>
                      <PlayIcon className="w-4 h-4 text-emerald-400" />
                      <span>Resume Attack</span>
                    </>
                  ) : (
                    <>
                      <PauseIcon className="w-4 h-4 text-amber-400" />
                      <span>Pause</span>
                    </>
                  )}
                </button>
                <button
                  onClick={onCancel}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-red-950/50 hover:bg-red-900/60 border border-red-800 text-red-300 transition-all flex items-center gap-2 shadow-sm"
                >
                  <StopIcon className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </>
            ) : (
              <button
                onClick={onViewReport}
                className="px-5 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 transition-all flex items-center gap-2"
              >
                <DocumentTextIcon className="w-4 h-4 stroke-2" />
                <span>View Security Report</span>
                <ArrowRightIcon className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Cyber Packet Stream Graphic */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs font-mono relative overflow-hidden">
          <div className="flex items-center gap-2 z-10">
            <div className="w-7 h-7 rounded-lg bg-red-950/80 border border-red-700/60 flex items-center justify-center text-red-400 font-bold">
              <BoltIcon className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block uppercase">ATTACK GENERATOR</span>
              <span className="text-slate-200 font-bold">Red-Team Engine</span>
            </div>
          </div>

          <div className="flex-1 mx-6 relative h-2 bg-slate-900 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r from-red-500 via-amber-400 to-emerald-400 rounded-full ${
                !isFinished && !isPaused ? "animate-pulse" : ""
              }`}
              style={{ width: `${percent}%` }}
            />
          </div>

          <div className="flex items-center gap-2 z-10">
            <div>
              <span className="text-[10px] text-slate-500 block uppercase text-right">TARGET SANDBOX</span>
              <span className="text-slate-200 font-bold text-right block">Victim AI Agent</span>
            </div>
            <div className="w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-700/60 flex items-center justify-center text-cyan-400 font-bold">
              <CpuChipIcon className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Live Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-slate-800/80">
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Test Progress</div>
            <div className="text-xl font-black font-mono text-white mt-0.5">
              {done} <span className="text-slate-500 text-sm font-normal">/ {total}</span>
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
                    : isPaused
                    ? "bg-amber-950 text-amber-300 border border-amber-800"
                    : "bg-amber-950 text-amber-300 border border-amber-800 animate-pulse"
                }`}
              >
                {isFinished ? "COMPLETED" : isPaused ? "PAUSED" : "ACTIVE AUDIT"}
              </span>
            </div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400 uppercase font-semibold">Live Score Meter</div>
            <div className="text-xs font-mono text-slate-300 mt-1 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">{blockedCount} Blocked</span>
              <span>·</span>
              <span className="text-red-400 font-bold">{leakedCount} Breached</span>
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
      <div className="glass-panel rounded-3xl shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <CommandLineIcon className="w-5 h-5 text-amber-400" />
              <span>Live Red-Team Activity Stream</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Dynamic trace of prompts dispatched, agent responses captured, and Blue-Team verdicts
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <strong className="text-emerald-400 font-mono">
                {blockedCount}
              </strong>{" "}
              Blocked
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <strong className="text-red-400 font-mono">
                {leakedCount}
              </strong>{" "}
              Vulnerabilities
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 w-16">Test ID</th>
                <th className="py-3 px-4">Attack Scenario & Category</th>
                <th className="py-3 px-4">Agent Response Summary</th>
                <th className="py-3 px-4 w-28">Severity</th>
                <th className="py-3 px-4 w-48 text-right">Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {results.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-500 font-sans">
                    <ArrowPathIcon className="w-6 h-6 animate-spin mx-auto text-amber-400 mb-2" />
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
                      <td className="py-3 px-4 text-right font-sans">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                            isLeaked
                              ? "bg-red-950/80 text-red-300 border border-red-600/60 shadow-sm shadow-red-900/30"
                              : "bg-emerald-950/80 text-emerald-300 border border-emerald-600/60 shadow-sm shadow-emerald-900/30"
                          }`}
                        >
                          {isLeaked ? (
                            <XCircleIcon className="w-3.5 h-3.5 text-red-400 shrink-0" />
                          ) : (
                            <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          )}
                          <span>{isLeaked ? "VULNERABILITY" : "BLOCKED"}</span>
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
