import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/manrope";
import "./globals.css";
import "./contrast.css";
export const metadata: Metadata = {
  title: "AI-SHIELD — Attack your AI. Before attackers do.",
  description: "Find the flaws before the world does. AI-SHIELD brings automated red teaming, risk insights, and actionable security reports to your AI agent workflow.",
  applicationName: "AI-SHIELD",
  icons: { icon: "/icon.svg" },
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
