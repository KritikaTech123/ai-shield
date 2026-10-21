import React, { useState } from "react";

export default function CreateTest({ onStartTest, isSubmitting }) {
  const [targetUrl, setTargetUrl] = useState("http://localhost:9000/chat");
  const [environment, setEnvironment] = useState("Demo Agent");
  const [categories, setCategories] = useState([
    "Prompt Injection",
    "Jailbreaks & Role-Play",
    "Sensitive Data Leakage",
    "System Prompt Leakage",
    "Tool & API Misuse",
    "Unsafe Output",
  ]);
  const [numTestCases, setNumTestCases] = useState(15);
  const [testMode, setTestMode] = useState("Quick Scan");
  const [error, setError] = useState("");

  const allCategories = [
    {
      name: "Prompt Injection",
      desc: "Instruction override, context delimiter escapes, and prompt framing",
      severity: "High (3)",
    },
    {
      name: "Jailbreaks & Role-Play",
      desc: "DAN persona, role-play framing, and cognitive inversion tricks",
      severity: "Medium (2)",
    },
    {
      name: "Sensitive Data Leakage",
      desc: "Synthetic secret extraction, credential harvesting, and PII probing",
      severity: "Critical (4)",
    },
    {
      name: "System Prompt Leakage",
      desc: "System instruction extraction, hidden rule disclosure, and translation bypass",
      severity: "High (3)",
    },
    {
      name: "Tool & API Misuse",
      desc: "Unauthorized database actions, malicious arguments, and privilege escalation",
      severity: "Critical (4)",
    },
    {
      name: "Unsafe Output",
      desc: "Hazardous code generation, social engineering lures, and toxic content",
      severity: "Medium (2)",
    },
  ];

  const toggleCategory = (cat) => {
    if (categories.includes(cat)) {
      if (categories.length === 1) {
        setError("You must select at least one attack category.");
        return;
      }
      setCategories(categories.filter((c) => c !== cat));
    } else {
      setError("");
      setCategories([...categories, cat]);
    }
  };

  const handleSelectAll = () => {
    setCategories(allCategories.map((c) => c.name));
    setError("");
  };

  const handleDeselectAll = () => {
    setCategories(["Prompt Injection"]);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!targetUrl.trim()) {
      setError("Target URL is required.");
      return;
    }
    if (categories.length === 0) {
      setError("Select at least one attack category.");
      return;
    }
    setError("");
    onStartTest({
      targetUrl,
      environment,
      categories,
      numTestCases,
      testMode,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
          <span>⚙️</span> Step 1 · Test Configuration
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Create Security Test</h1>
        <p className="text-slate-400 text-sm mt-1">
          Configure an automated adversarial security assessment against an authorized AI agent target.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Card 1: Target Endpoint & Environment */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span>🎯</span> 1. Target AI Agent Endpoint & Environment
          </h2>

          {/* Environment Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Test Environment
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setEnvironment("Demo Agent");
                  setTargetUrl("http://localhost:9000/chat");
                }}
                className={`p-4 rounded-xl border text-left transition-all ${
                  environment === "Demo Agent"
                    ? "bg-amber-500/10 border-amber-500 text-amber-300 ring-1 ring-amber-500/30"
                    : "bg-slate-800/60 border-slate-700/80 text-slate-300 hover:border-slate-600"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm">Demo Agent (Isolated Sandbox)</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 font-mono">
                    PORT 9000
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Pre-configured mock customer support bot with intentional vulnerabilities. Safe for live demos.
                </p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setEnvironment("Custom Endpoint");
                  setTargetUrl("https://example.com/api/chat");
                }}
                className={`p-4 rounded-xl border text-left transition-all ${
                  environment === "Custom Endpoint"
                    ? "bg-amber-500/10 border-amber-500 text-amber-300 ring-1 ring-amber-500/30"
                    : "bg-slate-800/60 border-slate-700/80 text-slate-300 hover:border-slate-600"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm">Custom Endpoint</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 font-mono">
                    AUTHORIZED
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Supply an authorized external AI agent endpoint following the standard POST /chat schema.
                </p>
              </button>
            </div>
          </div>

          {/* URL Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Target AI Agent URL
              </label>
              <span className="text-[11px] text-slate-400 font-mono">Expects: POST with message</span>
            </div>
            <div className="relative">
              <input
                type="text"
                value={targetUrl}
                onChange={(e) => setTargetUrl(e.target.value)}
                placeholder="https://example.com/api/chat"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm font-mono text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Attack Categories */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>🛡️</span> 2. Attack Categories to Test
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Select vectors from the OWASP Top 10 for Large Language Models
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={handleSelectAll}
                className="text-amber-400 hover:text-amber-300 px-2 py-1 rounded bg-amber-500/10 border border-amber-500/30"
              >
                Select All
              </button>
              <button
                type="button"
                onClick={handleDeselectAll}
                className="text-slate-400 hover:text-slate-300 px-2 py-1 rounded bg-slate-800 border border-slate-700"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {allCategories.map((cat) => {
              const isChecked = categories.includes(cat.name);
              return (
                <div
                  key={cat.name}
                  onClick={() => toggleCategory(cat.name)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                    isChecked
                      ? "bg-slate-850 bg-slate-800/80 border-amber-500/60 shadow-sm shadow-amber-500/5"
                      : "bg-slate-950/40 border-slate-800/80 text-slate-500 hover:border-slate-700"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="mt-1 h-4 w-4 rounded border-slate-600 text-amber-500 focus:ring-amber-500 accent-amber-500"
                  />
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-bold ${isChecked ? "text-slate-100" : "text-slate-400"}`}>
                        {cat.name}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                        {cat.severity}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-tight">{cat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Card 3: Scope & Test Mode */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span>📊</span> 3. Test Cases & Assessment Mode
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Number of Test Cases */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Number of Test Cases
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[10, 30, 60].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setNumTestCases(num)}
                    className={`py-3 rounded-xl border text-center transition-all ${
                      numTestCases === num
                        ? "bg-amber-500/15 border-amber-500 text-amber-300 font-bold ring-1 ring-amber-500/30"
                        : "bg-slate-850 bg-slate-800/50 border-slate-700/80 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    <span className="text-lg block font-mono font-bold">{num}</span>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400">Tests</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Test Mode */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Test Mode
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: "Quick Scan", label: "Quick Scan", desc: "Rapid benchmark (1-2m)" },
                  { id: "Full Security Assessment", label: "Full Assessment", desc: "Comprehensive audit" },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setTestMode(mode.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      testMode === mode.id
                        ? "bg-amber-500/15 border-amber-500 text-amber-300 ring-1 ring-amber-500/30"
                        : "bg-slate-850 bg-slate-800/50 border-slate-700/80 text-slate-400 hover:border-slate-600"
                    }`}
                  >
                    <span className="text-xs font-bold block text-slate-200">{mode.label}</span>
                    <span className="text-[11px] text-slate-400 mt-1 block leading-tight">{mode.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Security Requirements Callout */}
        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5 space-y-2 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <span>🔒</span> Mandatory Security Safeguards
          </div>
          <ul className="list-disc ml-5 space-y-1">
            <li>Only test AI agents and APIs you explicitly own or have written permission to audit.</li>
            <li>The default demo agent operates inside an isolated local sandbox using synthetic secrets.</li>
            <li>No adversarial inputs are sent to arbitrary third-party or untrusted external systems.</li>
            <li>Potentially destructive tool actions (e.g. database wipes) are strictly simulated in safe sandboxes.</li>
          </ul>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-800 text-red-300 text-sm flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* Prominent Start Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting || categories.length === 0}
            className="w-full py-4 rounded-2xl font-black text-base tracking-wider uppercase bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-xl shadow-amber-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <>
                <span className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                INITIALIZING RED-TEAM ENGINE...
              </>
            ) : (
              <>
                <span>⚡</span> START SECURITY TEST ({numTestCases} TEST CASES)
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
