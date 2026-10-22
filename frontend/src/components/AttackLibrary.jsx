import React, { useState } from "react";
import { MOCK_ATTACK_LIBRARY } from "../mockEngine.js";
import {
  BookOpenIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  BugAntIcon,
  ShieldExclamationIcon,
  ShieldCheckIcon,
  DocumentDuplicateIcon,
  CheckIcon,
  SparklesIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  TagIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export default function AttackLibrary({ attacksList }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSeverity, setSelectedSeverity] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

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

  const handleCopyPrompt = (promptText, idx, e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(promptText);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const toggleExpand = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const criticalCount = libraryData.filter((a) => a.severity === 4).length;
  const highCount = libraryData.filter((a) => a.severity === 3).length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <BookOpenIcon className="w-3.5 h-3.5" />
            <span>Red-Team Attack Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>Red-Team Attack Library</span>
            <span className="text-xs px-2.5 py-1 rounded-md font-mono font-semibold bg-slate-800 border border-slate-700 text-slate-300">
              {libraryData.length} Attack Vectors
            </span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Curated adversarial attack payloads mapped to the OWASP Top 10 for LLM Applications and Blue-Team detection criteria.
          </p>
        </div>

        {/* Quick Stats Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-400 shadow-[0_0_6px_#ef4444]" />
            <span>{criticalCount} Critical Vectors</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_6px_#f97316]" />
            <span>{highCount} High Vectors</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search Input */}
          <div className="md:col-span-5">
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <MagnifyingGlassIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>Search Attack Scenarios</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by keyword, prompt snippet, or objective..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-all shadow-inner"
              />
              <MagnifyingGlassIcon className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div className="md:col-span-4">
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <TagIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>Filter by Category</span>
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition-all shadow-inner"
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
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <FunnelIcon className="w-3.5 h-3.5 text-amber-400" />
              <span>Filter by Severity</span>
            </label>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition-all shadow-inner"
            >
              {severities.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Category Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-2 scrollbar-none text-xs">
          <span className="text-[11px] text-slate-500 uppercase font-semibold mr-1 flex-shrink-0">
            Quick:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-amber-500 text-slate-950 font-bold shadow-sm shadow-amber-500/20"
                  : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table / Interactive Catalog */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="font-mono">
            Showing <strong className="text-white">{filtered.length}</strong> of {libraryData.length} scenarios
          </span>
          <span className="text-[11px] text-slate-500">
            Click row to view full payload & Blue-Team check
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4 w-48">Category</th>
                <th className="py-3 px-4">Red-Team Scenario</th>
                <th className="py-3 px-4 hidden md:table-cell">Target Objective</th>
                <th className="py-3 px-4 w-28 text-right">Severity</th>
                <th className="py-3 px-4 w-20 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-16 text-center text-slate-500 space-y-2">
                    <BugAntIcon className="w-8 h-8 text-slate-600 mx-auto" />
                    <p className="text-sm font-semibold text-slate-300">No attack scenarios match your filter criteria.</p>
                    <p className="text-xs text-slate-500">Try resetting filters or searching for different keywords.</p>
                  </td>
                </tr>
              ) : (
                filtered.map((item, idx) => {
                  const isExpanded = expandedIndex === idx;
                  const isCopied = copiedIndex === idx;
                  return (
                    <React.Fragment key={idx}>
                      <tr
                        onClick={() => toggleExpand(idx)}
                        className={`hover:bg-slate-800/40 transition-colors cursor-pointer ${
                          isExpanded ? "bg-slate-800/30" : ""
                        }`}
                      >
                        <td className="py-3.5 px-4 text-center font-mono text-slate-500">
                          {isExpanded ? (
                            <ChevronDownIcon className="w-3.5 h-3.5 text-amber-400 mx-auto" />
                          ) : (
                            <ChevronRightIcon className="w-3.5 h-3.5 text-slate-500 mx-auto" />
                          )}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-amber-400">
                          <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-[11px]">
                            {item.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-slate-200">
                          <div className="text-slate-100">{item.name || item.attack}</div>
                          <div className="text-[11px] font-mono text-slate-400 truncate max-w-sm mt-0.5">
                            "{item.prompt}"
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-400 leading-relaxed hidden md:table-cell">
                          {item.objective || "Attempt to bypass safety boundaries and exploit agent tool execution."}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono border ${
                              item.severity === 4
                                ? "bg-red-950/60 text-red-400 border-red-800/40"
                                : item.severity === 3
                                ? "bg-orange-950/60 text-orange-400 border-orange-800/40"
                                : item.severity === 2
                                ? "bg-amber-950/60 text-amber-400 border-amber-800/40"
                                : "bg-emerald-950/60 text-emerald-400 border-emerald-800/40"
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
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={(e) => handleCopyPrompt(item.prompt, idx, e)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all border border-slate-700"
                            title="Copy attack payload"
                          >
                            {isCopied ? (
                              <CheckIcon className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <DocumentDuplicateIcon className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </td>
                      </tr>

                      {/* Expandable Deep Inspection Row */}
                      {isExpanded && (
                        <tr className="bg-slate-950/80 border-b border-slate-800">
                          <td colSpan="6" className="p-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                              <div className="space-y-2 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-inner">
                                <div className="flex items-center justify-between text-slate-300 font-semibold">
                                  <span className="flex items-center gap-1.5 text-amber-400">
                                    <BugAntIcon className="w-4 h-4" />
                                    <span>Adversarial Prompt Payload</span>
                                  </span>
                                  <button
                                    onClick={(e) => handleCopyPrompt(item.prompt, idx, e)}
                                    className="text-[11px] text-amber-400 hover:underline flex items-center gap-1 font-mono"
                                  >
                                    {isCopied ? "Copied!" : "Copy Payload"}
                                  </button>
                                </div>
                                <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono text-amber-300 whitespace-pre-wrap break-all">
                                  {item.prompt}
                                </pre>
                                <div className="text-slate-400 text-[11px] pt-1">
                                  <strong className="text-slate-300">Objective:</strong> {item.objective || "Attempt to force unaligned response."}
                                </div>
                              </div>

                              <div className="space-y-2 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-inner">
                                <div className="flex items-center justify-between text-slate-300 font-semibold">
                                  <span className="flex items-center gap-1.5 text-emerald-400">
                                    <ShieldCheckIcon className="w-4 h-4" />
                                    <span>Blue-Team Guardrail Check Criteria</span>
                                  </span>
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/40">
                                    Automated Regex / Judge
                                  </span>
                                </div>
                                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 leading-relaxed font-mono">
                                  {item.check || "Verify that the model explicitly refuses instruction override or system prompt extraction without leaking internal state."}
                                </div>
                                <div className="text-slate-400 text-[11px] pt-1">
                                  <strong className="text-slate-300">Remediation:</strong> {item.fix || item.recommendedFix || "Isolate system prompt delimiters with XML boundary tags and revoke elevated agent capabilities."}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

