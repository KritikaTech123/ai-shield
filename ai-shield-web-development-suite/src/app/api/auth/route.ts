import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { apiError, createSession, destroySession, getUser, hashPassword, safeUser, seedWorkspace, validOrigin, verifyPassword } from "@/lib/auth";
const attempts = new Map<string, { count: number; since: number }>();
export async function POST(request: Request) {
  if (!validOrigin(request)) return apiError("Invalid request origin.", 403);
  try {
    const body = await request.json();
    if (body.action === "logout") { await destroySession(); return Response.json({ ok: true }); }
    if (body.action === "profile") {
      const user = await getUser();
      if (!user) return apiError("Please sign in.", 401);
      const name = String(body.name ?? "").trim();
      if (name.length < 2 || name.length > 80) return apiError("Enter a name between 2 and 80 characters.");
      const [updated] = await db.update(users).set({ name }).where(eq(users.id, user.id)).returning();
      return Response.json({ user: safeUser(updated) });
    }
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");
    const key = email;
    const now = Date.now();
    const limit = attempts.get(key);
    if (limit && now - limit.since < 900000 && limit.count >= 10) return apiError("Too many attempts. Please try again in 15 minutes.", 429);
    attempts.set(key, { count: limit && now - limit.since < 900000 ? limit.count + 1 : 1, since: limit && now - limit.since < 900000 ? limit.since : now });
    if (attempts.size > 2000) for (const [k, v] of attempts) if (now - v.since > 900000) attempts.delete(k);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return apiError("Enter a valid email address.");
    if (password.length < 8 || password.length > 128) return apiError("Use a password between 8 and 128 characters.");
    if (body.action === "login") {
      const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
      if (!user?.passwordHash || !await verifyPassword(password, user.passwordHash)) return apiError("Email or password is incorrect.", 401);
      await destroySession();
      await createSession(user.id);
      attempts.delete(key);
      return Response.json({ user: safeUser(user) });
    }
    if (body.action !== "register") return apiError("Unknown action.");
    const name = String(body.name ?? "").trim();
    if (name.length < 2 || name.length > 80) return apiError("Enter your name (2–80 characters).");
    const [existing] = await db.select({ id: users.id }).from(users).where(eq(users.email, email));
    if (existing) return apiError("An account with this email already exists. Please sign in.", 409);
    const current = await getUser();
    const passwordHash = await hashPassword(password);
    let user;
    if (current?.isGuest) {
      [user] = await db.update(users).set({ name, email, passwordHash, isGuest: false }).where(eq(users.id, current.id)).returning();
    } else {
      [user] = await db.insert(users).values({ name, email, passwordHash, isGuest: false }).returning();
      await seedWorkspace(user.id);
    }
    await destroySession();
    await createSession(user.id);
    attempts.delete(key);
    return Response.json({ user: safeUser(user) }, { status: 201 });
  } catch (error) {
    console.error("Authentication failed", error);
    return apiError("We couldn't complete that request. Please try again.", 500);
  }
}
