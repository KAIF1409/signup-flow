import type { ReactNode } from 'react'
import { ChevronLeft } from 'lucide-react'
import { cn } from '../../lib/cn'

interface WizardHeaderProps {
  onBack: () => void
  /** Optional centered title (used on non-numbered steps like Terms). */
  title?: string
  /** Renders the segmented progress indicator when provided. */
  progress?: { current: number; total: number }
}

/** Top bar with back navigation, step title and progress segments. */
export function WizardHeader({ onBack, title, progress }: WizardHeaderProps) {
  return (
    <header className="flex items-center justify-between gap-3 px-4 pt-4">
      <button
        type="button"
        onClick={onBack}
        aria-label="Go back to previous step"
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/80 transition-all hover:bg-white/10 active:scale-95"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {progress ? (
        <div
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={progress.total}
          aria-valuenow={progress.current}
          aria-label={`Step ${progress.current} of ${progress.total}`}
          className="flex items-center gap-2"
        >
          {Array.from({ length: progress.total }).map((_, i) => (
            <span
              key={i}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                i < progress.current - 1 && 'w-8 bg-gradient-to-r from-accent to-accent-hot',
                i === progress.current - 1 && 'w-8 bg-white/30',
                i > progress.current - 1 && 'w-3 bg-white/15',
              )}
            />
          ))}
        </div>
      ) : title ? (
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/50">{title}</p>
      ) : (
        <span />
      )}

      {progress ? (
        <span className="w-10 shrink-0 text-right text-[11px] font-semibold tabular-nums text-white/40">
          {String(progress.current).padStart(2, '0')}
          <span className="text-white/25">/{String(progress.total).padStart(2, '0')}</span>
        </span>
      ) : (
        <span className="w-10 shrink-0" />
      )}
    </header>
  )
}

export function WizardBody({ children }: { children: ReactNode }) {
  return <div className="min-h-0 flex-1">{children}</div>
}
