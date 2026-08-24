import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'
import { Spinner } from './Spinner'

type Variant = 'primary' | 'ghost' | 'link'

const VARIANT_CLASSES: Record<Variant, string> = {
  // High-contrast white button with black uppercase bold text.
  primary: 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.08)] hover:bg-white/90',
  ghost: 'border border-white/20 bg-transparent text-white hover:bg-white/[0.06]',
  link: 'h-auto w-auto px-1 py-0 text-xs font-semibold normal-case tracking-normal text-accent underline-offset-4 hover:underline disabled:text-white/40',
}

const BASE_CLASSES =
  'inline-flex select-none items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-[13px] font-bold uppercase tracking-[0.14em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-[0.97] disabled:pointer-events-none disabled:opacity-55'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  /** Shows an inline spinner and disables interaction while true. */
  loading?: boolean
  fullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', loading = false, fullWidth = false, className, children, disabled, type, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type ?? 'button'}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(BASE_CLASSES, VARIANT_CLASSES[variant], fullWidth && 'w-full', className)}
      {...rest}
    >
      {loading && <Spinner className="text-current" />}
      {children}
    </button>
  )
})
