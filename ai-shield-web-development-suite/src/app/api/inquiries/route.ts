import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { apiError, validOrigin } from "@/lib/auth";
export async function POST(request: Request) {
  if (!validOrigin(request)) return apiError("Invalid origin.", 403);
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const company = String(body.company ?? "").trim();
    const message = String(body.message ?? "").trim();
    const plan = body.plan === "Pro" ? "Pro" : "Enterprise";
    if (name.length < 2 || name.length > 80) return apiError("Enter your full name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return apiError("Enter a valid work email.");
    if (company.length > 120 || message.length > 3000) return apiError("Your message is too long.");
    await db.insert(inquiries).values({ name, email, company, message, plan });
    return Response.json({ ok: true }, { status: 201 });
  } catch { return apiError("Unable to send your request. Please try again.", 500); }
}
