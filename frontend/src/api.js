// Frontend <-> backend calls (Kritika). Change API if the backend runs elsewhere.
export const API = "http://localhost:8000";

export async function getCategories() {
  const r = await fetch(`${API}/categories`);
  return r.json();
}

export async function startTest(target_url, categories) {
  const r = await fetch(`${API}/tests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ target_url, categories }),
  });
  if (!r.ok) throw new Error("Could not start test");
  return r.json();
}

export async function getReport(id) {
  const r = await fetch(`${API}/tests/${id}/report`);
  return r.json();
}
