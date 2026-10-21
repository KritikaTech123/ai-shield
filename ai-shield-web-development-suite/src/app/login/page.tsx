import { Suspense } from "react";
import { AuthForm } from "@/components/auth-form";
import "../utility.css";
export const metadata = { title: "Your security starts here — AI-SHIELD" };
export default function LoginPage() { return <Suspense fallback={<div className="auth-loading">Preparing your secure session…</div>}><AuthForm/></Suspense>; }
