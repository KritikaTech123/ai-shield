import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./components/Dashboard.jsx";
import CreateTest from "./components/CreateTest.jsx";
import LiveSimulation from "./components/LiveSimulation.jsx";
import BlueTeamEvaluation from "./components/BlueTeamEvaluation.jsx";
import RiskScoring from "./components/RiskScoring.jsx";
import SecurityReport from "./components/SecurityReport.jsx";
import AttackLibrary from "./components/AttackLibrary.jsx";
import Architecture from "./components/Architecture.jsx";

import {
  checkBackendHealth,
  getCategories,
  getAttacks,
  startTest,
  getReport,
  getTestHistory,
} from "./api.js";

import {
  MOCK_ATTACK_LIBRARY,
  calculateRiskScore,
  INITIAL_DEMO_STATS,
} from "./mockEngine.js";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [backendOnline, setBackendOnline] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Active Test State
  const [activeTestId, setActiveTestId] = useState(null);
  const [activeTestData, setActiveTestData] = useState(null);

  // Stats & History
  const [stats, setStats] = useState(INITIAL_DEMO_STATS);
  const [recentActivity, setRecentActivity] = useState(INITIAL_DEMO_STATS.recentActivity);
  const [attacksList, setAttacksList] = useState([]);

  const isPausedRef = useRef(isPaused);
  isPausedRef.current = isPaused;

  // Check health and load initial backend data
  useEffect(() => {
    async function initCheck() {
      const isHealthy = await checkBackendHealth();
      setBackendOnline(isHealthy);

      if (isHealthy) {
        try {
          const attacks = await getAttacks();
          if (attacks?.length) setAttacksList(attacks);

          const history = await getTestHistory();
          if (history?.length) {
            const mapped = history.map((t) => ({
              id: t.scan_id || `AIS-2026-${String(t.id).padStart(4, "0")}`,
              rawId: t.id,
              target: t.target_url || "ACME SupportBot",
              date: t.created || "Just now",
              score: t.score ?? 49,
              risk: t.risk || "Medium",
              status: t.status === "done" ? "COMPLETED" : t.status.toUpperCase(),
              environment: t.is_simulated ? "Docker Sandbox" : "Custom Endpoint",
            }));
            setRecentActivity(mapped);

            // Also load latest run as initial test data for reports if none active
            try {
              const latestReport = await getReport(history[0].id);
              if (latestReport) setActiveTestData(latestReport);
            } catch (e) {
              console.warn("Could not load latest report", e);
            }
          }
        } catch (err) {
          console.warn("Error fetching backend initial state", err);
        }
      }
    }

    initCheck();
    const interval = setInterval(initCheck, 5000);
    return () => clearInterval(interval);
  }, []);

  // Polling active backend test
  useEffect(() => {
    if (!activeTestId || !backendOnline) return;
    let cancelled = false;

    const poll = async () => {
      if (cancelled || isPausedRef.current) return;
      try {
        const d = await getReport(activeTestId);
        if (cancelled) return;
        setActiveTestData(d);

        if (d.status === "done" || d.status === "failed") {
          // Completed
          refreshHistory();
        } else {
          setTimeout(poll, 600);
        }
      } catch (e) {
        if (!cancelled) setTimeout(poll, 1500);
      }
    };

    poll();
    return () => {
      cancelled = true;
    };
  }, [activeTestId, backendOnline]);

  const refreshHistory = async () => {
    if (!backendOnline) return;
    try {
      const history = await getTestHistory();
      if (history?.length) {
        const mapped = history.map((t) => ({
          id: t.scan_id || `AIS-2026-${String(t.id).padStart(4, "0")}`,
          rawId: t.id,
          target: t.target_url || "ACME SupportBot",
          date: t.created || "Just now",
          score: t.score ?? 49,
          risk: t.risk || "Medium",
          status: t.status === "done" ? "COMPLETED" : t.status.toUpperCase(),
          environment: t.is_simulated ? "Docker Sandbox" : "Custom Endpoint",
        }));
        setRecentActivity(mapped);
      }
    } catch {}
  };

  // Launch a new test
  const handleStartTest = async (testConfig) => {
    setIsSubmitting(true);
    setIsPaused(false);
    setActiveTab("simulation");

    const count = Number(testConfig.numTestCases) || 15;
    const targetUrl = testConfig.targetUrl || "http://localhost:9000/chat";

    if (backendOnline) {
      try {
        const res = await startTest(
          targetUrl,
          testConfig.categories,
          count,
          testConfig.testMode
        );
        setActiveTestId(res.id);
        setActiveTestData({
          id: res.id,
          scan_id: `AIS-2026-${String(res.id).padStart(4, "0")}`,
          status: "running",
          target_url: targetUrl,
          done: 0,
          total: res.total || count,
          results: [],
        });
        setIsSubmitting(false);
        return;
      } catch (err) {
        console.warn("Backend startTest error, falling back to client simulation", err);
      }
    }

    // Client-side fallback simulation engine
    runClientSimulation(targetUrl, testConfig.categories, count, testConfig.testMode);
  };

  const runClientSimulation = (targetUrl, selectedCats, count, mode) => {
    setIsSubmitting(false);
    const mockId = Math.floor(Math.random() * 900) + 100;
    const scanId = `AIS-2026-${String(mockId).padStart(4, "0")}`;

    // Filter attacks or use full pool
    let pool = MOCK_ATTACK_LIBRARY.filter(
      (a) => !selectedCats || selectedCats.includes(a.category)
    );
    if (!pool.length) pool = MOCK_ATTACK_LIBRARY;

    // Scale to count
    const attacksToRun = [];
    while (attacksToRun.length < count) {
      for (const a of pool) {
        if (attacksToRun.length >= count) break;
        attacksToRun.push({
          ...a,
          id: `${a.id}-v${attacksToRun.length + 1}`,
          name: attacksToRun.length >= pool.length ? `${a.name} (Variant)` : a.name,
        });
      }
    }

    const testState = {
      id: mockId,
      scan_id: scanId,
      status: "running",
      target_url: targetUrl,
      is_simulated: true,
      done: 0,
      total: count,
      results: [],
      created: new Date().toISOString(),
    };
    setActiveTestData({ ...testState });

    let currentStep = 0;
    const interval = setInterval(() => {
      if (isPausedRef.current) return;

      if (currentStep >= attacksToRun.length) {
        clearInterval(interval);
        const finalCalculations = calculateRiskScore(testState.results);
        const finishedState = {
          ...testState,
          status: "done",
          ...finalCalculations,
          recommended_fixes: [
            {
              category: "Sensitive Data Leakage",
              fix: "Never inject raw secrets into LLM prompts; use credential vaults.",
            },
            {
              category: "Tool & API Misuse",
              fix: "Implement strict tool allow-lists and human-in-the-loop approvals.",
            },
            {
              category: "System Prompt Leakage",
              fix: "Enforce explicit instructions never to dump system configuration.",
            },
            {
              category: "Prompt Injection",
              fix: "Treat user input as untrusted data using structured tag fencing.",
            },
          ],
        };
        setActiveTestData(finishedState);

        // Append to recent activity
        setRecentActivity((prev) => [
          {
            id: scanId,
            target: targetUrl,
            date: "Just now",
            score: finalCalculations.score,
            risk: finalCalculations.risk,
            status: "COMPLETED",
            environment: "Docker Sandbox",
          },
          ...prev.slice(0, 5),
        ]);
        return;
      }

      const nextAttack = attacksToRun[currentStep];
      testState.results.push(nextAttack);
      testState.done = currentStep + 1;
      setActiveTestData({ ...testState });
      currentStep++;
    }, 400);
  };

  const handleRunDemo = () => {
    handleStartTest({
      targetUrl: "http://localhost:9000/chat",
      environment: "Demo Agent",
      categories: [
        "Prompt Injection",
        "Jailbreaks & Role-Play",
        "Sensitive Data Leakage",
        "System Prompt Leakage",
        "Tool & API Misuse",
        "Unsafe Output",
      ],
      numTestCases: 15,
      testMode: "Quick Scan",
    });
  };

  const handleSelectRecentRun = async (testItem) => {
    if (testItem.rawId && backendOnline) {
      try {
        const report = await getReport(testItem.rawId);
        setActiveTestData(report);
        setActiveTab("report");
        return;
      } catch (e) {}
    }

    // Default sample fallback
    const sampleResults = MOCK_ATTACK_LIBRARY.slice(0, 10);
    const scoreData = calculateRiskScore(sampleResults);
    setActiveTestData({
      id: testItem.id,
      scan_id: testItem.id,
      target_url: testItem.target,
      status: "done",
      created: testItem.date,
      is_simulated: true,
      total: sampleResults.length,
      done: sampleResults.length,
      results: sampleResults,
      ...scoreData,
      recommended_fixes: [
        {
          category: "Sensitive Data Leakage",
          fix: "Never inject raw secrets into LLM prompts; use credential vaults.",
        },
        {
          category: "Tool & API Misuse",
          fix: "Implement strict tool allow-lists and human-in-the-loop approvals.",
        },
      ],
    });
    setActiveTab("report");
  };

  const currentScoreData =
    activeTestData?.score !== undefined
      ? {
          score: activeTestData.score,
          risk: activeTestData.risk,
          total: activeTestData.total || activeTestData.results?.length || 0,
          blocked:
            activeTestData.blocked_attacks ??
            activeTestData.results?.filter((r) => r.verdict === "blocked").length ??
            0,
          successful:
            activeTestData.successful_attacks ??
            activeTestData.results?.filter((r) => r.verdict === "leaked").length ??
            0,
          categories: activeTestData.categories || [],
          totalWeighted: activeTestData.totalWeighted,
          successfulWeighted: activeTestData.successfulWeighted,
        }
      : calculateRiskScore(activeTestData?.results || MOCK_ATTACK_LIBRARY.slice(0, 6));

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        backendOnline={backendOnline}
        isSimulated={activeTestData?.is_simulated}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "dashboard" && (
          <Dashboard
            stats={stats}
            recentActivity={recentActivity}
            onNewTest={() => setActiveTab("create")}
            onViewReports={() => setActiveTab("report")}
            onRunDemo={handleRunDemo}
            onSelectRun={handleSelectRecentRun}
          />
        )}

        {activeTab === "create" && (
          <CreateTest
            onStartTest={handleStartTest}
            isSubmitting={isSubmitting}
          />
        )}

        {activeTab === "simulation" && (
          <LiveSimulation
            currentTest={activeTestId}
            testData={activeTestData}
            isPaused={isPaused}
            onTogglePause={() => setIsPaused((p) => !p)}
            onCancel={() => {
              setActiveTestData((prev) => (prev ? { ...prev, status: "cancelled" } : null));
              setActiveTab("dashboard");
            }}
            onViewReport={() => setActiveTab("report")}
          />
        )}

        {activeTab === "blueteam" && (
          <BlueTeamEvaluation
            testResults={activeTestData?.results || MOCK_ATTACK_LIBRARY}
            isSimulated={activeTestData?.is_simulated ?? true}
          />
        )}

        {activeTab === "risk" && (
          <RiskScoring scoreData={currentScoreData} />
        )}

        {activeTab === "report" && (
          <SecurityReport
            reportData={activeTestData}
            onRunAgain={() => setActiveTab("create")}
            onBackToDashboard={() => setActiveTab("dashboard")}
          />
        )}

        {activeTab === "library" && (
          <AttackLibrary attacksList={attacksList} />
        )}

        {activeTab === "architecture" && <Architecture />}
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-slate-800/80 bg-[#080B12] py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>AI-SHIELD · Automated AI Agent Security Testing Lab</span>
          <span className="font-mono text-slate-400">Team STRIVERS: Madiwalappa · Kritika · Samiksha</span>
          <span>Hack in Hills · Exido · Web3 India · Builder Base</span>
        </div>
      </footer>
    </div>
  );
}
