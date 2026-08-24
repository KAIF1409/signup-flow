import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  type ClipboardEvent,
  type KeyboardEvent,
} from 'react'
import { cn } from '../../lib/cn'

export interface OtpInputHandle {
  focusFirst: () => void
  clear: () => void
}

interface OtpInputProps {
  length?: number
  value: string
  onChange: (value: string) => void
  /** Fired once when the final digit lands. */
  onComplete?: () => void
  hasError?: boolean
  disabled?: boolean
}

/**
 * 6-box OTP input:
 *  - numeric keyboard enforcement (inputMode="numeric" + pattern="\d*")
 *  - auto-advance on entry, backspace retreat, arrow-key navigation
 *  - full-code paste support, per-cell aria labels
 */
export const OtpInput = forwardRef<OtpInputHandle, OtpInputProps>(function OtpInput(
  { length = 6, value, onChange, onComplete, hasError = false, disabled = false },
  ref,
) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])
  const completedRef = useRef(false)

  useImperativeHandle(ref, () => ({
    focusFirst: () => inputsRef.current[0]?.focus(),
    clear: () => {
      completedRef.current = false
      onChange('')
      inputsRef.current[0]?.focus()
    },
  }))

  // Auto-focus the first box when mounted.
  useEffect(() => {
    inputsRef.current[0]?.focus()
  }, [])

  const digits = Array.from({ length }, (_, i) => value[i] ?? '')

  const emitIfComplete = (next: string) => {
    if (next.length === length && !completedRef.current) {
      completedRef.current = true
      onComplete?.()
    } else if (next.length < length) {
      completedRef.current = false
    }
  }

  const handleInput = (index: number, raw: string) => {
    const digit = raw.replace(/\D/g, '').slice(-1)
    if (!digit) return
    const chars = [...digits]
    chars[index] = digit
    const next = chars.join('')
    onChange(next)
    if (index < length - 1) inputsRef.current[index + 1]?.focus()
    emitIfComplete(next)
  }

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      event.preventDefault()
      const chars = [...digits]
      if (chars[index]) {
        chars[index] = ''
        onChange(chars.join(''))
        completedRef.current = false
      } else if (index > 0) {
        chars[index - 1] = ''
        onChange(chars.join(''))
        inputsRef.current[index - 1]?.focus()
        completedRef.current = false
      }
    } else if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault()
      inputsRef.current[index - 1]?.focus()
    } else if (event.key === 'ArrowRight' && index < length - 1) {
      event.preventDefault()
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '')
    if (!pasted) return
    onChange(pasted.slice(0, length))
    emitIfComplete(pasted)
    inputsRef.current[Math.min(pasted.length, length - 1)]?.focus()
  }

  return (
    <div
      role="group"
      aria-label={`${length}-digit verification code`}
      className={cn('flex justify-between gap-2', disabled && 'pointer-events-none opacity-60')}
    >
      {digits.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el
          }}
          type="text"
          inputMode="numeric"
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          pattern="\d*"
          maxLength={1}
          value={digit}
          disabled={disabled}
          aria-label={`Digit ${i + 1} of ${length}`}
          aria-invalid={hasError || undefined}
          onChange={(e) => handleInput(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.currentTarget.select()}
          className={cn(
            'h-14 w-full rounded-xl border bg-white/[0.04] text-center text-xl font-semibold tracking-wide text-white outline-none transition-all duration-200',
            hasError
              ? 'animate-shake border-red-500/70 focus:border-red-500 focus:ring-2 focus:ring-red-500/25'
              : digit
                ? 'border-accent/70 bg-accent/10 focus:ring-2 focus:ring-accent/30'
                : 'border-white/10 focus:border-accent/70 focus:bg-white/[0.06] focus:ring-2 focus:ring-accent/25',
          )}
        />
      ))}
    </div>
  )
})
