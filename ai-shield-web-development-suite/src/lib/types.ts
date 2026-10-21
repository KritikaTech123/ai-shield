export type User = { id: string; name: string; email: string | null; isGuest: boolean; plan: string };
export type Agent = { id: string; name: string; endpoint: string; model: string; environment: string; description: string; status: string; createdAt: string };
export type Finding = {
  id: string;
  title: string;
  category: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  verdict: "Blocked" | "Vulnerable";
  evidence: string;
  recommendation: string;
  prompt?: string;
  observed?: string;
  expectedSafe?: string;
};
export type TestRun = {
  id: string;
  agentId: string | null;
  agentName: string;
  name: string;
  environment: string;
  status: string;
  riskScore: number;
  totalAttacks: number;
  blockedAttacks: number;
  categories: string[];
  notes: string;
  createdAt: string;
  results?: Finding[];
  scanId?: string;
};
export type Workspace = { user: User; agents: Agent[]; tests: TestRun[] };
export const CATEGORIES = [
  "Prompt injection",
  "Jailbreaks & Role-Play",
  "Sensitive Data Leakage",
  "System Prompt Leakage",
  "Tool & API Misuse",
  "Unsafe output",
];
export const CATEGORY_COLORS = ["#f59e0b", "#f97316", "#ef4444", "#8b5cf6", "#06b6d4", "#10b981"];
export const severityForScore = (score: number) =>
  score >= 70 ? "Critical" : score >= 40 ? "High" : score >= 20 ? "Medium" : "Low";
