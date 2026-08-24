import type { ReactNode } from 'react'

/**
 * Responsive app shell:
 *  - Full-bleed viewport on mobile.
 *  - Centered phone frame (max-w 420px) with ambient glows + side copy on desktop.
 */
export function PhoneShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-black font-sans text-white">
      {/* Ambient background glows */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0">
        <div className="absolute -top-44 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]" />
        <div className="absolute -bottom-40 -right-24 h-[420px] w-[420px] rounded-full bg-accent-hot/15 blur-[130px]" />
      </div>

      {/* Desktop-only marketing rail */}
      <aside
        aria-hidden="true"
        className="pointer-events-none absolute left-16 top-1/2 hidden max-w-sm -translate-y-1/2 xl:block"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">Extroverts · Signup Flow</p>
        <h2 className="mt-4 text-5xl font-extrabold uppercase leading-[1.05] tracking-tight text-white/90">
          Only for the loud ones<span className="text-accent">.</span>
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-white/45">
          An interactive rebuild of the Extroverts mobile onboarding — permissions, OTP verification, profile matching
          and more. Best experienced inside the frame.
        </p>
      </aside>

      {/* The phone frame */}
      <div className="relative z-10 h-dvh w-full max-w-[420px] overflow-hidden bg-ink shadow-[0_40px_120px_rgba(0,0,0,0.8)] sm:h-[860px] sm:max-h-[94dvh] sm:w-[420px] sm:rounded-[2.75rem] sm:border sm:border-white/10">
        {children}
      </div>

      <p
        aria-hidden="true"
        className="pointer-events-none absolute bottom-4 right-6 hidden text-[10px] uppercase tracking-[0.25em] text-white/25 lg:block"
      >
        Frontend Assessment · React + Vite + Tailwind
      </p>
    </div>
  )
}
