import { pgTable, text, timestamp, boolean, uuid, integer, jsonb } from "drizzle-orm/pg-core";
import type { Finding } from "@/lib/types";

export const users = pgTable("shield_users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().default("Alex Morgan"),
  email: text("email").unique(),
  passwordHash: text("password_hash"),
  isGuest: boolean("is_guest").notNull().default(true),
  plan: text("plan").notNull().default("Free"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const sessions = pgTable("shield_sessions", {
  tokenHash: text("token_hash").primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at").notNull(),
});

export const agents = pgTable("shield_agents", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  endpoint: text("endpoint").notNull(),
  model: text("model").notNull().default("GPT-4o"),
  environment: text("environment").notNull().default("Staging"),
  description: text("description").notNull().default(""),
  status: text("status").notNull().default("Active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const testRuns = pgTable("shield_tests", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  agentId: uuid("agent_id").references(() => agents.id, { onDelete: "set null" }),
  agentName: text("agent_name").notNull(),
  name: text("name").notNull(),
  environment: text("environment").notNull().default("Staging"),
  status: text("status").notNull().default("Completed"),
  riskScore: integer("risk_score").notNull(),
  totalAttacks: integer("total_attacks").notNull(),
  blockedAttacks: integer("blocked_attacks").notNull(),
  categories: jsonb("categories").$type<string[]>().notNull(),
  results: jsonb("results").$type<Finding[]>().notNull(),
  notes: text("notes").notNull().default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const inquiries = pgTable("shield_inquiries", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull().default(""),
  message: text("message").notNull().default(""),
  plan: text("plan").notNull().default("Enterprise"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
