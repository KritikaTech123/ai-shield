import { randomBytes, createHash, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import { and, eq, gt } from "drizzle-orm";
import { db } from "@/db";
import { users, sessions, agents, testRuns } from "@/db/schema";
import { demoAgents, makeSimulation } from "./demo";
import { CATEGORIES } from "./types";

const scryptAsync = promisify(scrypt);
export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const key = await scryptAsync(password, salt, 64) as Buffer;
  return `${salt}:${key.toString("hex")}`;
}
export async function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const key = await scryptAsync(password, salt, 64) as Buffer;
  const expected = Buffer.from(hash, "hex");
  return key.length === expected.length && timingSafeEqual(key, expected);
}
export async function createSession(userId: string) {
  const token = randomBytes(32).toString("hex");
  const tokenHash = createHash("sha256").update(token).digest("hex");
  const expiresAt = new Date(Date.now() + 30 * 86400000);
  await db.insert(sessions).values({ tokenHash, userId, expiresAt });
  (await cookies()).set("shield_session", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", expires: expiresAt });
}
export async function getUser() {
  const token = (await cookies()).get("shield_session")?.value;
  if (!token) return null;
  const tokenHash = createHash("sha256").update(token).digest("hex");
  const [row] = await db.select({ user: users }).from(sessions).innerJoin(users, eq(users.id, sessions.userId)).where(and(eq(sessions.tokenHash, tokenHash), gt(sessions.expiresAt, new Date()))).limit(1);
  return row?.user ?? null;
}
export async function destroySession() {
  const store = await cookies();
  const token = store.get("shield_session")?.value;
  if (token) await db.delete(sessions).where(eq(sessions.tokenHash, createHash("sha256").update(token).digest("hex")));
  store.delete("shield_session");
}
export function safeUser(user: typeof users.$inferSelect) {
  return { id: user.id, name: user.name, email: user.email, isGuest: user.isGuest, plan: user.plan };
}
export async function seedWorkspace(userId: string) {
  await db.transaction(async tx => {
    const inserted = await tx.insert(agents).values(demoAgents.map(a => ({ ...a, userId }))).returning();
    const runs = Array.from({ length: 84 }, (_, i) => {
      const agent = inserted[i % inserted.length];
      const simulation = makeSimulation(i + 7, CATEGORIES, 8 + (i * 7 % 37));
      return { userId, agentId: agent.id, agentName: agent.name, name: `${["Full security assessment", "Pre-release validation", "Regression scan", "Adversarial evaluation"][i % 4]}`, environment: agent.environment, ...simulation, categories: CATEGORIES, createdAt: new Date(Date.now() - (i * 0.65 + 0.01) * 86400000), notes: "Seeded demonstration. Results are simulated and do not evaluate a real agent." };
    });
    await tx.insert(testRuns).values(runs);
  });
}
export async function ensureUser() {
  const current = await getUser();
  if (current) return current;
  const [user] = await db.insert(users).values({ name: "Alex Morgan", isGuest: true }).returning();
  await seedWorkspace(user.id);
  await createSession(user.id);
  return user;
}
export function validOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  try { return new URL(origin).host === host; } catch { return false; }
}
export function apiError(message: string, status = 400) { return Response.json({ error: message }, { status }); }
export const isUuid = (value: string) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
