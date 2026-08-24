import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { CircleAlert } from 'lucide-react'
import { cn } from '../../lib/cn'

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
  icon?: ReactNode
  wrapperClassName?: string
}

/**
 * Accessible labelled text input with icon slot and inline error message.
 * Forwards refs so it plugs straight into react-hook-form's register().
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, error, hint, icon, id, wrapperClassName, className, ...rest },
  ref,
) {
  const autoId = useId()
  const inputId = id ?? autoId
  const errorId = `${inputId}-error`
  const hintId = `${inputId}-hint`

  return (
    <div className={wrapperClassName}>
      <label htmlFor={inputId} className="field-label">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35 [&>svg]:h-[18px] [&>svg]:w-[18px]">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          className={cn(
            'field-input',
            icon && 'pl-11',
            error && 'field-input-error',
            className,
          )}
          {...rest}
        />
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
