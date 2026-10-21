import { db } from "@/db";
import { agents, testRuns } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { apiError, getUser, isUuid, validOrigin } from "@/lib/auth";
import { makeSimulation } from "@/lib/demo";
import { CATEGORIES } from "@/lib/types";
import { addFallbackTest } from "@/lib/fallback-store";

export async function POST(request: Request) {
  if (!validOrigin(request)) return apiError("Invalid origin.", 403);
  const user = await getUser();
  // Allow guest execution or authenticated execution
  try {
    const body = await request.json();
    const categories = Array.isArray(body.categories)
      ? ([...new Set(body.categories.filter((c: unknown) => typeof c === "string"))] as string[])
      : CATEGORIES;
    
    if (!categories.length) return apiError("Select at least one attack category.");
    const name = String(body.name || "Adversarial security assessment").trim().slice(0, 100);
    const numTestCases = Number(body.numTestCases) || 15;
    const testMode = body.testMode || "Quick Scan";

    // Attempt PostgreSQL persistence if DB is active
    if (user) {
      try {
        const [agent] = await db
          .select()
          .from(agents)
          .where(and(eq(agents.id, body.agentId), eq(agents.userId, user.id)));
        
        const simulation = makeSimulation(Date.now() % 997, categories, 15 + (Date.now() % 25));
        const [test] = await db
          .insert(testRuns)
          .values({
            userId: user.id,
            agentId: agent?.id || null,
            agentName: agent?.name || body.agentName || "Demo Agent",
            name,
            environment: agent?.environment || "Staging",
            categories,
            ...simulation,
            notes: `Sandbox execution in ${testMode} mode (${numTestCases} test cases).`,
          })
          .returning();
        return Response.json({ test }, { status: 201 });
      } catch (dbErr) {
        console.warn("DB insert failed, using fallback test store", dbErr);
      }
    }

    // Resilient fallback execution
    const test = addFallbackTest({
      name,
      agentName: body.agentName || "Demo Victim Agent",
      categories,
      notes: `Sandbox execution in ${testMode} mode (${numTestCases} test cases).`,
    });
    return Response.json({ test }, { status: 201 });
  } catch (err) {
    console.error("Test execution error", err);
    return apiError("Unable to run the simulation. Please try again.", 500);
  }
}
