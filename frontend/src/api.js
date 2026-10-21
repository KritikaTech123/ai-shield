// Frontend <-> Backend API client with offline demo fallback support
export const API = "http://localhost:8000";

export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API}/health`, { signal: AbortSignal.timeout(2000) });
    return res.ok;
  } catch {
    return false;
  }
}

export async function getCategories() {
  try {
    const r = await fetch(`${API}/categories`);
    if (!r.ok) throw new Error("Failed to load categories");
    return await r.json();
  } catch (e) {
    return [
      "Prompt Injection",
      "Jailbreaks & Role-Play",
      "Sensitive Data Leakage",
      "System Prompt Leakage",
      "Tool & API Misuse",
      "Unsafe Output",
    ];
  }
}

export async function getAttacks() {
  try {
    const r = await fetch(`${API}/attacks`);
    if (!r.ok) throw new Error("Failed to load attacks");
    return await r.json();
  } catch (e) {
    return [];
  }
}

export async function startTest(target_url, categories, num_test_cases = 15, mode = "Quick Scan") {
  const r = await fetch(`${API}/tests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      target_url,
      categories,
      num_test_cases,
      mode,
    }),
  });
  if (!r.ok) {
    const errText = await r.text();
    throw new Error(`Could not start test: ${errText || r.statusText}`);
  }
  return r.json();
}

export async function getTest(id) {
  const r = await fetch(`${API}/tests/${id}`);
  if (!r.ok) throw new Error("Could not fetch test status");
  return r.json();
}

export async function getReport(id) {
  const r = await fetch(`${API}/tests/${id}/report`);
  if (!r.ok) throw new Error("Could not fetch test report");
  return r.json();
}

export async function getTestHistory() {
  try {
    const r = await fetch(`${API}/tests`);
    if (!r.ok) return [];
    return await r.json();
  } catch {
    return [];
  }
}
