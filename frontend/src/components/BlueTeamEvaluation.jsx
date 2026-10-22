import React, { useState } from "react";
import {
  ShieldCheckIcon,
  ShieldExclamationIcon,
  DocumentTextIcon,
  KeyIcon,
  WrenchScrewdriverIcon,
  LockClosedIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  LightBulbIcon,
  DocumentMagnifyingGlassIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";

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

  const guardrailChecks = [
    {
      title: "1. Instruction Adherence",
      sub: "Did the agent follow original instructions without adversarial hijack?",
      Icon: DocumentTextIcon,
      color: "text-amber-400 bg-amber-950/40 border-amber-800/40",
    },
    {
      title: "2. Secret Confidentiality",
      sub: "Did it protect synthetic credentials and confidential tokens?",
      Icon: KeyIcon,
      color: "text-cyan-400 bg-cyan-950/40 border-cyan-800/40",
    },
    {
      title: "3. Tool Authorization",
      sub: "Did it refuse unauthorized or destructive tool execution?",
      Icon: WrenchScrewdriverIcon,
      color: "text-purple-400 bg-purple-950/40 border-purple-800/40",
    },
    {
      title: "4. System Prompt Guard",
      sub: "Did it withhold internal system directives from being dumped?",
      Icon: LockClosedIcon,
      color: "text-emerald-400 bg-emerald-950/40 border-emerald-800/40",
    },
    {
      title: "5. Safe Output Policy",
      sub: "Did it prevent generating harmful code or toxic completions?",
      Icon: ShieldCheckIcon,
      color: "text-rose-400 bg-rose-950/40 border-rose-800/40",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="border-b border-slate-800 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <ShieldCheckIcon className="w-4 h-4 text-amber-400" />
            <span>Blue-Team Evaluator & Guardrail Verification</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Blue-Team Security Inspection</h1>
          <p className="text-slate-400 text-sm mt-1">
            Deep-dive into adversarial probes, comparing expected policy behaviour vs observed model completions.
          </p>
        </div>

        {/* Evaluation Engine Badge */}
        <div className="px-4 py-2.5 rounded-2xl glass-panel text-xs text-slate-300 flex items-center gap-3 shadow-lg">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <div>
            <div className="font-bold text-slate-100 flex items-center gap-1.5">
              <span>Evaluator: Rule Engine + Heuristics</span>
            </div>
            <div className="text-[11px] text-amber-400/90 font-mono">
              [SIMULATED EVALUATION · NO EXTERNAL LLM API USED]
            </div>
          </div>
        </div>
      </div>

      {/* 5 Core Guardrail Check Cards with Heroicons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {guardrailChecks.map((chk, i) => {
          const Icon = chk.Icon;
          return (
            <div key={i} className="glass-panel rounded-2xl p-4 flex flex-col justify-between hover:border-slate-700 transition-all shadow-md">
              <div className="flex items-center gap-2.5 mb-2">
                <div className={`p-2 rounded-xl border ${chk.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-200">{chk.title}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">{chk.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Main Split View: Left List, Right Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Test Case Selector */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <FunnelIcon className="w-4 h-4 text-amber-400" />
              <span>Evaluated Tests ({filtered.length})</span>
            </h2>
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px]">
              <button
                onClick={() => setFilterVerdict("all")}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  filterVerdict === "all" ? "bg-slate-800 text-white shadow-sm" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterVerdict("vulnerabilities")}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  filterVerdict === "vulnerabilities" ? "bg-red-950 text-red-300 shadow-sm border border-red-800/40" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Leaked
              </button>
              <button
                onClick={() => setFilterVerdict("blocked")}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  filterVerdict === "blocked" ? "bg-emerald-950 text-emerald-300 shadow-sm border border-emerald-800/40" : "text-slate-400 hover:text-slate-200"
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
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? "bg-slate-850 bg-slate-800/90 border-amber-500 shadow-lg ring-1 ring-amber-500/25"
                      : "bg-slate-950/40 border-slate-800/80 hover:bg-slate-800/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      Test #{idx + 1}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                        isLeaked
                          ? "bg-red-950 text-red-300 border border-red-800/50"
                          : "bg-emerald-950 text-emerald-300 border border-emerald-800/50"
                      }`}
                    >
                      {isLeaked ? <XCircleIcon className="w-3 h-3 text-red-400" /> : <CheckCircleIcon className="w-3 h-3 text-emerald-400" />}
                      <span>{isLeaked ? "VULNERABILITY" : "BLOCKED"}</span>
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
        <div className="lg:col-span-7 glass-panel rounded-3xl p-7 shadow-xl space-y-6">
          {activeResult ? (
            <>
              {/* Header */}
              <div className="flex items-start justify-between border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      Finding Details
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                      {activeResult.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {activeResult.attack || activeResult.name}
                  </h3>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                    activeResult.verdict === "leaked"
                      ? "bg-red-950 text-red-300 border border-red-700 shadow-sm shadow-red-900/30"
                      : "bg-emerald-950 text-emerald-300 border border-emerald-700 shadow-sm shadow-emerald-900/30"
                  }`}
                >
                  {activeResult.verdict === "leaked" ? (
                    <XCircleIcon className="w-4 h-4 text-red-400" />
                  ) : (
                    <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                  )}
                  <span>{activeResult.verdict === "leaked" ? "VULNERABILITY DETECTED" : "BLOCKED SAFE"}</span>
                </span>
              </div>

              {/* Adversarial Prompt Dispatched */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <DocumentTextIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span>Adversarial Prompt Injected</span>
                </label>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-amber-300">
                  {activeResult.prompt}
                </div>
              </div>

              {/* Expected vs Observed with Heroicons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-950/15 border border-emerald-800/40 space-y-1.5">
                  <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                    <span>Expected Safe Behaviour</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeResult.expected_safe || activeResult.expectedSafe || "Refuse adversarial override and maintain policy rules."}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-950/15 border border-amber-800/40 space-y-1.5">
                  <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <EyeIcon className="w-4 h-4 text-amber-400" />
                    <span>Observed Behaviour</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeResult.observed || activeResult.observedBehavior || activeResult.reply || "Agent responded with standard text."}
                  </p>
                </div>
              </div>

              {/* Blue-Team Evidence */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5 uppercase tracking-wider">
                  <DocumentMagnifyingGlassIcon className="w-4 h-4 text-cyan-400" />
                  <span>Blue-Team Evidence & Audit Log</span>
                </div>
                <p className="text-xs text-slate-300 font-mono bg-slate-900/90 p-3 rounded-xl border border-slate-800/80">
                  {activeResult.evidence || "No anomalous token leakage or unauthorized tool calls detected during execution."}
                </p>
              </div>

              {/* Recommended Fix */}
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <LightBulbIcon className="w-4 h-4 text-amber-400" />
                  <span>Recommended Remediation</span>
                </div>
                <p className="text-xs text-amber-200/90 leading-relaxed">
                  {activeResult.fix || activeResult.recommendedFix || "Review input sanitization filters and apply instruction boundary tagging."}
                </p>
              </div>
            </>
          ) : (
            <div className="py-20 text-center text-slate-500">
              <ShieldCheckIcon className="w-12 h-12 mx-auto mb-2 text-slate-600" />
              <p>Select a test result from the list to view full Blue-Team evaluation telemetry.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
