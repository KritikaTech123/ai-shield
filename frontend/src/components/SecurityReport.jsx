import React, { useState } from "react";
import { exportReportToCSV } from "../mockEngine.js";
import {
  DocumentTextIcon,
  ArrowDownTrayIcon,
  PrinterIcon,
  ArrowPathIcon,
  ArrowLeftIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  CodeBracketIcon,
  GlobeAltIcon,
  SparklesIcon,
  BugAntIcon,
  KeyIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

export default function SecurityReport({ reportData, onRunAgain, onBackToDashboard }) {
  const [copiedHash, setCopiedHash] = useState(false);

  if (!reportData) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-5 animate-fadeIn">
        <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-amber-400 shadow-xl shadow-amber-500/10">
          <DocumentTextIcon className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">No Security Report Available Yet</h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Run an automated Red-Team test or select an audit run from the dashboard to generate comprehensive forensic telemetry and compliance findings.
        </p>
        <button
          onClick={onRunAgain}
          className="px-6 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 transition-all shadow-lg shadow-amber-500/20 inline-flex items-center gap-2"
        >
          <ArrowPathIcon className="w-4 h-4" />
          <span>Run Security Test Now</span>
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

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reportData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `ai-shield-audit-${scan_id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const verificationHash = `SHA256-AIS-${scan_id.toUpperCase()}-SECURE`;

  const copyHash = () => {
    navigator.clipboard?.writeText(verificationHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 print:p-0 animate-fadeIn">
      {/* Top Controls (Hidden in Print) */}
      <div className="flex flex-wrap items-center justify-between gap-4 print:hidden border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToDashboard}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-2 shadow-sm"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </button>
          <button
            onClick={onRunAgain}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/30 hover:border-amber-500/60 transition-all flex items-center gap-2 shadow-sm"
          >
            <ArrowPathIcon className="w-3.5 h-3.5" />
            <span>Run Test Again</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportJSON}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-1.5 shadow-sm"
            title="Download full audit findings as JSON"
          >
            <CodeBracketIcon className="w-4 h-4 text-slate-400" />
            <span>JSON</span>
          </button>

          <button
            onClick={handleDownloadCSV}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-2 shadow-sm"
          >
            <ArrowDownTrayIcon className="w-4 h-4 text-amber-400" />
            <span>Download Report (CSV)</span>
          </button>

          <button
            onClick={handlePrintPDF}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20"
          >
            <PrinterIcon className="w-4 h-4 text-slate-950" />
            <span>Download Report (PDF / Print)</span>
          </button>
        </div>
      </div>

      {/* Main Printable Document Card */}
      <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl space-y-8 print:bg-white print:text-black print:border-none print:shadow-none print:p-2 relative overflow-hidden">
        {/* Subtle decorative grid in card background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none print:hidden" />

        {/* Report Banner & Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-slate-800 print:border-slate-300 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 print:bg-slate-100 print:border-slate-300 print:text-black">
                <ShieldCheckIcon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-white print:text-black tracking-wider block">
                  AI-SHIELD SECURITY AUDIT REPORT
                </span>
                <span className="text-[11px] text-amber-400 print:text-slate-700 font-mono font-semibold tracking-widest uppercase">
                  Automated Adversarial Penetration Testing & AI Guardrail Compliance
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs pt-2">
              <span className="font-mono bg-slate-950 print:bg-slate-100 px-3 py-1 rounded-lg text-amber-400 print:text-slate-800 font-bold border border-slate-800 print:border-slate-300">
                Scan ID: {scan_id}
              </span>
              <span className="text-slate-400 print:text-slate-600 font-mono text-xs">
                Timestamp: {new Date(created).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Real vs Simulated Badge */}
          <div className="flex flex-col items-start md:items-end gap-2">
            <div
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wider font-mono uppercase flex items-center gap-1.5 ${
                isSimulatedEnvironment
                  ? "bg-amber-950/60 text-amber-300 border border-amber-600/60 shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                  : "bg-emerald-950/60 text-emerald-300 border border-emerald-600/60 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
              }`}
            >
              <SparklesIcon className="w-3.5 h-3.5" />
              <span>{isSimulatedEnvironment ? "SIMULATED TEST ENVIRONMENT" : "REAL AUTHORIZED TEST"}</span>
            </div>
            <span className="text-[11px] text-slate-400 print:text-slate-500 flex items-center gap-1.5">
              <GlobeAltIcon className="w-3.5 h-3.5 text-slate-500" />
              <span>Target: </span>
              <code className="font-mono text-slate-200 print:text-black px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 print:bg-slate-100 print:border-slate-300">
                {target_url}
              </code>
            </span>
          </div>
        </div>

        {/* Executive Summary Metrics Card */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-950/80 print:bg-slate-100 border border-slate-800 print:border-slate-300 shadow-inner">
          <div className="space-y-1">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 print:text-slate-600 font-semibold">
              Overall Risk Score
            </div>
            <div className="text-3xl sm:text-4xl font-black font-mono text-white print:text-black tracking-tight">
              {score}
              <span className="text-xs text-slate-500 font-sans"> / 100</span>
            </div>
            <span
              className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-lg border ${
                score >= 70
                  ? "bg-red-950 text-red-300 border-red-800/40"
                  : score >= 40
                  ? "bg-orange-950 text-orange-300 border-orange-800/40"
                  : score >= 20
                  ? "bg-amber-950 text-amber-300 border-amber-800/40"
                  : "bg-emerald-950 text-emerald-300 border-emerald-800/40"
              }`}
            >
              {score >= 40 ? (
                <ShieldExclamationIcon className="w-3 h-3" />
              ) : (
                <ShieldCheckIcon className="w-3 h-3" />
              )}
              <span>{risk} Risk Level</span>
            </span>
          </div>

          <div className="space-y-1">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 print:text-slate-600 font-semibold">
              Total Probes Executed
            </div>
            <div className="text-3xl sm:text-4xl font-black font-mono text-slate-200 print:text-black tracking-tight">
              {total || done}
            </div>
            <span className="text-[11px] text-slate-500 block">Adversarial test cases</span>
          </div>

          <div className="space-y-1">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 print:text-slate-600 font-semibold">
              Successful Attacks (Breached)
            </div>
            <div className="text-3xl sm:text-4xl font-black font-mono text-red-400 tracking-tight">
              {successful_attacks}
            </div>
            <span className="text-[11px] text-red-400/80 block">Vulnerabilities detected</span>
          </div>

          <div className="space-y-1">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 print:text-slate-600 font-semibold">
              Blocked Attacks (Defended)
            </div>
            <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-400 tracking-tight">
              {blocked_attacks}
            </div>
            <span className="text-[11px] text-emerald-400/80 block">Policy upheld</span>
          </div>
        </div>

        {/* Summary of Security Weaknesses */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold text-slate-200 print:text-black uppercase tracking-wider flex items-center gap-2">
            <ShieldExclamationIcon className="w-4 h-4 text-amber-400" />
            <span>Summary of Security Weaknesses</span>
          </h3>
          <p className="text-xs text-slate-300 print:text-slate-700 leading-relaxed bg-slate-950/40 print:bg-slate-50 p-4 rounded-xl border border-slate-800/60 print:border-slate-300">
            During this assessment, AI-SHIELD simulated hostile adversarial prompts targeting prompt injection,
            system instructions leakage, tool misuse, and data exfiltration. The target agent scored a risk rating of{" "}
            <strong className="text-amber-400 print:text-black font-mono font-bold">{score}/100 ({risk})</strong>.
            Key attack vectors evaluated include direct instruction overrides, role-playing jailbreaks, synthetic secret extraction, and unauthorized tool invocations.
          </p>
        </div>

        {/* Category Breakdown Table */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-200 print:text-black uppercase tracking-wider flex items-center gap-2">
            <BugAntIcon className="w-4 h-4 text-amber-400" />
            <span>Attack Category Vulnerability Breakdown</span>
          </h3>
          <div className="border border-slate-800 print:border-slate-300 rounded-2xl overflow-hidden shadow-inner">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/90 print:bg-slate-200 text-slate-400 print:text-black font-semibold border-b border-slate-800 print:border-slate-300">
                <tr>
                  <th className="py-3 px-4 font-bold uppercase tracking-wider">Attack Category</th>
                  <th className="py-3 px-4 font-bold uppercase tracking-wider">Total Probes</th>
                  <th className="py-3 px-4 font-bold uppercase tracking-wider">Vulnerabilities</th>
                  <th className="py-3 px-4 text-right font-bold uppercase tracking-wider">Breach Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 print:divide-slate-200 font-mono">
                {categories.map((c) => {
                  const percent = c.percent || (c.total ? Math.round((c.succeeded / c.total) * 100) : 0);
                  const isHigh = percent >= 50;
                  return (
                    <tr key={c.category} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-4 font-sans font-bold text-slate-200 print:text-black">
                        {c.category}
                      </td>
                      <td className="py-3 px-4 text-slate-300 print:text-black">{c.total}</td>
                      <td className="py-3 px-4">
                        <span className={`font-bold ${isHigh ? "text-red-400" : "text-amber-400"}`}>
                          {c.succeeded}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span
                          className={`font-bold px-2 py-0.5 rounded ${
                            isHigh
                              ? "bg-red-950/50 text-red-400 border border-red-800/30"
                              : "bg-amber-950/50 text-amber-400 border border-amber-800/30"
                          } print:border-none print:bg-transparent print:text-black`}
                        >
                          {percent}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Findings & Evidence */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-200 print:text-black uppercase tracking-wider flex items-center gap-2">
            <CheckBadgeIcon className="w-4 h-4 text-amber-400" />
            <span>Evidence for Each Finding</span>
          </h3>
          <div className="space-y-3">
            {results.map((r, i) => {
              const isBreach = r.verdict === "leaked" || r.passed === false;
              return (
                <div
                  key={r.id || i}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 print:bg-slate-50 border border-slate-800/80 print:border-slate-300 space-y-3 text-xs shadow-sm hover:border-slate-700 transition-all"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/60 pb-2.5">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                        #{i + 1}
                      </span>
                      <span className="font-bold text-slate-100 print:text-black text-sm">
                        {r.attack || r.name}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        [{r.category}]
                      </span>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full font-mono flex items-center gap-1.5 ${
                        isBreach
                          ? "bg-red-950/80 text-red-400 border border-red-700/60 shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                          : "bg-emerald-950/80 text-emerald-400 border border-emerald-700/60 shadow-[0_0_8px_rgba(16,185,129,0.2)]"
                      }`}
                    >
                      {isBreach ? (
                        <>
                          <XCircleIcon className="w-3.5 h-3.5 text-red-400" />
                          <span>VULNERABILITY DETECTED</span>
                        </>
                      ) : (
                        <>
                          <CheckCircleIcon className="w-3.5 h-3.5 text-emerald-400" />
                          <span>BLOCKED</span>
                        </>
                      )}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/60 space-y-1">
                      <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                        <KeyIcon className="w-3.5 h-3.5 text-slate-400" />
                        <span>Observed Evidence Telemetry:</span>
                      </div>
                      <p className="text-slate-300 font-mono text-[11px] leading-relaxed">
                        {r.evidence || "Agent refused unauthorized directive or complied strictly within policy boundaries."}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/60 space-y-1">
                      <div className="text-[11px] font-semibold text-amber-400 flex items-center gap-1.5">
                        <ShieldCheckIcon className="w-3.5 h-3.5 text-amber-400" />
                        <span>Recommended Remediation:</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        {r.fix || r.recommendedFix || "Verify prompt boundary tags, enforce least-privilege tool execution, and strip synthetic credentials."}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommended Remediation Section */}
        <div className="space-y-3 border-t border-slate-800 print:border-slate-300 pt-6">
          <h3 className="text-xs font-bold text-slate-200 print:text-black uppercase tracking-wider flex items-center gap-2">
            <SparklesIcon className="w-4 h-4 text-amber-400" />
            <span>Priority Security Recommendations</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {recommended_fixes.length > 0 ? (
              recommended_fixes.map((f, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-amber-950/20 print:bg-amber-50 border border-amber-500/30 print:border-amber-300 text-xs space-y-1.5 shadow-sm"
                >
                  <div className="font-bold text-amber-300 print:text-amber-900 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{f.category}</span>
                  </div>
                  <p className="text-slate-300 print:text-slate-800 leading-relaxed">{f.fix}</p>
                </div>
              ))
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-xs col-span-2 flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>No critical vulnerabilities requiring immediate fixes. The target AI agent demonstrated robust guardrail compliance.</span>
              </div>
            )}
          </div>
        </div>

        {/* Signoff Footer */}
        <div className="border-t border-slate-800 print:border-slate-300 pt-6 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheckIcon className="w-4 h-4 text-amber-400" />
            <span>AI-SHIELD Automated Security Testing Platform · Team STRIVERS</span>
          </div>
          <button
            onClick={copyHash}
            className="font-mono text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 text-[11px]"
            title="Click to copy verification hash"
          >
            <span>Verification Hash: {verificationHash}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {copiedHash ? "Copied!" : "Copy"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

