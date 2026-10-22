import React from "react";
import {
  CalculatorIcon,
  ChartPieIcon,
  ShieldExclamationIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  ScaleIcon,
  BugAntIcon,
  CpuChipIcon,
  ArrowTrendingUpIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

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
        return {
          text: "text-red-400",
          border: "border-red-500/40",
          bg: "bg-red-950/40",
          glow: "shadow-red-500/20",
          gradient: "from-red-500 to-rose-600",
          stroke: "#ef4444",
        };
      case "High":
        return {
          text: "text-orange-400",
          border: "border-orange-500/40",
          bg: "bg-orange-950/40",
          glow: "shadow-orange-500/20",
          gradient: "from-orange-500 to-amber-600",
          stroke: "#f97316",
        };
      case "Medium":
        return {
          text: "text-amber-400",
          border: "border-amber-500/40",
          bg: "bg-amber-950/40",
          glow: "shadow-amber-500/20",
          gradient: "from-amber-400 to-yellow-500",
          stroke: "#f59e0b",
        };
      default:
        return {
          text: "text-emerald-400",
          border: "border-emerald-500/40",
          bg: "bg-emerald-950/40",
          glow: "shadow-emerald-500/20",
          gradient: "from-emerald-400 to-teal-500",
          stroke: "#10b981",
        };
    }
  };

  const riskStyle = getRiskColor(risk);

  // SVG Gauge calculations
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, score)) / 100) * circumference;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <CalculatorIcon className="w-3.5 h-3.5" />
            <span>Step 4 · Risk Scoring Algorithm</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>Vulnerability & Risk Scoring Engine</span>
            <span className="text-xs px-2.5 py-1 rounded-md font-mono font-semibold bg-slate-800 border border-slate-700 text-slate-300">
              v2.4
            </span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Dynamic mathematical scoring based on severity-weighted adversarial attack penetration.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
            <CpuChipIcon className="w-4 h-4 text-amber-400" />
            <span>Engine: Deterministic Weighted Sum</span>
          </div>
        </div>
      </div>

      {/* Formula Explanation Banner */}
      <div className="relative overflow-hidden bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <ScaleIcon className="w-4 h-4 text-amber-400" />
            <span>Mathematical Scoring Specification</span>
          </h2>
          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <SparklesIcon className="w-3.5 h-3.5 text-amber-400" />
            OWASP Benchmark Aligned
          </span>
        </div>

        {/* Formula Display Box */}
        <div className="bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800/80 font-mono text-xs sm:text-sm text-amber-300 flex flex-col md:flex-row items-center justify-between gap-4 shadow-inner">
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-400 font-bold text-xs">
              FORMULA
            </span>
            <span className="font-semibold tracking-wide">
              Risk Score = 100 × ( ∑ Weighted Breached Attacks / ∑ Weighted Total Attacks )
            </span>
          </div>
          <div className="text-xs text-slate-400 font-sans flex items-center gap-2">
            <span>Range:</span>
            <span className="font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/40 font-bold">
              0 Immune
            </span>
            <span className="text-slate-600">➔</span>
            <span className="font-mono px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800/40 font-bold">
              100 Compromised
            </span>
          </div>
        </div>

        {/* Severity Weights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[11px] font-semibold text-slate-400 block">Low Severity</span>
              <span className="text-[10px] text-slate-500">Minor probe</span>
            </div>
            <span className="font-mono font-bold text-emerald-400 px-2 py-1 rounded bg-emerald-950/50 border border-emerald-900/40">
              Weight ×1
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[11px] font-semibold text-slate-400 block">Medium Severity</span>
              <span className="text-[10px] text-slate-500">Policy leak</span>
            </div>
            <span className="font-mono font-bold text-amber-400 px-2 py-1 rounded bg-amber-950/50 border border-amber-900/40">
              Weight ×2
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[11px] font-semibold text-slate-400 block">High Severity</span>
              <span className="text-[10px] text-slate-500">Direct injection</span>
            </div>
            <span className="font-mono font-bold text-orange-400 px-2 py-1 rounded bg-orange-950/50 border border-orange-900/40">
              Weight ×3
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[11px] font-semibold text-slate-400 block">Critical Severity</span>
              <span className="text-[10px] text-slate-500">Secret disclosure</span>
            </div>
            <span className="font-mono font-bold text-red-400 px-2 py-1 rounded bg-red-950/50 border border-red-900/40">
              Weight ×4
            </span>
          </div>
        </div>
      </div>

      {/* Main Score & Risk Tier Gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Overall Risk Score Dial Card */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-7 shadow-2xl flex flex-col items-center justify-center text-center space-y-6 relative overflow-hidden">
          <div className="w-full flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <ShieldExclamationIcon className="w-4 h-4 text-amber-400" />
              <span>Calculated Risk Gauge</span>
            </span>
            <span className="text-[11px] font-mono text-slate-500">Scale: 0-100</span>
          </div>

          {/* SVG Circular Dial Gauge */}
          <div className="relative flex items-center justify-center my-2">
            <svg className="w-52 h-52 transform -rotate-90" viewBox="0 0 160 160">
              {/* Background Track Circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-slate-950"
                strokeWidth="14"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-slate-800"
                strokeWidth="10"
                fill="none"
              />
              {/* Colored Gauge Arc */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke={riskStyle.stroke}
                strokeWidth="11"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
                style={{
                  filter: `drop-shadow(0 0 8px ${riskStyle.stroke}88)`,
                }}
              />
            </svg>

            {/* Dial Center Info */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-5xl font-black font-mono text-white tracking-tighter">
                {score}
              </span>
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                Risk Score
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Max: 100</span>
            </div>
          </div>

          {/* Risk Level Badge */}
          <div
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold border ${riskStyle.border} ${riskStyle.bg} ${riskStyle.text} shadow-lg ${riskStyle.glow} flex items-center gap-2`}
          >
            {risk === "Low" ? (
              <ShieldCheckIcon className="w-4 h-4 text-emerald-400" />
            ) : risk === "Medium" ? (
              <ExclamationTriangleIcon className="w-4 h-4 text-amber-400" />
            ) : (
              <ShieldExclamationIcon className="w-4 h-4 text-red-400" />
            )}
            <span>Classification: {risk} Risk</span>
          </div>

          {/* Multi-Tier Spectrum Bar */}
          <div className="w-full space-y-2 pt-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold mb-1">
              <span>Risk Severity Spectrum</span>
              <span className="font-mono text-amber-400">Current: {score}/100</span>
            </div>
            <div className="flex h-3 rounded-full overflow-hidden p-0.5 bg-slate-950 border border-slate-800 shadow-inner">
              <div className="flex-1 bg-emerald-500 transition-all hover:opacity-80" title="Low: 0-19" />
              <div className="flex-1 bg-amber-400 transition-all hover:opacity-80" title="Medium: 20-39" />
              <div className="flex-1 bg-orange-500 transition-all hover:opacity-80" title="High: 40-69" />
              <div className="flex-1 bg-red-600 transition-all hover:opacity-80" title="Critical: 70-100" />
            </div>

            {/* Pointer Indicator */}
            <div className="relative h-4">
              <div
                className="absolute text-xs text-amber-300 font-bold transition-all duration-700 ease-out flex flex-col items-center"
                style={{
                  left: `calc(${Math.min(97, Math.max(3, score))}% - 8px)`,
                }}
              >
                <span>▲</span>
              </div>
            </div>

            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span className="text-emerald-400">0-19 (Low)</span>
              <span className="text-amber-400">20-39 (Med)</span>
              <span className="text-orange-400">40-69 (High)</span>
              <span className="text-red-400">70-100 (Crit)</span>
            </div>
          </div>
        </div>

        {/* Right: Metrics & Category Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-bold text-slate-400">Total Probes</span>
                <BugAntIcon className="w-4 h-4 text-slate-500" />
              </div>
              <div className="text-2xl font-black font-mono text-white mt-2">
                {total || blocked + successful}
              </div>
              <div className="text-[11px] text-slate-400 mt-1 font-mono">
                Weighted Total: <span className="text-slate-200 font-bold">{totalWeighted || total || 0}</span>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg hover:border-emerald-500/30 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-bold text-emerald-400">Blocked Attacks</span>
                <ShieldCheckIcon className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black font-mono text-emerald-400 mt-2">{blocked}</div>
              <div className="text-[11px] text-emerald-500/80 mt-1">
                Guardrails held firmly
              </div>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg hover:border-red-500/30 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase font-bold text-red-400">Successful Attacks</span>
                <ShieldExclamationIcon className="w-4 h-4 text-red-400" />
              </div>
              <div className="text-2xl font-black font-mono text-red-400 mt-2">{successful}</div>
              <div className="text-[11px] text-red-400/80 mt-1 font-mono">
                Weighted Breached: <span className="font-bold">{successfulWeighted || successful || 0}</span>
              </div>
            </div>
          </div>

          {/* Vulnerability Breakdown by Category */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <ChartPieIcon className="w-4 h-4 text-amber-400" />
                <span>Vulnerability Breakdown by Category</span>
              </h3>
              <span className="text-xs text-slate-400 font-mono">Breach Penetration</span>
            </div>

            {categories.length === 0 ? (
              <div className="py-10 text-center space-y-2">
                <ChartPieIcon className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400">
                  Execute a security test to calculate live category breakdowns.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {categories.map((c) => {
                  const percent = c.percent || (c.total ? Math.round((c.succeeded / c.total) * 100) : 0);
                  const isHigh = percent >= 50;
                  return (
                    <div key={c.category} className="space-y-1.5 p-3 rounded-xl bg-slate-950/40 border border-slate-800/60 hover:border-slate-700/80 transition-all">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-200 flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isHigh ? "bg-red-400 shadow-[0_0_6px_#ef4444]" : "bg-emerald-400 shadow-[0_0_6px_#10b981]"
                            }`}
                          />
                          {c.category}
                        </span>
                        <span className="font-mono text-slate-400 text-xs">
                          <strong className={isHigh ? "text-red-400 font-bold" : "text-slate-300 font-bold"}>
                            {c.succeeded}
                          </strong>{" "}
                          / {c.total} breached (
                          <strong className={isHigh ? "text-red-400" : "text-amber-400"}>
                            {percent}%
                          </strong>
                          )
                        </span>
                      </div>
                      <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800/80">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            isHigh
                              ? "bg-gradient-to-r from-orange-500 to-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                              : "bg-gradient-to-r from-emerald-500 to-amber-400"
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

