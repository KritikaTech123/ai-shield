import { db } from "@/db";
import { agents, testRuns } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { ensureUser, safeUser } from "@/lib/auth";
import { getFallbackWorkspace } from "@/lib/fallback-store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const user = await ensureUser();
    const [agentRows, tests] = await Promise.all([
      db.select().from(agents).where(eq(agents.userId, user.id)).orderBy(desc(agents.createdAt)),
      db.select().from(testRuns).where(eq(testRuns.userId, user.id)).orderBy(desc(testRuns.createdAt)),
    ]);
    return Response.json(
      { user: safeUser(user), agents: agentRows, tests },
      { headers: { "Cache-Control": "private, no-store" } }
    );
  } catch (error) {
    console.warn("PostgreSQL not active, serving fallback workspace", error);
    return Response.json(getFallbackWorkspace(), {
      headers: { "Cache-Control": "private, no-store" },
    });
  }
}
