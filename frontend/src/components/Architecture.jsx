import React, { useState } from "react";

export default function Architecture() {
  const [selectedNode, setSelectedNode] = useState("redteam");

  const nodes = [
    {
      id: "user",
      name: "Security Engineer / User",
      role: "Auditor & Operator",
      desc: "Configures test target, selects attack vectors, initiates automated runs, and downloads audited security reports.",
      tech: "Developer / CI/CD Pipeline",
      color: "border-slate-600 bg-slate-900",
      accent: "text-slate-200",
    },
    {
      id: "dashboard",
      name: "AI-SHIELD Dashboard",
      role: "Interactive Cybersecurity UI",
      desc: "Responsive frontend built in React + Tailwind CSS with dark navy theme, live progress animation, and audit telemetry.",
      tech: "React 18 · Tailwind CSS · Vite",
      color: "border-amber-500/60 bg-slate-900/90 shadow-lg shadow-amber-500/10",
      accent: "text-amber-400",
    },
    {
      id: "backend",
      name: "FastAPI Backend",
      role: "Orchestration & REST API",
      desc: "Coordinates async test jobs, manages persistent storage, provides /health and test execution endpoints.",
      tech: "Python 3.14 · FastAPI · Uvicorn",
      color: "border-teal-500/60 bg-slate-900/90 shadow-lg shadow-teal-500/10",
      accent: "text-teal-400",
    },
    {
      id: "redteam",
      name: "Red-Team Engine",
      role: "Adversarial Attack Generation",
      desc: "Dispatches parameterized prompts across 6 OWASP categories including prompt injection, jailbreaks, and tool misuse.",
      tech: "Attack Library · Severity Weights 1-4",
      color: "border-red-500/60 bg-slate-900/90 shadow-lg shadow-red-500/10",
      accent: "text-red-400",
    },
    {
      id: "sandbox",
      name: "Isolated Test AI Agent",
      role: "Docker Sandbox Environment",
      desc: "Agent under test runs inside an isolated container with mock data, synthetic secrets, and safe dummy tools.",
      tech: "Docker Sandbox · FastAPI (:9000)",
      color: "border-blue-500/60 bg-slate-900/90 shadow-lg shadow-blue-500/10",
      accent: "text-blue-400",
    },
    {
      id: "blueteam",
      name: "Blue-Team Evaluator",
      role: "Response & Guardrail Judge",
      desc: "Applies multi-point security verification checking for secret exposure, system prompt leaks, and tool misuse.",
      tech: "Rule Evaluator + LLM Judge Hook",
      color: "border-emerald-500/60 bg-slate-900/90 shadow-lg shadow-emerald-500/10",
      accent: "text-emerald-400",
    },
    {
      id: "scoring",
      name: "Risk Scoring Engine",
      role: "Mathematical Risk Calculation",
      desc: "Computes 0-100 severity-weighted score: 100 × (Weighted Successful / Weighted Total).",
      tech: "Deterministic Severity Algorithm",
      color: "border-amber-500/60 bg-slate-900/90 shadow-lg shadow-amber-500/10",
      accent: "text-amber-300",
    },
    {
      id: "report",
      name: "Security Report",
      role: "Compliance & Remediation Artifact",
      desc: "Produces full audit trail, category breakdown, finding evidence, CSV exports, and printable PDF formats.",
      tech: "CSV Exporter · Print Stylesheet",
      color: "border-purple-500/60 bg-slate-900/90 shadow-lg shadow-purple-500/10",
      accent: "text-purple-400",
    },
  ];

  const currentNode = nodes.find((n) => n.id === selectedNode) || nodes[3];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
          <span>🏗️</span> System Architecture
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">AI-SHIELD Architecture & Data Flow</h1>
        <p className="text-slate-400 text-sm mt-1">
          Interactive flow diagram showing the end-to-end data pipeline from user dispatch to Docker sandbox and scoring.
        </p>
      </div>

      {/* Interactive Flow Diagram */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-8">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Click any component node to inspect specifications
          </span>
          <span className="text-xs text-amber-400 font-mono px-2.5 py-1 rounded bg-amber-950/40 border border-amber-800/40">
            Interactive Topology
          </span>
        </div>

        {/* Visual pipeline boxes */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 overflow-x-auto pb-4">
          {nodes.map((node, i) => {
            const isSelected = selectedNode === node.id;
            return (
              <React.Fragment key={node.id}>
                <div
                  onClick={() => setSelectedNode(node.id)}
                  className={`flex-1 min-w-[130px] p-3.5 rounded-2xl border cursor-pointer transition-all text-center relative ${
                    node.color
                  } ${
                    isSelected
                      ? "ring-2 ring-amber-400 scale-105 z-10"
                      : "opacity-85 hover:opacity-100 hover:scale-[1.02]"
                  }`}
                >
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">
                    Step {i + 1}
                  </div>
                  <div className={`text-xs font-bold ${node.accent} leading-tight`}>
                    {node.name}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">{node.role}</div>
                </div>

                {i < nodes.length - 1 && (
                  <div className="text-slate-600 font-bold text-sm lg:rotate-0 rotate-90">
                    ➔
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Node Inspection Detail Drawer */}
        <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase font-semibold">
                Component Inspector
              </span>
              <h2 className="text-xl font-black text-white mt-0.5">{currentNode.name}</h2>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-900 border border-slate-700 font-mono text-slate-300">
              {currentNode.tech}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
              <span className="text-slate-400 font-semibold uppercase tracking-wider block">
                Primary Function
              </span>
              <p className="text-slate-200 leading-relaxed">{currentNode.role}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
              <span className="text-slate-400 font-semibold uppercase tracking-wider block">
                Architecture & Security Guardrails
              </span>
              <p className="text-slate-200 leading-relaxed">{currentNode.desc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Frontend</div>
          <div className="text-lg font-bold text-white">React.js + Tailwind</div>
          <p className="text-xs text-slate-400">
            Modular reactive interface, Tailwind utility styling, custom cyber design tokens, and instant client-side fallback.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Backend API</div>
          <div className="text-lg font-bold text-white">Python + FastAPI</div>
          <p className="text-xs text-slate-400">
            Asynchronous attack scheduler, REST endpoints for test creation and report aggregation, running on Uvicorn.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Storage</div>
          <div className="text-lg font-bold text-white">SQLite / PostgreSQL</div>
          <p className="text-xs text-slate-400">
            Persistent audit history, result logs, and seamless migration path to PostgreSQL for enterprise deployments.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Isolated Sandbox</div>
          <div className="text-lg font-bold text-white">Docker-Compatible</div>
          <p className="text-xs text-slate-400">
            Victim agent containment with mock tools, zero network exposure, and synthetic credentials to prevent unintended damage.
          </p>
        </div>
      </div>
    </div>
  );
}
