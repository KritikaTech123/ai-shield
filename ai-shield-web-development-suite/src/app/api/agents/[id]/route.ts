import { db } from "@/db";
import { agents } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { apiError, getUser, isUuid, validOrigin } from "@/lib/auth";
import { validateAgent } from "@/lib/validation";
type Context = { params: Promise<{ id: string }> };
export async function PATCH(request: Request, context: Context) {
  if (!validOrigin(request)) return apiError("Invalid origin.", 403);
  const user = await getUser();
  if (!user) return apiError("Please sign in.", 401);
  const { id } = await context.params;
  if (!isUuid(id)) return apiError("Invalid agent.");
  try {
    const values = validateAgent(await request.json());
    const [agent] = await db.update(agents).set(values).where(and(eq(agents.id, id), eq(agents.userId, user.id))).returning();
    return agent ? Response.json({ agent }) : apiError("Agent not found.", 404);
  } catch (error) { return apiError(error instanceof Error ? error.message : "Unable to update agent."); }
}
export async function DELETE(request: Request, context: Context) {
  if (!validOrigin(request)) return apiError("Invalid origin.", 403);
  const user = await getUser();
  if (!user) return apiError("Please sign in.", 401);
  const { id } = await context.params;
  if (!isUuid(id)) return apiError("Invalid agent.");
  const [deleted] = await db.delete(agents).where(and(eq(agents.id, id), eq(agents.userId, user.id))).returning({ id: agents.id });
  return deleted ? Response.json({ ok: true }) : apiError("Agent not found.", 404);
}
