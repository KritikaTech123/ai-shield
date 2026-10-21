import Link from "next/link";

export function ShieldMark({ className = "", size = 31 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size + 3} viewBox="0 0 32 36" fill="none" className={className} aria-hidden="true">
      <path d="M16 1.5 29 6.3v10.1c0 8.4-5.6 14.2-13 18.1C8.6 30.6 3 24.8 3 16.4V6.3L16 1.5Z" fill="#f59e0b" />
      <path d="m10 17 4 4 8-9" stroke="#0b0f19" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Brand({ light = false, showTagline = false }: { light?: boolean; showTagline?: boolean }) {
  return (
    <Link href="/" className={`brand ${light ? "brand-light" : ""}`} aria-label="AI-SHIELD home">
      <ShieldMark />
      <div className="brand-text-col">
        <span className="brand-name">
          AI-SHIELD<span className="brand-period text-amber-500">.</span>
        </span>
        {showTagline && (
          <small className="brand-tagline">Attack. Test. Defend. Deploy.</small>
        )}
      </div>
    </Link>
  );
}
