import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { BadgeCheck, CalendarDays, GraduationCap, Mail, MapPin, RotateCcw, User } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '../ui/Button'
import { useWizardStore } from '../../store/useWizardStore'

function SummaryRow({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3">
      <span className="flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.12em] text-white/40">
        <span className="[&>svg]:h-4 [&>svg]:w-4">{icon}</span>
        {label}
      </span>
      <span className="truncate text-right text-[13px] font-semibold text-white">{value}</span>
    </div>
  )
}

/**
 * Screen 5 · Success — sleek confirmation with animated check,
 * full profile summary and a welcome toast.
 */
export function SuccessScreen() {
  const fullName = useWizardStore((s) => s.fullName)
  const email = useWizardStore((s) => s.email)
  const age = useWizardStore((s) => s.age)
  const pronouns = useWizardStore((s) => s.pronouns)
  const region = useWizardStore((s) => s.region)
  const college = useWizardStore((s) => s.college)
  const goTo = useWizardStore((s) => s.goTo)
  const reset = useWizardStore((s) => s.reset)

  const firstName = fullName.trim().split(/\s+/)[0] || 'friend'

  // Welcome toast on arrival.
  useEffect(() => {
    toast.success(`Account created — welcome to Extroverts, ${firstName}! 🎉`)
  }, [firstName])

  return (
    <div className="flex min-h-full flex-col px-6 pb-8 pt-10">
      {/* Animated success mark */}
      <div className="relative mx-auto grid place-items-center">
        <span aria-hidden="true" className="absolute h-24 w-24 rounded-full border-2 border-accent/60 animate-pulse-ring" />
        <div className="grid h-20 w-20 animate-scale-in place-items-center rounded-full bg-gradient-to-br from-accent to-accent-hot shadow-[0_0_60px_rgba(168,85,247,0.55)]">
          <BadgeCheck className="h-10 w-10 animate-scale-in [animation-delay:0.15s] text-white" strokeWidth={2.5} />
        </div>
      </div>

      <h1 className="mt-8 text-center text-[34px] font-extrabold uppercase leading-none tracking-tight">
        You&rsquo;re in<span className="text-gradient">!</span>
      </h1>
      <p className="mx-auto mt-3 max-w-[280px] text-center text-[13px] leading-relaxed text-white/55">
        Nice to meet you, <span className="font-semibold text-white">{firstName}</span>. Your Extroverts pass is ready
        — go be loud somewhere.
      </p>

      {/* Profile summary ticket */}
      <div className="card-surface mt-8 divide-y divide-white/[0.07] overflow-hidden">
        <SummaryRow icon={<User />} label="Name" value={fullName} />
        <SummaryRow icon={<Mail />} label="Email" value={email} />
        <SummaryRow icon={<CalendarDays />} label="Age · Pronouns" value={`${age} · ${pronouns}`} />
        <SummaryRow icon={<GraduationCap />} label="College" value={college} />
        <SummaryRow icon={<MapPin />} label="State" value={region} />
      </div>

      <div className="mt-auto space-y-2.5 pt-8">
        <Button fullWidth onClick={() => goTo('event', -1)}>
          Start exploring
        </Button>
        <Button fullWidth variant="ghost" onClick={() => { reset(); goTo('splash', -1) }}>
          <RotateCcw className="h-3.5 w-3.5" />
          Restart demo
        </Button>
      </div>
    </div>
  )
}
