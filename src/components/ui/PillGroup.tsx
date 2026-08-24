import { useId } from 'react'
import { CircleAlert } from 'lucide-react'
import { cn } from '../../lib/cn'

interface PillGroupProps {
  /** Accessible name for the radiogroup (visually rendered as a field-label). */
  label: string
  options: string[]
  value: string
  onChange: (value: string) => void
  error?: string
}

/** Single-select pill buttons rendered with role="radiogroup". */
export function PillGroup({ label, options, value, onChange, error }: PillGroupProps) {
  const groupId = useId()
  const errorId = `${groupId}-error`

  return (
    <div>
      <p id={groupId} className="field-label">
        {label}
      </p>
      <div
        role="radiogroup"
        aria-labelledby={groupId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="flex flex-wrap gap-2"
      >
        {options.map((option) => {
          const active = value === option
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(option)}
              className={cn(
                'rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 active:scale-[0.96]',
                active
                  ? 'border-transparent bg-gradient-to-r from-accent to-accent-hot text-white shadow-[0_6px_20px_rgba(168,85,247,0.35)]'
                  : 'border-white/15 bg-white/[0.04] text-white/65 hover:border-white/30 hover:text-white',
              )}
            >
              {option}
            </button>
          )
        })}
      </div>
      {error && (
        <p id={errorId} role="alert" className="error-text">
          <CircleAlert className="mt-px h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}
