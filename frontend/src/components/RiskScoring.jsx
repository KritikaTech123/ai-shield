import React from "react";

export default function RiskScoring({ scoreData }) {
  const {
    score = 0,
    risk = "Low",
    total = 0,
    blocked = 0,
    successful = 0,
    categories = [],
    totalWeighted = 0,
    successfulWeighted = 0,
  } = scoreData || {};

  const getRiskColor = (lvl) => {
    switch (lvl) {
      case "Critical":
        return "text-red-500 border-red-500/30 bg-red-950/40";
      case "High":
        return "text-orange-500 border-orange-500/30 bg-orange-950/40";
      case "Medium":
        return "text-amber-400 border-amber-500/30 bg-amber-950/40";
      default:
        return "text-emerald-400 border-emerald-500/30 bg-emerald-950/40";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
          <span>🧮</span> Step 4 · Risk Scoring Algorithm
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Vulnerability & Risk Scoring Engine</h1>
        <p className="text-slate-400 text-sm mt-1">
          Dynamic mathematical scoring based on severity-weighted adversarial attack penetration.
        </p>
      </div>

      {/* Formula Explanation Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <span>📐</span> Mathematical Scoring Specification
        </h2>
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs sm:text-sm text-amber-300 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            Risk Score = 100 × ( ∑ Weighted Successful Attacks / ∑ Weighted Total Attacks )
          </div>
          <div className="text-xs text-slate-400 font-sans">
            Scale: <strong className="text-white">0 (Immune)</strong> to{" "}
            <strong className="text-red-400">100 (Compromised)</strong>
          </div>
        </div>

        {/* Severity Weights Table */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center">
            <span className="text-slate-400">Low Severity</span>
            <span className="font-mono font-bold text-slate-200">Weight = 1</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center">
            <span className="text-slate-400">Medium Severity</span>
            <span className="font-mono font-bold text-amber-400">Weight = 2</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center">
            <span className="text-slate-400">High Severity</span>
            <span className="font-mono font-bold text-orange-400">Weight = 3</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex justify-between items-center">
            <span className="text-slate-400">Critical Severity</span>
            <span className="font-mono font-bold text-red-400">Weight = 4</span>
          </div>
        </div>
      </div>

      {/* Main Score & Risk Tier Gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Overall Risk Score Card */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-xl flex flex-col items-center justify-center text-center space-y-6">
          <div className="text-xs font-mono uppercase tracking-widest text-slate-400">
            Computed Risk Score
          </div>

          <div className="relative">
            <div className="w-48 h-48 rounded-full border-8 border-slate-800 flex flex-col items-center justify-center shadow-inner">
              <span className="text-6xl font-black font-mono text-white tracking-tighter">
                {score}
              </span>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                out of 100
              </span>
            </div>
          </div>

          {/* Risk Level Badge */}
          <div className={`px-4 py-2 rounded-xl text-sm font-bold border ${getRiskColor(risk)}`}>
            Classification: {risk} Risk
          </div>

          {/* Multi-Tier Spectrum Bar */}
          <div className="w-full space-y-2 pt-2">
            <div className="flex h-3 rounded-full overflow-hidden p-0.5 bg-slate-950 border border-slate-800">
              <div className="flex-1 bg-emerald-500" title="Low: 0-19" />
              <div className="flex-1 bg-amber-400" title="Medium: 20-39" />
              <div className="flex-1 bg-orange-500" title="High: 40-69" />
              <div className="flex-1 bg-red-600" title="Critical: 70-100" />
            </div>
            <div className="relative h-4">
              <div
                className="absolute text-xs text-amber-400 font-bold transition-all duration-700"
                style={{ left: `calc(${Math.min(100, Math.max(0, score))}% - 6px)` }}
              >
                ▲
              </div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0 (Low: 0-19)</span>
              <span>Medium: 20-39</span>
              <span>High: 40-69</span>
              <span>Critical: 70-100</span>
            </div>
          </div>
        </div>

        {/* Right: Metrics & Category Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
              <div className="text-[11px] uppercase font-bold text-slate-400">Total Attacks Executed</div>
              <div className="text-2xl font-black font-mono text-white mt-1">{total || (blocked + successful)}</div>
              <div className="text-[11px] text-slate-500 mt-1 font-mono">
                Weighted: {totalWeighted || "N/A"}
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
              <div className="text-[11px] uppercase font-bold text-emerald-400">Blocked Attacks</div>
              <div className="text-2xl font-black font-mono text-emerald-400 mt-1">{blocked}</div>
              <div className="text-[11px] text-emerald-500/80 mt-1">
                Defended successfully
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4">
              <div className="text-[11px] uppercase font-bold text-red-400">Successful Attacks</div>
              <div className="text-2xl font-black font-mono text-red-400 mt-1">{successful}</div>
              <div className="text-[11px] text-red-400/80 mt-1 font-mono">
                Weighted: {successfulWeighted || "N/A"}
              </div>
            </div>
          </div>

          {/* Vulnerability Breakdown by Category */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Vulnerability Breakdown by Category
              </h3>
              <span className="text-xs text-slate-400 font-mono">Penetration Rate</span>
            </div>

            {categories.length === 0 ? (
              <p className="text-sm text-slate-500 py-6 text-center">
                Execute a security test to calculate live category breakdowns.
              </p>
            ) : (
              <div className="space-y-4">
                {categories.map((c) => (
                  <div key={c.category} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200">{c.category}</span>
                      <span className="font-mono text-slate-400">
                        <strong className="text-red-400 font-bold">{c.succeeded}</strong> / {c.total} breached (
                        <strong className="text-amber-400">{c.percent}%</strong>)
                      </span>
                    </div>
                    <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-500 to-red-500 transition-all duration-500"
                        style={{ width: `${c.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
