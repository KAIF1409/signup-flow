import { useCallback, useEffect, useRef, useState } from 'react'
import { Info, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '../ui/Button'
import { OtpInput, type OtpInputHandle } from '../ui/OtpInput'
import { useWizardStore } from '../../store/useWizardStore'
import { sendOtp, verifyOtp } from '../../lib/mockApi'

const RESEND_COOLDOWN_SECONDS = 30

/**
 * Screen 3 · Step 2 — OTP verification.
 * 6-box numeric input with auto-advance, wrong-code shake,
 * GO BACK to edit email, and Resend OTP with a 30s cooldown.
 */
export function OtpStep() {
  const email = useWizardStore((s) => s.email)
  const otpCode = useWizardStore((s) => s.otpCode)
  const goTo = useWizardStore((s) => s.goTo)
  const setDraft = useWizardStore((s) => s.setDraft)

  const [value, setValue] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [verifying, setVerifying] = useState(false)
  const [resending, setResending] = useState(false)
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS)

  const otpRef = useRef<OtpInputHandle>(null)

  // Cooldown countdown for the resend link.
  useEffect(() => {
    if (cooldown <= 0) return
    const interval = setInterval(() => setCooldown((c) => c - 1), 1000)
    return () => clearInterval(interval)
  }, [cooldown])

  const handleVerify = useCallback(async () => {
    if (verifying || value.length !== 6) return
    setVerifying(true)
    setError(null)
    try {
      // Mock API delay + server-side comparison.
      const ok = await verifyOtp(value, otpCode)
      if (ok) {
        goTo('profile', 1)
        toast.success('Email verified successfully ✅')
      } else {
        setError('Incorrect code. Please try again.')
        otpRef.current?.clear()
      }
    } finally {
      setVerifying(false)
    }
  }, [verifying, value, otpCode, goTo])

  const handleResend = async () => {
    if (cooldown > 0 || resending) return
    setResending(true)
    try {
      const result = await sendOtp(email)
      setDraft({ otpCode: result.code })
      setValue('')
      setError(null)
      setCooldown(RESEND_COOLDOWN_SECONDS)
      otpRef.current?.focusFirst()
      toast.success('A fresh OTP is on its way! 📬')
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="flex min-h-full flex-col px-6 pb-8 pt-6">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-accent/30 to-accent-hot/20 text-accent">
        <ShieldCheck className="h-6 w-6" />
      </div>

      <h1 className="mt-5 text-[26px] font-extrabold uppercase leading-[1.2] tracking-tight">Enter verification code</h1>
      <p className="mt-2 text-[13px] leading-relaxed text-white/50">
        A 6-digit OTP has been sent to{' '}
        <span className="font-semibold text-white">{email}</span>
      </p>

      {/* Demo-mode hint so reviewers can complete the flow */}
      <p className="mt-4 inline-flex w-fit items-center gap-2 rounded-lg border border-dashed border-accent/40 bg-accent/10 px-3 py-2 text-xs text-accent">
        <Info className="h-3.5 w-3.5 shrink-0" />
        Demo mode · your code is{' '}
        <strong className="font-bold tabular-nums tracking-[0.18em]" aria-live="polite">
          {otpCode}
        </strong>
      </p>

      <div className="mt-7">
        <OtpInput
          ref={otpRef}
          length={6}
          value={value}
          onChange={(next) => {
            setValue(next)
            setError(null)
          }}
          onComplete={handleVerify}
          hasError={!!error}
          disabled={verifying || resending}
        />
        {error && (
          <p role="alert" aria-live="assertive" className="error-text mt-2.5 animate-shake justify-center">
            {error}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={handleResend}
        disabled={cooldown > 0 || resending || verifying}
        className="mt-5 self-center rounded-md px-2 py-1 text-xs font-semibold text-accent underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 disabled:text-white/35 disabled:no-underline"
      >
        {resending ? 'Sending…' : cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Resend OTP'}
      </button>

      <div className="mt-auto space-y-2.5 pt-8">
        <Button fullWidth loading={verifying} onClick={() => void handleVerify()}>
          Verify
        </Button>
        <Button fullWidth variant="ghost" onClick={() => goTo('email', -1)}>
          Go back
        </Button>
        <p className="pt-1 text-center text-[10px] uppercase tracking-[0.18em] text-white/25">Step 2 of 3 · Verification</p>
      </div>
    </div>
  )
}
