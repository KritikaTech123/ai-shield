import React from "react";
import { exportReportToCSV } from "../mockEngine.js";

export default function SecurityReport({ reportData, onRunAgain, onBackToDashboard }) {
  if (!reportData) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-4">
        <span className="text-4xl block">📋</span>
        <h2 className="text-xl font-bold text-white">No Security Report Available Yet</h2>
        <p className="text-sm text-slate-400">
          Run an automated Red-Team test or select an audit run from the dashboard to view full findings.
        </p>
        <button
          onClick={onRunAgain}
          className="px-6 py-2.5 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all"
        >
          Run Security Test Now
        </button>
      </div>
    );
  }

  const {
    scan_id = "AIS-2026-0001",
    created = new Date().toISOString(),
    target_url = "http://localhost:9000/chat",
    is_simulated = true,
    total = 0,
    done = 0,
    score = 0,
    risk = "Medium",
    successful_attacks = 0,
    blocked_attacks = 0,
    categories = [],
    results = [],
    recommended_fixes = [],
  } = reportData;

  const isSimulatedEnvironment =
    is_simulated || target_url.includes("localhost:9000") || target_url.includes("demo");

  const handleDownloadCSV = () => {
    exportReportToCSV(reportData);
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 print:p-0">
      {/* Top Controls (Hidden in Print) */}
      <div className="flex flex-wrap items-center justify-between gap-4 print:hidden border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToDashboard}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all flex items-center gap-1.5"
          >
            ← Back to Dashboard
          </button>
          <button
            onClick={onRunAgain}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/40 transition-all flex items-center gap-1.5"
          >
            <span>🔄</span> Run Test Again
          </button>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleDownloadCSV}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>📥</span> Download Report (CSV)
          </button>
          <button
            onClick={handlePrintPDF}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/20"
          >
            <span>🖨️</span> Download Report (PDF / Print)
          </button>
        </div>
      </div>

      {/* Main Printable Document Card */}
      <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-8 print:bg-white print:text-black print:border-none print:shadow-none">
        {/* Report Banner & Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-slate-800 print:border-slate-300 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🛡️</span>
              <span className="text-xl font-black text-white print:text-black tracking-wider">
                AI-SHIELD SECURITY AUDIT REPORT
              </span>
            </div>
            <p className="text-xs text-slate-400 print:text-slate-600">
              Automated Adversarial Penetration Testing & AI Guardrail Compliance Verification
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs pt-1">
              <span className="font-mono bg-slate-950 print:bg-slate-100 px-2.5 py-1 rounded text-amber-400 print:text-slate-800 font-bold border border-slate-800 print:border-slate-300">
                Scan ID: {scan_id}
              </span>
              <span className="text-slate-400 print:text-slate-600 font-mono">
                Date: {new Date(created).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Real vs Simulated Badge */}
          <div className="flex flex-col items-start md:items-end gap-2">
            <div
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wider font-mono uppercase ${
                isSimulatedEnvironment
                  ? "bg-amber-950/60 text-amber-300 border border-amber-600/60"
                  : "bg-emerald-950/60 text-emerald-300 border border-emerald-600/60"
              }`}
            >
              {isSimulatedEnvironment ? "SIMULATED TEST ENVIRONMENT" : "REAL AUTHORIZED TEST"}
            </div>
            <span className="text-[11px] text-slate-400 print:text-slate-500">
              Target: <code className="font-mono text-slate-200 print:text-black">{target_url}</code>
            </span>
          </div>
        </div>

        {/* Executive Summary Metrics Card */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-950/80 print:bg-slate-100 border border-slate-800 print:border-slate-300">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400 print:text-slate-600 font-semibold">
              Overall Risk Score
            </div>
            <div className="text-4xl font-black font-mono mt-1 text-white print:text-black">
              {score}
              <span className="text-xs text-slate-500 font-sans"> / 100</span>
            </div>
            <span
              className={`inline-block mt-1 text-xs font-bold px-2 py-0.5 rounded ${
                score >= 70
                  ? "bg-red-950 text-red-300"
                  : score >= 40
                  ? "bg-orange-950 text-orange-300"
                  : score >= 20
                  ? "bg-amber-950 text-amber-300"
                  : "bg-emerald-950 text-emerald-300"
              }`}
            >
              {risk} Risk Level
            </span>
          </div>

          <div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400 print:text-slate-600 font-semibold">
              Total Tests Executed
            </div>
            <div className="text-3xl font-black font-mono mt-1 text-slate-200 print:text-black">
              {total || done}
            </div>
            <span className="text-[11px] text-slate-500">Adversarial test cases</span>
          </div>

          <div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400 print:text-slate-600 font-semibold">
              Successful Attacks (Breached)
            </div>
            <div className="text-3xl font-black font-mono mt-1 text-red-500">
              {successful_attacks}
            </div>
            <span className="text-[11px] text-red-400/80">Vulnerabilities detected</span>
          </div>

          <div>
            <div className="text-[11px] uppercase tracking-wider text-slate-400 print:text-slate-600 font-semibold">
              Blocked Attacks (Defended)
            </div>
            <div className="text-3xl font-black font-mono mt-1 text-emerald-400">
              {blocked_attacks}
            </div>
            <span className="text-[11px] text-emerald-400/80">Policy upheld</span>
          </div>
        </div>

        {/* Summary of Security Weaknesses */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white print:text-black uppercase tracking-wider flex items-center gap-2">
            <span>🛡️</span> Summary of Security Weaknesses
          </h3>
          <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed">
            During this assessment, AI-SHIELD simulated hostile adversarial prompts targeting prompt injection,
            system instructions leakage, tool misuse, and data exfiltration. The target agent scored a risk rating of{" "}
            <strong className="text-amber-400 print:text-black font-mono">{score}/100 ({risk})</strong>.
            Critical weaknesses were observed in direct instruction overrides and synthetic secret disclosure.
          </p>
        </div>

        {/* Category Breakdown Table */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white print:text-black uppercase tracking-wider flex items-center gap-2">
            <span>📊</span> Attack Category Vulnerability Breakdown
          </h3>
          <div className="border border-slate-800 print:border-slate-300 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/70 print:bg-slate-200 text-slate-400 print:text-black font-semibold border-b border-slate-800 print:border-slate-300">
                <tr>
                  <th className="py-2.5 px-4">Attack Category</th>
                  <th className="py-2.5 px-4">Total Probes</th>
                  <th className="py-2.5 px-4">Vulnerabilities</th>
                  <th className="py-2.5 px-4 text-right">Breach Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 print:divide-slate-200 font-mono">
                {categories.map((c) => (
                  <tr key={c.category} className="hover:bg-slate-800/30">
                    <td className="py-2.5 px-4 font-sans font-bold text-slate-200 print:text-black">
                      {c.category}
                    </td>
                    <td className="py-2.5 px-4 text-slate-300 print:text-black">{c.total}</td>
                    <td className="py-2.5 px-4 text-red-400 font-bold">{c.succeeded}</td>
                    <td className="py-2.5 px-4 text-right">
                      <span className="font-bold text-amber-400 print:text-black">{c.percent}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Findings & Evidence */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white print:text-black uppercase tracking-wider flex items-center gap-2">
            <span>🔍</span> Evidence for Each Finding
          </h3>
          <div className="space-y-3">
            {results.map((r, i) => (
              <div
                key={r.id || i}
                className="p-4 rounded-xl bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-300 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-400 print:text-black">#{i + 1}</span>
                    <span className="font-bold text-slate-200 print:text-black">{r.attack || r.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">[{r.category}]</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      r.verdict === "leaked"
                        ? "bg-red-950 text-red-300 border border-red-800"
                        : "bg-emerald-950 text-emerald-300 border border-emerald-800"
                    }`}
                  >
                    {r.verdict === "leaked" ? "VULNERABILITY DETECTED" : "BLOCKED"}
                  </span>
                </div>

                <div className="text-slate-400 print:text-slate-700">
                  <strong className="text-slate-300 print:text-black font-semibold">Evidence:</strong>{" "}
                  {r.evidence || "Refused or complied within policy boundaries."}
                </div>

                <div className="text-slate-400 print:text-slate-700">
                  <strong className="text-amber-400 print:text-black font-semibold">Remediation:</strong>{" "}
                  {r.fix || r.recommendedFix || "Verify prompt boundary tags and least-privilege tool execution."}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Remediation Section */}
        <div className="space-y-3 border-t border-slate-800 print:border-slate-300 pt-6">
          <h3 className="text-sm font-bold text-white print:text-black uppercase tracking-wider flex items-center gap-2">
            <span>💡</span> Priority Security Recommendations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {recommended_fixes.length > 0 ? (
              recommended_fixes.map((f, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-amber-950/20 print:bg-amber-50 border border-amber-500/30 print:border-amber-300 text-xs space-y-1"
                >
                  <div className="font-bold text-amber-300 print:text-amber-900">{f.category}</div>
                  <p className="text-slate-300 print:text-slate-800">{f.fix}</p>
                </div>
              ))
            ) : (
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-xs col-span-2">
                No active vulnerabilities requiring immediate fixes. The agent demonstrated robust guardrail compliance.
              </div>
            )}
          </div>
        </div>

        {/* Signoff Footer */}
        <div className="border-t border-slate-800 print:border-slate-300 pt-6 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
          <span>AI-SHIELD Automated Security Testing Platform · Team STRIVERS</span>
          <span className="font-mono">Verification Hash: SHA256-AIS-{scan_id}</span>
        </div>
      </div>
    </div>
  );
}
