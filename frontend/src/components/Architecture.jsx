import React, { useState } from "react";
import {
  UserIcon,
  ComputerDesktopIcon,
  ServerIcon,
  BoltIcon,
  CubeTransparentIcon,
  ShieldCheckIcon,
  CalculatorIcon,
  DocumentTextIcon,
  CpuChipIcon,
  CircleStackIcon,
  CommandLineIcon,
  SparklesIcon,
  ArrowRightIcon,
  ArrowDownIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

export default function Architecture() {
  const [selectedNode, setSelectedNode] = useState("redteam");

  const nodes = [
    {
      id: "user",
      name: "Security Engineer",
      role: "Auditor & Operator",
      desc: "Configures test target parameters, selects attack vectors, launches automated test suites, and downloads verified forensic audit artifacts.",
      tech: "Developer / CI/CD Automation",
      port: "HTTPS / CLI",
      icon: UserIcon,
      color: "border-slate-700 bg-slate-900/90",
      accent: "text-slate-200",
      glow: "shadow-slate-500/10",
      inOut: "In: Test Config · Out: Trigger Signal",
    },
    {
      id: "dashboard",
      name: "AI-SHIELD UI",
      role: "Cybersecurity Command Center",
      desc: "Responsive frontend built with React, Heroicons, cyber grid visualizers, live progress websocket-polling, and interactive audit telemetry.",
      tech: "React 18 · Tailwind · Vite",
      port: "Port 5173",
      icon: ComputerDesktopIcon,
      color: "border-amber-500/50 bg-slate-900/90",
      accent: "text-amber-400",
      glow: "shadow-amber-500/20",
      inOut: "In: User Input / REST · Out: Interactive Views",
    },
    {
      id: "backend",
      name: "FastAPI Backend",
      role: "Orchestration & REST API",
      desc: "Coordinates asynchronous penetration runs, executes background workers, handles CORS, and aggregates telemetry endpoints.",
      tech: "Python 3.14 · FastAPI · Uvicorn",
      port: "Port 8000",
      icon: ServerIcon,
      color: "border-teal-500/50 bg-slate-900/90",
      accent: "text-teal-400",
      glow: "shadow-teal-500/20",
      inOut: "In: JSON /run-test · Out: Probe Streams",
    },
    {
      id: "redteam",
      name: "Red-Team Engine",
      role: "Adversarial Attack Generation",
      desc: "Dispatches parameterized hostile prompts across 6 OWASP categories including prompt injection, jailbreaks, and tool misuse.",
      tech: "Attack Library · Severity Weights 1-4",
      port: "Internal Engine",
      icon: BoltIcon,
      color: "border-red-500/50 bg-slate-900/90",
      accent: "text-red-400",
      glow: "shadow-red-500/20",
      inOut: "In: Attack Vector · Out: Hostile Payload",
    },
    {
      id: "sandbox",
      name: "Victim AI Agent",
      role: "Docker Sandbox Environment",
      desc: "The agent under test runs within an isolated container with mock databases, synthetic credentials, and zero access to production infrastructure.",
      tech: "Docker Sandbox · FastAPI (:9000)",
      port: "Port 9000",
      icon: CubeTransparentIcon,
      color: "border-blue-500/50 bg-slate-900/90",
      accent: "text-blue-400",
      glow: "shadow-blue-500/20",
      inOut: "In: Hostile Prompt · Out: Raw Agent Reply",
    },
    {
      id: "blueteam",
      name: "Blue-Team Judge",
      role: "Response & Guardrail Evaluator",
      desc: "Performs 5-point security verification checking for secret exposure, system prompt leaks, tool misuse, boundary violations, and role-play escapes.",
      tech: "Guardrail Rules + Fallback Judge",
      port: "Internal Judge",
      icon: ShieldCheckIcon,
      color: "border-emerald-500/50 bg-slate-900/90",
      accent: "text-emerald-400",
      glow: "shadow-emerald-500/20",
      inOut: "In: Agent Reply · Out: Verdict + Evidence",
    },
    {
      id: "scoring",
      name: "Risk Scoring Engine",
      role: "Mathematical Risk Engine",
      desc: "Computes 0-100 severity-weighted score: 100 × (Weighted Breached / Weighted Total). Classifies risk into Low, Medium, High, or Critical.",
      tech: "Severity Algorithm (Weights 1-4)",
      port: "Internal Math",
      icon: CalculatorIcon,
      color: "border-amber-500/50 bg-slate-900/90",
      accent: "text-amber-300",
      glow: "shadow-amber-500/20",
      inOut: "In: Audit Results · Out: Score + Risk Tier",
    },
    {
      id: "report",
      name: "Security Report",
      role: "Forensic Audit & Remediation",
      desc: "Produces full audit trail, category breakdown, finding evidence, CSV exports, JSON logs, and printable PDF formats.",
      tech: "CSV Exporter · JSON · Print Engine",
      port: "Browser / File Download",
      icon: DocumentTextIcon,
      color: "border-purple-500/50 bg-slate-900/90",
      accent: "text-purple-400",
      glow: "shadow-purple-500/20",
      inOut: "In: Computed Score · Out: Signed Report",
    },
  ];

  const currentNode = nodes.find((n) => n.id === selectedNode) || nodes[3];
  const CurrentIcon = currentNode.icon;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <CpuChipIcon className="w-3.5 h-3.5" />
            <span>Interactive System Topology</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>AI-SHIELD Architecture & Data Flow</span>
            <span className="text-xs px-2.5 py-1 rounded-md font-mono font-semibold bg-slate-800 border border-slate-700 text-slate-300">
              End-to-End Pipeline
            </span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Data pipeline showing how adversarial attacks are dispatched, isolated in Docker sandbox, evaluated, and scored.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-mono flex items-center gap-1.5">
            <SparklesIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>Click any node to inspect</span>
          </span>
        </div>
      </div>

      {/* Interactive Flow Diagram */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <CommandLineIcon className="w-4 h-4 text-amber-400" />
            <span>Pipeline Execution Sequence</span>
          </span>
          <span className="text-xs text-amber-400 font-mono px-2.5 py-1 rounded-lg bg-amber-950/40 border border-amber-800/40">
            Active Target: {currentNode.name}
          </span>
        </div>

        {/* Visual Pipeline Boxes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {nodes.map((node, i) => {
            const isSelected = selectedNode === node.id;
            const NodeIcon = node.icon;
            return (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node.id)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all text-center relative flex flex-col items-center justify-between min-h-[140px] ${
                  node.color
                } ${
                  isSelected
                    ? "ring-2 ring-amber-400 scale-105 z-10 shadow-lg " + node.glow
                    : "opacity-80 hover:opacity-100 hover:scale-[1.02]"
                }`}
              >
                <div className="w-full flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                  <span>#{i + 1}</span>
                  <span className="text-[9px] px-1 rounded bg-slate-950 border border-slate-800">
                    {node.id === "sandbox" ? "SANDBOX" : "STEP"}
                  </span>
                </div>

                <div className="my-1.5 p-2 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center">
                  <NodeIcon className={`w-5 h-5 ${node.accent}`} />
                </div>

                <div className={`text-xs font-bold ${node.accent} leading-tight line-clamp-1`}>
                  {node.name}
                </div>

                <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                  {node.tech.split("·")[0]}
                </div>
              </div>
            );
          })}
        </div>

        {/* Node Inspection Detail Drawer */}
        <div className="bg-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-5 shadow-inner">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/80 pb-4 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 shadow-md">
                <CurrentIcon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-amber-400 uppercase font-semibold tracking-wider block">
                  Node Inspector · Step #{nodes.findIndex((n) => n.id === selectedNode) + 1}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white">{currentNode.name}</h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs px-3 py-1 rounded-full bg-slate-900 border border-slate-800 font-mono text-amber-400">
                {currentNode.port}
              </span>
              <span className="text-xs px-3 py-1 rounded-full bg-slate-900 border border-slate-800 font-mono text-slate-300">
                {currentNode.tech}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1.5 shadow-sm">
              <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[11px] flex items-center gap-1.5">
                <SparklesIcon className="w-3.5 h-3.5 text-amber-400" />
                <span>Primary Role & Function</span>
              </span>
              <p className="text-slate-200 leading-relaxed">{currentNode.role}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1.5 shadow-sm">
              <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[11px] flex items-center gap-1.5">
                <ShieldCheckIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span>Security & Guardrails</span>
              </span>
              <p className="text-slate-200 leading-relaxed">{currentNode.desc}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-1.5 shadow-sm">
              <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[11px] flex items-center gap-1.5">
                <CommandLineIcon className="w-3.5 h-3.5 text-teal-400" />
                <span>Data Interface Contract</span>
              </span>
              <p className="text-slate-300 font-mono text-[11px] leading-relaxed bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                {currentNode.inOut}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-2.5 shadow-lg hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Frontend UI</span>
            <ComputerDesktopIcon className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-lg font-bold text-white">React.js + Tailwind</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Modular reactive interface, Heroicons iconography, custom cyber design tokens, and resilient mock engine fallback.
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-2.5 shadow-lg hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Backend API</span>
            <ServerIcon className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-lg font-bold text-white">Python + FastAPI</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Asynchronous attack scheduler, REST endpoints for test creation, and real-time execution polling running on Uvicorn.
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-2.5 shadow-lg hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Audit Storage</span>
            <CircleStackIcon className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-lg font-bold text-white">SQLite / PostgreSQL</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Persistent audit history, result logs, and seamless migration path to PostgreSQL for enterprise production deployments.
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-2.5 shadow-lg hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Isolated Sandbox</span>
            <CubeTransparentIcon className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-lg font-bold text-white">Docker-Compatible</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Victim agent containment with mock tools, zero outbound internet privileges, and synthetic credentials to prevent unintended damage.
          </p>
        </div>
      </div>
    </div>
  );
}

