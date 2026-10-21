import { db } from "@/db";
import { testRuns } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { apiError, getUser, isUuid, validOrigin } from "@/lib/auth";
import { getFallbackTest, updateFallbackTest, deleteFallbackResource } from "@/lib/fallback-store";

type Context = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Context) {
  const { id } = await context.params;
  const user = await getUser();
  
  if (user) {
    try {
      const [test] = await db
        .select()
        .from(testRuns)
        .where(and(eq(testRuns.id, id), eq(testRuns.userId, user.id)));
      if (test) return Response.json({ test });
    } catch {}
  }

  const fallback = getFallbackTest(id);
  return fallback ? Response.json({ test: fallback }) : apiError("Report not found.", 404);
}

export async function PATCH(request: Request, context: Context) {
  if (!validOrigin(request)) return apiError("Invalid origin.", 403);
  const { id } = await context.params;
  const user = await getUser();
  const body = await request.json();
  const name = String(body.name ?? "").trim();
  const notes = String(body.notes ?? "").trim();

  if (user) {
    try {
      const [test] = await db
        .update(testRuns)
        .set({ name, notes })
        .where(and(eq(testRuns.id, id), eq(testRuns.userId, user.id)))
        .returning();
      if (test) return Response.json({ test });
    } catch {}
  }

  const updated = updateFallbackTest(id, { name, notes });
  return updated ? Response.json({ test: updated }) : apiError("Report not found.", 404);
}

export async function DELETE(request: Request, context: Context) {
  if (!validOrigin(request)) return apiError("Invalid origin.", 403);
  const { id } = await context.params;
  const user = await getUser();

  if (user) {
    try {
      const [deleted] = await db
        .delete(testRuns)
        .where(and(eq(testRuns.id, id), eq(testRuns.userId, user.id)))
        .returning({ id: testRuns.id });
      if (deleted) return Response.json({ ok: true });
    } catch {}
  }

  deleteFallbackResource("report", id);
  return Response.json({ ok: true });
}
