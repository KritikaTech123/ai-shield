import { db } from "@/db";
import { agents } from "@/db/schema";
import { apiError, getUser, validOrigin } from "@/lib/auth";
import { validateAgent } from "@/lib/validation";
import { addFallbackAgent } from "@/lib/fallback-store";

export async function POST(request: Request) {
  if (!validOrigin(request)) return apiError("Invalid origin.", 403);
  const user = await getUser();
  try {
    const values = validateAgent(await request.json());
    if (user) {
      try {
        const [agent] = await db
          .insert(agents)
          .values({ ...values, userId: user.id })
          .returning();
        return Response.json({ agent }, { status: 201 });
      } catch {}
    }
    const agent = addFallbackAgent(values);
    return Response.json({ agent }, { status: 201 });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Unable to create agent.");
  }
}
