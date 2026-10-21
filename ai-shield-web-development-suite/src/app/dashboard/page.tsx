import { Suspense } from "react";
import { Dashboard } from "@/components/dashboard";
import "./dashboard.css";
export const metadata = { title: "Security workspace — AI-SHIELD" };
export default function DashboardPage() { return <Suspense fallback={<div className="page-loading"><span className="loading-orbit"/><p>Preparing your workspace…</p></div>}><Dashboard/></Suspense>; }
