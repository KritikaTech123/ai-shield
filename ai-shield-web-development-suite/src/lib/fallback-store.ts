import { demoAgents, makeSimulation } from "./demo";
import { CATEGORIES, type Agent, type TestRun, type User } from "./types";

const defaultUser: User = {
  id: "00000000-0000-0000-0000-000000000001",
  name: "Samiksha Patil",
  email: "samiksha@strivers.team",
  isGuest: false,
  plan: "Pro",
};

let memoryAgents: Agent[] = demoAgents.map((a, i) => ({
  id: `00000000-0000-0000-0000-${String(i + 1).padStart(12, "0")}`,
  name: a.name,
  endpoint: a.endpoint,
  model: a.model,
  environment: a.environment,
  description: a.description,
  status: "Active",
  createdAt: new Date(Date.now() - (i + 1) * 86400000).toISOString(),
}));

let memoryTests: TestRun[] = Array.from({ length: 16 }, (_, i) => {
  const agent = memoryAgents[i % memoryAgents.length];
  const sim = makeSimulation(i + 42, CATEGORIES, 10 + ((i * 11) % 35));
  return {
    id: `00000000-0000-0000-0001-${String(i + 1).padStart(12, "0")}`,
    agentId: agent.id,
    agentName: agent.name,
    name: `${["Adversarial Assessment", "Full Security Gate", "Regression Scan", "Red-Team Probe Run"][i % 4]} #${100 - i}`,
    environment: agent.environment,
    status: "Completed",
    ...sim,
    categories: CATEGORIES,
    notes: "Simulated sandbox evaluation with synthetic secrets and heuristic checks.",
    createdAt: new Date(Date.now() - (i * 0.8 + 0.1) * 86400000).toISOString(),
  };
});

export function getFallbackWorkspace() {
  return {
    user: defaultUser,
    agents: memoryAgents,
    tests: memoryTests,
  };
}

export function addFallbackAgent(agentData: Omit<Agent, "id" | "createdAt" | "status">): Agent {
  const newAgent: Agent = {
    ...agentData,
    id: `00000000-0000-0000-0000-${String(memoryAgents.length + 1).padStart(12, "0")}`,
    status: "Active",
    createdAt: new Date().toISOString(),
  };
  memoryAgents = [newAgent, ...memoryAgents];
  return newAgent;
}

export function addFallbackTest(testData: Partial<TestRun>): TestRun {
  const agent = memoryAgents.find((a) => a.id === testData.agentId) || memoryAgents[0];
  const sim = makeSimulation(Date.now() % 997, testData.categories || CATEGORIES, 25);
  const newTest: TestRun = {
    id: `00000000-0000-0000-0001-${String(memoryTests.length + 1).padStart(12, "0")}`,
    agentId: agent?.id || null,
    agentName: agent?.name || testData.agentName || "ACME SupportBot",
    name: testData.name || "Automated Red-Team Run",
    environment: agent?.environment || "Staging",
    status: "Completed",
    categories: testData.categories || CATEGORIES,
    notes: testData.notes || "Automated security test executed in demo sandbox.",
    createdAt: new Date().toISOString(),
    ...sim,
    ...testData,
  };
  memoryTests = [newTest, ...memoryTests];
  return newTest;
}

export function getFallbackTest(id: string): TestRun | undefined {
  return memoryTests.find((t) => t.id === id);
}

export function updateFallbackTest(id: string, updates: Partial<TestRun>): TestRun | undefined {
  const idx = memoryTests.findIndex((t) => t.id === id);
  if (idx === -1) return undefined;
  memoryTests[idx] = { ...memoryTests[idx], ...updates };
  return memoryTests[idx];
}

export function deleteFallbackResource(kind: "agent" | "report", id: string) {
  if (kind === "agent") {
    memoryAgents = memoryAgents.filter((a) => a.id !== id);
  } else {
    memoryTests = memoryTests.filter((t) => t.id !== id);
  }
}
