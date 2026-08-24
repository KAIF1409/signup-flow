import { forwardRef, useId, type ReactNode, type SelectHTMLAttributes } from 'react'
import { ChevronDown, CircleAlert } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: SelectOption[]
  placeholder?: string
  error?: string
  hint?: string
  /** Leading icon inside the control (e.g. GraduationCap). */
  icon?: ReactNode
  /** Trailing helper node rendered next to the label. */
  action?: ReactNode
}

/** Accessible dark native <select> — forwards refs for react-hook-form. */
export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(function SelectField(
  { label, options, placeholder = 'Select an option', error, hint, icon, action, id, className, ...rest },
  ref,
) {
  const autoId = useId()
  const selectId = id ?? autoId
  const errorId = `${selectId}-error`
  const hintId = `${selectId}-hint`

  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <label htmlFor={selectId} className="field-label">
          {label}
        </label>
        {action}
      </div>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35 [&>svg]:h-[18px] [&>svg]:w-[18px]">
            {icon}
          </span>
        )}
        <select
          ref={ref}
          id={selectId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          className={cn(
            'field-input cursor-pointer appearance-none pr-10',
            icon && 'pl-11',
            error && 'field-input-error',
          )}
          {...rest}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-[#141417] text-white">
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
      </div>
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-xs text-white/40">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="error-text">
          <CircleAlert className="mt-px h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
})
