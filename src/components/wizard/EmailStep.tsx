import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '../ui/Button'
import { TextField } from '../ui/TextField'
import { Checkbox } from '../ui/Checkbox'
import { useWizardStore } from '../../store/useWizardStore'
import { emailFormSchema, type EmailFormValues } from '../../lib/validation'
import { sendOtp } from '../../lib/mockApi'

/**
 * Screen 2 · Step 1 — Email verification.
 * Real-time format validation (on blur, then live re-validation while typing),
 * whitespace-only submissions blocked by the Zod schema.
 */
export function EmailStep() {
  const goTo = useWizardStore((s) => s.goTo)
  const setDraft = useWizardStore((s) => s.setDraft)
  const savedEmail = useWizardStore((s) => s.email)
  const savedNewsletter = useWizardStore((s) => s.newsletter)

  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: { email: savedEmail, newsletter: savedNewsletter },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const onSubmit = async (values: EmailFormValues) => {
    setSubmitting(true)
    try {
      // Mock API delay — "send" the OTP before advancing.
      const result = await sendOtp(values.email)
      setDraft({ email: values.email, newsletter: values.newsletter, otpCode: result.code })
      goTo('otp', 1)
      toast.success(`OTP sent to ${values.email}`)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex min-h-full flex-col px-6 pb-8 pt-6"
    >
      <h1 className="text-[26px] font-extrabold uppercase leading-[1.2] tracking-tight">
        What&rsquo;s your <span className="text-gradient">email</span>?
      </h1>
      <p className="mt-2 text-[13px] leading-relaxed text-white/50">
        We&rsquo;ll send a 6-digit code to verify it&rsquo;s really you.
      </p>

      <div className="mt-8 space-y-5">
        <TextField
          label="Email address"
          icon={<Mail />}
          type="email"
          inputMode="email"
          autoComplete="email"
          autoFocus
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <Checkbox label="I'd like to subscribe to your newsletter" checked={watch('newsletter')} {...register('newsletter')} />
      </div>

      <div className="mt-auto pt-8">
        <Button fullWidth type="submit" loading={submitting}>
          Proceed
        </Button>
        <p className="mt-3 text-center text-[10px] uppercase tracking-[0.18em] text-white/25">Step 1 of 3 · Email</p>
      </div>
    </form>
  )
}
