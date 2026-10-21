import { db } from "@/db";
import { sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  let dbOk = false;
  try {
    await db.execute(sql`select 1`);
    dbOk = true;
  } catch {
    dbOk = false;
  }
  return Response.json({
    status: "ok",
    ok: true,
    database: dbOk ? "postgresql" : "simulated_local",
    suite: "ai-shield-web-development-suite",
  });
}
