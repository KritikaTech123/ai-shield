import type { TestRun } from "./types";

export async function request<T = Record<string, unknown>>(
  path: string,
  method = "GET",
  body?: unknown
): Promise<T> {
  const response = await fetch(path, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Something went wrong. Please try again.");
  return result as T;
}

export function downloadFile(name: string, text: string, type = "application/json") {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function csvCell(value: unknown) {
  let text = String(value ?? "");
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}

export function exportTests(tests: TestRun[]) {
  const rows = [
    ["Test ID", "Test name", "Agent", "Environment", "Risk score", "Probes", "Blocked", "Date", "Mode"],
    ...tests.map((t) => [
      t.id,
      t.name,
      t.agentName,
      t.environment,
      t.riskScore,
      t.totalAttacks,
      t.blockedAttacks,
      new Date(t.createdAt).toISOString(),
      "Simulation",
    ]),
  ];
  downloadFile(
    `ai-shield-tests-${new Date().toISOString().slice(0, 10)}.csv`,
    rows.map((r) => r.map(csvCell).join(",")).join("\r\n"),
    "text/csv;charset=utf-8;"
  );
}

export function exportReport(test: TestRun) {
  downloadFile(
    `ai-shield-${test.agentName.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}-${test.id.slice(0, 8)}.json`,
    JSON.stringify(
      {
        product: "AI-SHIELD",
        tagline: "Attack. Test. Defend. Deploy.",
        mode: "Simulation — no live endpoint was tested",
        exportedAt: new Date().toISOString(),
        ...test,
      },
      null,
      2
    )
  );
}

export function exportReportCSV(test: TestRun) {
  const rows = [
    ["Test ID", "Title", "Category", "Severity", "Verdict", "Evidence", "Recommendation"],
    ...(test.results || []).map((r, i) => [
      `#${i + 1}`,
      r.title,
      r.category,
      r.severity,
      r.verdict,
      r.evidence,
      r.recommendation,
    ]),
  ];
  downloadFile(
    `ai-shield-report-${test.agentName.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}-${test.id.slice(0, 8)}.csv`,
    rows.map((r) => r.map(csvCell).join(",")).join("\r\n"),
    "text/csv;charset=utf-8;"
  );
}

export const shortDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
export const fullDate = (date: string) =>
  new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
export function relativeTime(date: string) {
  const minutes = Math.max(0, Math.floor((Date.now() - new Date(date).getTime()) / 60000));
  return minutes < 1
    ? "Just now"
    : minutes < 60
    ? `${minutes}m ago`
    : minutes < 1440
    ? `${Math.floor(minutes / 60)}h ago`
    : `${Math.floor(minutes / 1440)}d ago`;
}
