export function validateAgent(body: Record<string, unknown>) {
  const name = String(body.name ?? "").trim();
  const endpoint = String(body.endpoint ?? "").trim();
  const model = String(body.model ?? "GPT-4o").trim();
  const environment = String(body.environment ?? "Staging");
  const description = String(body.description ?? "").trim();
  if (name.length < 2 || name.length > 80) throw new Error("Agent name must be 2–80 characters.");
  let url: URL; try { url = new URL(endpoint); } catch { throw new Error("Enter a valid HTTP or HTTPS endpoint."); }
  if (!["http:", "https:"].includes(url.protocol) || endpoint.length > 2048) throw new Error("Enter a valid HTTP or HTTPS endpoint.");
  if (!["Production", "Staging", "Development"].includes(environment)) throw new Error("Choose a valid environment.");
  if (!model || model.length > 80 || description.length > 1000) throw new Error("Check the model and description lengths.");
  return { name, endpoint, model, environment, description };
}
