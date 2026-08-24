import { forwardRef, useId, type InputHTMLAttributes } from 'react'
import { Check } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  checked: boolean
}

/**
 * Custom-styled checkbox. Controlled via `checked` — pair it with
 * react-hook-form's watch() + register() for a fully controlled flow.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, checked, id, className, ...rest },
  ref,
) {
  const autoId = useId()
  const inputId = id ?? autoId

  return (
    <div className={className}>
      <label htmlFor={inputId} className="group flex cursor-pointer select-none items-center gap-3">
        <span className="relative mt-px inline-grid shrink-0 place-items-center">
          <input ref={ref} id={inputId} type="checkbox" checked={checked} className="peer sr-only" {...rest} />
          <span
            aria-hidden="true"
            className={cn(
              'grid h-5 w-5 place-items-center rounded-md border bg-white/[0.04] transition-all duration-200',
              'peer-checked:border-transparent peer-checked:bg-gradient-to-br peer-checked:from-accent peer-checked:to-accent-hot',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-accent/50 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-black',
              checked ? 'border-transparent' : 'border-white/25 group-hover:border-white/40',
            )}
          >
            <Check
              className={cn(
                'h-3.5 w-3.5 text-white transition-opacity duration-150',
                checked ? 'opacity-100' : 'opacity-0',
              )}
              strokeWidth={3.5}
            />
          </span>
        </span>
        <span className="text-[13px] leading-snug text-white/65 transition-colors group-hover:text-white/85">
          {label}
        </span>
      </label>
    </div>
  )
})
