import React from "react";
import {
  PlayIcon,
  BoltIcon,
  DocumentTextIcon,
  BeakerIcon,
  ExclamationTriangleIcon,
  ShieldExclamationIcon,
  CalculatorIcon,
  ChartBarIcon,
  ClockIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ArrowTrendingUpIcon,
  CpuChipIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard({
  stats,
  recentActivity,
  onNewTest,
  onViewReports,
  onRunDemo,
  onSelectRun,
}) {
  return (
    <div className="space-y-8">
      {/* Cyber Hero Banner with SVG Circuit Graphics */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-[#0B1120] to-[#111A2E] border border-slate-800 p-8 sm:p-10 shadow-2xl cyber-grid">
        {/* Glowing Background Orbs & Radial Radar */}
        <div className="absolute -right-16 -top-16 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/4 -bottom-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold shadow-inner">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <ShieldCheckIcon className="w-4 h-4 text-amber-400" />
              <span>Automated Adversarial Security Testing Lab</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              AI-SHIELD <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">Intelligence</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Automated Red-Team attack simulation and Blue-Team defense evaluation for LLM agents.
              Safely probe endpoints against prompt injection, data leakage, and tool misuse before deployment.
            </p>

            {/* Feature Highlights Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-400">
              <span className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 flex items-center gap-1.5 font-mono">
                <CpuChipIcon className="w-3.5 h-3.5 text-cyan-400" /> Docker Sandbox Ready
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 flex items-center gap-1.5 font-mono">
                <SparklesIcon className="w-3.5 h-3.5 text-amber-400" /> OWASP Top 10 LLM
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900/80 border border-slate-800 flex items-center gap-1.5 font-mono">
                <CalculatorIcon className="w-3.5 h-3.5 text-emerald-400" /> Deterministic Scoring
              </span>
            </div>
          </div>

          {/* Action Button Strip */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[220px]">
            <button
              onClick={onNewTest}
              className="px-6 py-3.5 rounded-xl font-extrabold text-sm bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
            >
              <PlayIcon className="w-4 h-4 stroke-2" />
              <span>Create New Test</span>
            </button>
            <button
              onClick={onRunDemo}
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-slate-900/90 hover:bg-slate-800 border border-amber-500/40 text-amber-300 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-sm"
            >
              <BoltIcon className="w-4 h-4 text-amber-400" />
              <span>Run Demo Scan</span>
            </button>
            <button
              onClick={onViewReports}
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-slate-900/70 hover:bg-slate-800 border border-slate-700 text-slate-200 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-sm"
            >
              <DocumentTextIcon className="w-4 h-4 text-slate-400" />
              <span>View Reports</span>
            </button>
          </div>
        </div>
      </div>

      {/* Demo Notice Banner with Heroicon */}
      <div className="flex items-center justify-between px-5 py-3 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-300 shadow-sm">
        <div className="flex items-center gap-3">
          <ExclamationTriangleIcon className="w-5 h-5 text-amber-400 shrink-0" />
          <span>
            <strong className="text-amber-200">BENCHMARK TELEMETRY:</strong> Metrics below reflect current evaluation run and baseline benchmark statistics. Real-time test results are computed dynamically from actual sandbox executions.
          </span>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold shrink-0">
          DEMO DATA
        </span>
      </div>

      {/* 4 Metric Cards with Heroicons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-panel rounded-2xl p-6 transition-all hover:translate-y-[-2px] shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Total Tests Executed</span>
            <div className="p-2.5 rounded-xl bg-slate-800/80 text-amber-400 border border-slate-700">
              <BeakerIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-mono">{stats.totalTests}</div>
          <div className="text-xs text-slate-400 mt-3 flex items-center gap-1.5">
            <ArrowTrendingUpIcon className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-bold">+12%</span> vs last benchmark cycle
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 transition-all hover:translate-y-[-2px] shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Vulnerabilities Detected</span>
            <div className="p-2.5 rounded-xl bg-amber-950/40 text-amber-400 border border-amber-800/50">
              <ExclamationTriangleIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-400 font-mono">{stats.vulnerabilitiesDetected}</div>
          <div className="text-xs text-slate-400 mt-3 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" /> Across 6 OWASP attack vectors
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 transition-all hover:translate-y-[-2px] shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Critical Vulnerabilities</span>
            <div className="p-2.5 rounded-xl bg-red-950/40 text-red-400 border border-red-800/50">
              <ShieldExclamationIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-red-500 font-mono">{stats.criticalVulnerabilities}</div>
          <div className="text-xs text-red-400/90 mt-3 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
            <span>High-severity secret leak / tool misuse</span>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 transition-all hover:translate-y-[-2px] shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">Average Risk Score</span>
            <div className="p-2.5 rounded-xl bg-slate-800/80 text-amber-400 border border-slate-700">
              <CalculatorIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-400 font-mono">{stats.avgRiskScore}</span>
            <span className="text-sm text-slate-400 font-bold">/ 100</span>
            <span className="ml-auto text-xs px-2.5 py-1 rounded-md font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
              Medium Risk
            </span>
          </div>
          <div className="text-xs text-slate-400 mt-3">
            Severity-weighted formula (0–100)
          </div>
        </div>
      </div>

      {/* Middle Grid: Category Breakdown Chart + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Vulnerabilities by Category Chart */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-7 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <ChartBarIcon className="w-5 h-5 text-amber-400" />
                <span>Vulnerabilities by Category</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Distribution of detected weaknesses across OWASP LLM risk categories
              </p>
            </div>
            <span className="text-[11px] font-mono text-slate-300 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
              OWASP Top 10 for LLMs
            </span>
          </div>

          <div className="space-y-4">
            {stats.categoryBreakdown.map((item) => (
              <div key={item.category} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{item.category}</span>
                  <div className="flex items-center gap-2.5 font-mono">
                    <span className="text-slate-400">{item.count} probes</span>
                    <span
                      className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        item.severity === "Critical"
                          ? "bg-red-950/70 text-red-400 border border-red-800/50"
                          : item.severity === "High"
                          ? "bg-orange-950/70 text-orange-400 border border-orange-800/50"
                          : "bg-amber-950/70 text-amber-400 border border-amber-800/50"
                      }`}
                    >
                      {item.severity}
                    </span>
                    <span className="text-amber-400 font-bold w-12 text-right">{item.percent}%</span>
                  </div>
                </div>
                <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800/80">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      item.severity === "Critical"
                        ? "bg-gradient-to-r from-red-600 via-rose-500 to-red-400"
                        : item.severity === "High"
                        ? "bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-400"
                        : "bg-gradient-to-r from-amber-500 to-yellow-300"
                    }`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" /> Critical Severity (Weight: 4)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" /> High Severity (Weight: 3)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-yellow-400" /> Medium/Low (Weight: 1-2)
            </span>
          </div>
        </div>

        {/* Recent Security Test Activity */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-7 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <ClockIcon className="w-5 h-5 text-amber-400" />
                <span>Recent Security Audits</span>
              </h2>
              <span className="text-xs text-slate-400 font-mono">Live History</span>
            </div>

            <div className="divide-y divide-slate-800/60">
              {recentActivity.map((test) => (
                <div
                  key={test.id}
                  onClick={() => onSelectRun && onSelectRun(test)}
                  className="py-3.5 group cursor-pointer hover:bg-slate-800/50 px-3 rounded-xl transition-all flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                        {test.id}
                      </span>
                      <span className="text-xs font-bold text-slate-200 group-hover:text-amber-300 transition-colors">
                        {test.target}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span>{test.date}</span>
                      <span>•</span>
                      <span>{test.environment}</span>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <div className="text-sm font-black font-mono">
                      <span
                        className={
                          test.score >= 70
                            ? "text-red-400"
                            : test.score >= 40
                            ? "text-orange-400"
                            : test.score >= 20
                            ? "text-amber-400"
                            : "text-emerald-400"
                        }
                      >
                        {test.score}
                      </span>
                      <span className="text-slate-500 text-xs">/100</span>
                    </div>
                    <span
                      className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        test.risk === "Critical"
                          ? "bg-red-950/60 text-red-300 border border-red-800/40"
                          : test.risk === "High"
                          ? "bg-orange-950/60 text-orange-300 border border-orange-800/40"
                          : test.risk === "Medium"
                          ? "bg-amber-950/60 text-amber-300 border border-amber-800/40"
                          : "bg-emerald-950/60 text-emerald-300 border border-emerald-800/40"
                      }`}
                    >
                      {test.risk}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800/80">
            <button
              onClick={onViewReports}
              className="w-full py-3 rounded-xl text-xs font-bold text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all text-center flex items-center justify-center gap-2 group shadow-sm"
            >
              <span>View Full Security Reports & Telemetry</span>
              <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
