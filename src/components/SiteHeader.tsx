import Link from "next/link";

/** Compact chrome for member/scan flows — not a sales header. */
export function SiteHeader({ compact = false }: { compact?: boolean }) {
  return (
    <header className="no-print border-b border-border/80 backdrop-blur sticky top-0 z-40 bg-black/80">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-400/15 text-yellow-300 border border-yellow-400/30 text-xs font-bold">
            ÉF
          </span>
          <span className="text-slate-200">Éconofitness</span>
        </Link>
        {!compact && (
          <nav className="flex items-center gap-3 text-sm text-slate-400">
            <Link href="/" className="hover:text-yellow-300">
              Home
            </Link>
            <Link href="/scan" className="hover:text-yellow-300">
              Scan
            </Link>
            <Link href="/admin/login" className="text-xs text-slate-500 hover:text-slate-300">
              Staff
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
