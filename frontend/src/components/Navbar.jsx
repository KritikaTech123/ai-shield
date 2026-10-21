import React from "react";

export default function Navbar({ activeTab, setActiveTab, backendOnline, isSimulated }) {
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "create", label: "Create Test", icon: "🎯" },
    { id: "simulation", label: "Live Attack", icon: "⚡" },
    { id: "blueteam", label: "Blue-Team", icon: "🛡️" },
    { id: "risk", label: "Risk Scoring", icon: "🧮" },
    { id: "report", label: "Security Report", icon: "📋" },
    { id: "library", label: "Attack Library", icon: "📚" },
    { id: "architecture", label: "Architecture", icon: "🏗️" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F19]/95 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("dashboard")}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 ring-1 ring-amber-400/50">
              <span className="text-xl">🛡️</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-wider text-white">AI-SHIELD</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  v1.0
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-400 tracking-wide uppercase">
                Attack. Test. Defend. Deploy.
              </p>
            </div>
          </div>

          {/* Status Badges */}
          <div className="hidden lg:flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700">
              <span className={`w-2 h-2 rounded-full ${backendOnline ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
              <span className="text-slate-300">
                Backend: <strong className={backendOnline ? "text-emerald-400" : "text-amber-400"}>
                  {backendOnline ? "FastAPI Online (:8000)" : "Browser Simulator"}
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300">
                Sandbox: <strong className="text-emerald-400">Docker-Isolated (:9000)</strong>
              </span>
            </div>
            <div className="text-[11px] px-2.5 py-1 rounded bg-amber-950/40 text-amber-300 border border-amber-700/40 font-mono">
              Team STRIVERS
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-800/80">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-amber-500/15 text-amber-400 border border-amber-500/40 shadow-sm shadow-amber-500/10"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
