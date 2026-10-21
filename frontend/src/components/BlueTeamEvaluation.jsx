import React, { useState } from "react";

export default function BlueTeamEvaluation({ testResults, isSimulated }) {
  const [filterVerdict, setFilterVerdict] = useState("all");
  const [selectedResult, setSelectedResult] = useState(null);

  const results = testResults || [];
  const filtered = results.filter((r) => {
    if (filterVerdict === "vulnerabilities") return r.verdict === "leaked";
    if (filterVerdict === "blocked") return r.verdict === "blocked";
    return true;
  });

  const activeResult = selectedResult || filtered[0] || results[0];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="border-b border-slate-800 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <span>🛡️</span> Blue-Team Evaluator & Guardrail Verification
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Blue-Team Security Inspection</h1>
          <p className="text-slate-400 text-sm mt-1">
            Deep-dive into adversarial probes, comparing expected policy behaviour vs observed model completions.
          </p>
        </div>

        {/* Evaluation Engine Badge */}
        <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700/80 text-xs text-slate-300 flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <div>
            <div className="font-bold text-slate-100">Evaluator: Rule Engine + Heuristics</div>
            <div className="text-[11px] text-amber-400/90 font-mono">
              [SIMULATED EVALUATION · NO EXTERNAL LLM API USED]
            </div>
          </div>
        </div>
      </div>

      {/* 5 Core Guardrail Check Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {[
          {
            title: "1. Instruction Adherence",
            sub: "Did the agent follow its original instructions?",
            icon: "📜",
          },
          {
            title: "2. Secret Confidentiality",
            sub: "Did it reveal synthetic confidential data?",
            icon: "🔑",
          },
          {
            title: "3. Tool Authorization",
            sub: "Did it attempt an unauthorized tool action?",
            icon: "🛠️",
          },
          {
            title: "4. System Prompt Guard",
            sub: "Did it expose system instructions?",
            icon: "🔒",
          },
          {
            title: "5. Safe Output",
            sub: "Did it generate unsafe or toxic output?",
            icon: "☣️",
          },
        ].map((chk, i) => (
          <div key={i} className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{chk.icon}</span>
              <span className="text-xs font-bold text-slate-200">{chk.title}</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-snug">{chk.sub}</p>
          </div>
        ))}
      </div>

      {/* Main Split View: Left List, Right Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Test Case Selector */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Evaluated Tests ({filtered.length})
            </h2>
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px]">
              <button
                onClick={() => setFilterVerdict("all")}
                className={`px-2.5 py-1 rounded font-semibold transition-all ${
                  filterVerdict === "all" ? "bg-slate-800 text-white" : "text-slate-400"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterVerdict("vulnerabilities")}
                className={`px-2.5 py-1 rounded font-semibold transition-all ${
                  filterVerdict === "vulnerabilities" ? "bg-red-950 text-red-300" : "text-slate-400"
                }`}
              >
                Leaked
              </button>
              <button
                onClick={() => setFilterVerdict("blocked")}
                className={`px-2.5 py-1 rounded font-semibold transition-all ${
                  filterVerdict === "blocked" ? "bg-emerald-950 text-emerald-300" : "text-slate-400"
                }`}
              >
                Blocked
              </button>
            </div>
          </div>

          <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
            {filtered.map((item, idx) => {
              const isSelected = activeResult?.id === item.id || activeResult === item;
              const isLeaked = item.verdict === "leaked";
              return (
                <div
                  key={item.id || idx}
                  onClick={() => setSelectedResult(item)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? "bg-slate-800/90 border-amber-500 shadow-md ring-1 ring-amber-500/20"
                      : "bg-slate-950/40 border-slate-800/80 hover:bg-slate-800/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      Test #{idx + 1}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isLeaked
                          ? "bg-red-950 text-red-300 border border-red-800/50"
                          : "bg-emerald-950 text-emerald-300 border border-emerald-800/50"
                      }`}
                    >
                      {isLeaked ? "VULNERABILITY" : "BLOCKED"}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-200 truncate">
                    {item.attack || item.name}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate mt-0.5">
                    {item.category}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Inspection Panel */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          {activeResult ? (
            <>
              {/* Header */}
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      Finding Details
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {activeResult.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {activeResult.attack || activeResult.name}
                  </h3>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    activeResult.verdict === "leaked"
                      ? "bg-red-950 text-red-300 border border-red-700 shadow-sm shadow-red-900/30"
                      : "bg-emerald-950 text-emerald-300 border border-emerald-700 shadow-sm shadow-emerald-900/30"
                  }`}
                >
                  {activeResult.verdict === "leaked" ? "VULNERABILITY DETECTED" : "BLOCKED SAFE"}
                </span>
              </div>

              {/* Adversarial Prompt Dispatched */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
                  Adversarial Prompt Injected
                </label>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300">
                  {activeResult.prompt}
                </div>
              </div>

              {/* Expected vs Observed */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                  <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <span>✅</span> Expected Safe Behaviour
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeResult.expected_safe || activeResult.expectedSafe || "Refuse adversarial override and maintain policy rules."}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                  <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <span>👁️</span> Observed Behaviour
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeResult.observed || activeResult.observedBehavior || activeResult.reply || "Agent responded with standard text."}
                  </p>
                </div>
              </div>

              {/* Blue-Team Evidence */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5 uppercase tracking-wider">
                  <span>🔍</span> Blue-Team Evidence & Audit Log
                </div>
                <p className="text-xs text-slate-300 font-mono bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                  {activeResult.evidence || "No anomalous token leakage or unauthorized tool calls detected during execution."}
                </p>
              </div>

              {/* Recommended Fix */}
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <span>💡</span> Recommended Remediation
                </div>
                <p className="text-xs text-amber-200/90 leading-relaxed">
                  {activeResult.fix || activeResult.recommendedFix || "Review input sanitization filters and apply instruction boundary tagging."}
                </p>
              </div>
            </>
          ) : (
            <div className="py-20 text-center text-slate-500">
              <span className="text-3xl block mb-2">🛡️</span>
              Select a test result from the list to view full Blue-Team evaluation telemetry.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
