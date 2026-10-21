"use client";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { Modal } from "./modal";
export function ContactModal({ onClose, plan = "Enterprise" }: { onClose: () => void; plan?: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const response = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, plan }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setSent(true);
    } catch (e) { setError(e instanceof Error ? e.message : "Please try again."); } finally { setBusy(false); }
  }
  return <Modal title={sent ? "You’re on our radar." : plan === "Pro" ? "Build safer with Pro." : "Let’s secure your next big idea."} subtitle={sent ? undefined : "Tell us a little about your team. We’ll help you find the right fit."} onClose={onClose}>{sent ? <div className="contact-success"><CheckCircle2 size={48}/><h3>Request received</h3><p>Your {plan} inquiry has been saved. In the meantime, explore everything in the interactive demo.</p><a className="button button-dark" href="/dashboard">Explore the dashboard <ArrowUpRight size={16}/></a></div> : <form className="form-stack" onSubmit={submit}><div className="form-row"><label>Full name<input name="name" placeholder="Alex Morgan" required minLength={2} maxLength={80} autoComplete="name"/></label><label>Work email<input name="email" type="email" placeholder="alex@company.com" required autoComplete="email"/></label></div><label>Company<input name="company" placeholder="Your company" maxLength={120} autoComplete="organization"/></label><label>What are you building?<textarea name="message" placeholder="Tell us about your agents, your team, and what you’d like to protect." rows={4} maxLength={3000}/></label>{error && <p className="form-error" role="alert">{error}</p>}<button className="button button-orange full-width" type="submit" disabled={busy}>{busy ? <Loader2 className="spin" size={18}/> : <>Let’s talk <ArrowUpRight size={17}/></>}</button><p className="form-note">No sales pressure. Just a conversation about safer AI.</p></form>}</Modal>;
}
