import React from "react";
import {
  Squares2X2Icon,
  PlayCircleIcon,
  BoltIcon,
  ShieldCheckIcon,
  CalculatorIcon,
  DocumentTextIcon,
  BookOpenIcon,
  CpuChipIcon,
  ServerIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export default function Navbar({ activeTab, setActiveTab, backendOnline, isSimulated }) {
  const tabs = [
    { id: "dashboard", label: "Dashboard", Icon: Squares2X2Icon },
    { id: "create", label: "Create Test", Icon: PlayCircleIcon },
    { id: "simulation", label: "Live Attack", Icon: BoltIcon },
    { id: "blueteam", label: "Blue-Team", Icon: ShieldCheckIcon },
    { id: "risk", label: "Risk Scoring", Icon: CalculatorIcon },
    { id: "report", label: "Security Report", Icon: DocumentTextIcon },
    { id: "library", label: "Attack Library", Icon: BookOpenIcon },
    { id: "architecture", label: "Architecture", Icon: CpuChipIcon },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#080C14]/95 backdrop-blur-md border-b border-slate-800/80 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab("dashboard")}>
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/25 ring-1 ring-amber-400/50 group-hover:scale-105 transition-transform">
              <ShieldCheckIcon className="w-6 h-6 text-slate-950 stroke-2" />
              <div className="absolute -inset-0.5 rounded-xl bg-amber-400/20 blur-sm -z-10 group-hover:bg-amber-400/40 transition-colors" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-wider text-white">AI-SHIELD</span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  v1.0
                </span>
              </div>
              <p className="text-[11px] font-semibold text-slate-400 tracking-wider uppercase">
                Attack. Test. Defend. Deploy.
              </p>
            </div>
          </div>

          {/* Status Badges */}
          <div className="hidden lg:flex items-center gap-3 text-xs">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800/90 shadow-inner">
              <ServerIcon className="w-3.5 h-3.5 text-slate-400" />
              <span className={`w-2 h-2 rounded-full ${backendOnline ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
              <span className="text-slate-300">
                Backend: <strong className={backendOnline ? "text-emerald-400" : "text-amber-400"}>
                  {backendOnline ? "FastAPI Online (:8000)" : "Browser Simulator"}
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800/90 shadow-inner">
              <CpuChipIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300">
                Sandbox: <strong className="text-emerald-400">Docker Sandbox (:9000)</strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-lg bg-amber-950/40 text-amber-300 border border-amber-500/30 font-mono shadow-sm">
              <SparklesIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>Team STRIVERS</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs with Heroicons */}
        <div className="flex space-x-1.5 overflow-x-auto py-2 scrollbar-none border-t border-slate-800/60">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.Icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-amber-500/15 text-amber-400 border border-amber-500/40 shadow-sm shadow-amber-500/15 ring-1 ring-amber-500/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-amber-400 stroke-2" : "text-slate-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
