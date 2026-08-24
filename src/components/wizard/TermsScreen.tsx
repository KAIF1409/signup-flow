import { HeartHandshake, PartyPopper, ShieldCheck, Sparkles, type LucideIcon } from 'lucide-react'
import { Button } from '../ui/Button'
import { useWizardStore } from '../../store/useWizardStore'

const RULES: Array<{ icon: LucideIcon; title: string; copy: string }> = [
  { icon: PartyPopper, title: 'Bring the energy', copy: 'Good vibes only — this is a hype-free-for-all zone.' },
  { icon: ShieldCheck, title: 'Respect boundaries', copy: 'Personal space is sacred. Read the room, always.' },
  { icon: HeartHandshake, title: 'Consent first', copy: 'Before the high-five, before the duet. Every single time.' },
  { icon: Sparkles, title: 'Zero tolerance', copy: 'No creeps, no drama, no exceptions. We keep it fun.' },
]

/**
 * Screen 1 · Terms & Conditions — bold rule summary with accent highlights.
 */
export function TermsScreen() {
  const goTo = useWizardStore((s) => s.goTo)

  return (
    <div className="flex min-h-full flex-col px-6 pb-8 pt-6">
      <span className="w-fit rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-accent">
        House rules
      </span>

      <h1 className="mt-5 text-[26px] font-extrabold uppercase leading-[1.25] tracking-tight">
        By using this app, you&rsquo;re agreeing to keep things{' '}
        <span className="text-gradient">fun</span>, <span className="text-gradient">safe</span>, and{' '}
        <span className="text-gradient">respectful</span>.
      </h1>

      <ul className="mt-7 space-y-3">
        {RULES.map(({ icon: Icon, title, copy }) => (
          <li key={title} className="card-surface flex items-start gap-3.5 p-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent/25 to-accent-hot/20 text-accent [&>svg]:h-5 [&>svg]:w-5">
              <Icon />
            </span>
            <div>
              <p className="text-sm font-semibold">{title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-white/50">{copy}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Footer note + accept */}
      <div className="mt-auto pt-7">
        <p className="mb-3 text-center text-xs text-white/45">To proceed, accept the Terms and Conditions.</p>
        <Button fullWidth onClick={() => goTo('email', 1)}>
          Accept
        </Button>
        <p className="mt-3 text-center text-[10px] leading-relaxed text-white/25">
          By tapping Accept you agree to our Terms &amp; Conditions and Privacy Policy (both extremely fun reads).
        </p>
      </div>
    </div>
  )
}
