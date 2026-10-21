import React from "react";

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
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-[#141d2e] border border-slate-700/80 p-8 shadow-2xl">
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              Automated Adversarial Security Testing Lab
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              AI-SHIELD Intelligence Dashboard
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Automated Red-Team attack simulation and Blue-Team defense evaluation for LLM agents.
              Safely probe endpoints against prompt injection, data leakage, and tool misuse before deployment.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onNewTest}
              className="px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2"
            >
              <span>🎯</span> Create New Test
            </button>
            <button
              onClick={onRunDemo}
              className="px-5 py-2.5 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 border border-amber-500/40 text-amber-300 transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2"
            >
              <span>⚡</span> Run Demo Scan
            </button>
            <button
              onClick={onViewReports}
              className="px-5 py-2.5 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2"
            >
              <span>📋</span> View Reports
            </button>
          </div>
        </div>
      </div>

      {/* Demo Data Notice */}
      <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-300">
        <div className="flex items-center gap-2">
          <span className="text-base">⚠️</span>
          <span>
            <strong>DEMO DATA NOTICE:</strong> The telemetry shown reflects baseline benchmark statistics. Real-time test results are computed dynamically from actual sandbox executions.
          </span>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
          DEMO DATA
        </span>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Tests Executed</span>
            <span className="text-xl">🧪</span>
          </div>
          <div className="text-3xl font-extrabold text-white">{stats.totalTests}</div>
          <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
            <span className="text-emerald-400 font-bold">↑ 12%</span> vs last benchmark cycle
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Vulnerabilities Detected</span>
            <span className="text-xl">⚠️</span>
          </div>
          <div className="text-3xl font-extrabold text-amber-400">{stats.vulnerabilitiesDetected}</div>
          <p className="text-xs text-slate-400 mt-2">
            Across 6 attack surface vectors
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Critical Vulnerabilities</span>
            <span className="text-xl">🚨</span>
          </div>
          <div className="text-3xl font-extrabold text-red-500">{stats.criticalVulnerabilities}</div>
          <p className="text-xs text-red-400/80 mt-2 flex items-center gap-1">
            <span>●</span> High-severity data leak / tool abuse
          </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Average Risk Score</span>
            <span className="text-xl">🧮</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-400">{stats.avgRiskScore}</span>
            <span className="text-sm text-slate-400 font-semibold">/ 100</span>
            <span className="ml-auto text-xs px-2 py-0.5 rounded font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Medium Risk
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Calculated via severity-weighted formula
          </p>
        </div>
      </div>

      {/* Middle Grid: Category Breakdown Chart + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Vulnerabilities by Category Chart */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>📊</span> Vulnerabilities by Category
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Distribution of successful adversarial attacks by OWASP LLM category
              </p>
            </div>
            <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded border border-slate-700">
              OWASP Top 10 for LLMs
            </span>
          </div>

          <div className="space-y-4">
            {stats.categoryBreakdown.map((item) => (
              <div key={item.category} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{item.category}</span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-slate-400">{item.count} detections</span>
                    <span
                      className={`px-1.5 py-0.2 rounded font-bold text-[10px] ${
                        item.severity === "Critical"
                          ? "bg-red-950/60 text-red-400 border border-red-800/40"
                          : item.severity === "High"
                          ? "bg-orange-950/60 text-orange-400 border border-orange-800/40"
                          : "bg-amber-950/60 text-amber-400 border border-amber-800/40"
                      }`}
                    >
                      {item.severity}
                    </span>
                    <span className="text-amber-400 font-bold w-10 text-right">{item.percent}%</span>
                  </div>
                </div>
                <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      item.severity === "Critical"
                        ? "bg-gradient-to-r from-red-600 to-rose-500"
                        : item.severity === "High"
                        ? "bg-gradient-to-r from-orange-600 to-amber-500"
                        : "bg-gradient-to-r from-amber-500 to-yellow-400"
                    }`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-rose-500 inline-block" /> Critical Severity (Weight: 4)
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-500 inline-block" /> High Severity (Weight: 3)
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-yellow-400 inline-block" /> Medium/Low (Weight: 1-2)
            </span>
          </div>
        </div>

        {/* Recent Security Test Activity */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>🕒</span> Recent Security Test Activity
              </h2>
              <span className="text-xs text-slate-400 font-mono">Real-time Audits</span>
            </div>

            <div className="divide-y divide-slate-800/80">
              {recentActivity.map((test) => (
                <div
                  key={test.id}
                  onClick={() => onSelectRun && onSelectRun(test)}
                  className="py-3 group cursor-pointer hover:bg-slate-800/40 px-2 rounded-lg transition-colors flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-amber-400">{test.id}</span>
                      <span className="text-xs font-semibold text-slate-200 group-hover:text-amber-300 transition-colors">
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

          <div className="mt-4 pt-4 border-t border-slate-800">
            <button
              onClick={onViewReports}
              className="w-full py-2.5 rounded-xl text-xs font-bold text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all text-center flex items-center justify-center gap-1.5"
            >
              <span>View Full Audit History</span> →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
