import React, { useState } from "react";
import { MOCK_ATTACK_LIBRARY } from "../mockEngine.js";

export default function AttackLibrary({ attacksList }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSeverity, setSelectedSeverity] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const libraryData = attacksList && attacksList.length > 0 ? attacksList : MOCK_ATTACK_LIBRARY;

  const categories = [
    "All",
    "Prompt Injection",
    "Jailbreaks & Role-Play",
    "Sensitive Data Leakage",
    "System Prompt Leakage",
    "Tool & API Misuse",
    "Unsafe Output",
  ];

  const severities = ["All", "Critical (4)", "High (3)", "Medium (2)", "Low (1)"];

  const filtered = libraryData.filter((item) => {
    // category filter
    if (selectedCategory !== "All") {
      if (item.category !== selectedCategory && !item.category.includes(selectedCategory)) {
        return false;
      }
    }
    // severity filter
    if (selectedSeverity !== "All") {
      const targetSev = selectedSeverity.includes("4")
        ? 4
        : selectedSeverity.includes("3")
        ? 3
        : selectedSeverity.includes("2")
        ? 2
        : 1;
      if (item.severity !== targetSev) return false;
    }
    // search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = (item.name || item.attack || "").toLowerCase().includes(q);
      const matchCat = (item.category || "").toLowerCase().includes(q);
      const matchPrompt = (item.prompt || "").toLowerCase().includes(q);
      const matchObj = (item.objective || "").toLowerCase().includes(q);
      if (!matchName && !matchCat && !matchPrompt && !matchObj) return false;
    }
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
          <span>📚</span> Red-Team Repository
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Red-Team Attack Library</h1>
        <p className="text-slate-400 text-sm mt-1">
          Catalog of adversarial payloads aligned with the OWASP Top 10 for LLM Applications and Blue-Team detection criteria.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search Input */}
          <div className="md:col-span-5">
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Search Attack Scenarios
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword, prompt snippet, or objective..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Category Filter */}
          <div className="md:col-span-4">
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Filter by Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Severity Filter */}
          <div className="md:col-span-3">
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Filter by Severity
            </label>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
            >
              {severities.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/70 text-slate-300 font-bold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 w-48">Attack Category</th>
                <th className="py-3 px-4 w-52">Red-Team Scenario</th>
                <th className="py-3 px-4">Red-Team Objective</th>
                <th className="py-3 px-4">Blue-Team Check</th>
                <th className="py-3 px-4 w-24 text-right">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-500">
                    No attack scenarios matched your filter criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-amber-400">
                      {item.category}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-200">
                      <div>{item.name || item.attack}</div>
                      <div className="text-[11px] font-mono text-slate-400 truncate max-w-xs mt-1">
                        "{item.prompt}"
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 leading-relaxed">
                      {item.objective || "Attempt to compromise system boundaries."}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 leading-relaxed">
                      {item.check || "Does the agent maintain policy rules?"}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                          item.severity === 4
                            ? "bg-red-950/60 text-red-400 border border-red-800/40"
                            : item.severity === 3
                            ? "bg-orange-950/60 text-orange-400 border border-orange-800/40"
                            : item.severity === 2
                            ? "bg-amber-950/60 text-amber-400 border border-amber-800/40"
                            : "bg-emerald-950/60 text-emerald-400 border border-emerald-800/40"
                        }`}
                      >
                        {item.severity === 4
                          ? "Critical (4)"
                          : item.severity === 3
                          ? "High (3)"
                          : item.severity === 2
                          ? "Medium (2)"
                          : "Low (1)"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
