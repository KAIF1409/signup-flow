import { cn } from '../../lib/cn'
import { useWizardStore } from '../../store/useWizardStore'
import type { Step } from '../../types'
import { SplashScreen } from './SplashScreen'
import { EventPreviewScreen } from './EventPreviewScreen'
import { TermsScreen } from './TermsScreen'
import { EmailStep } from './EmailStep'
import { OtpStep } from './OtpStep'
import { ProfileStep } from './ProfileStep'
import { SuccessScreen } from './SuccessScreen'
import { WizardHeader } from './WizardHeader'

/** Where each step navigates back to. `null` = no back action. */
const BACK_TARGETS: Record<Step, Step | null> = {
  splash: null,
  event: null,
  terms: 'event',
  email: 'terms',
  otp: 'email',
  profile: 'otp',
  success: null,
}

/** Signup progress for the segmented indicator (terms is a pre-step). */
const PROGRESS: Partial<Record<Step, number>> = {
  email: 1,
  otp: 2,
  profile: 3,
}
const PROGRESS_TOTAL = 3

/**
 * Multi-step wizard shell.
 * Remounts the active screen on every navigation (`key={step}`) so the
 * direction-aware slide animation replays on each transition.
 */
export function Wizard() {
  const step = useWizardStore((s) => s.step)
  const direction = useWizardStore((s) => s.direction)
  const goTo = useWizardStore((s) => s.goTo)

  const backTarget = BACK_TARGETS[step]
  const progress = PROGRESS[step]

  return (
    <div className="flex h-full flex-col">
      {(backTarget || progress) && (
        <WizardHeader
          onBack={() => backTarget && goTo(backTarget, -1)}
          title={step === 'terms' ? 'House Rules' : undefined}
          progress={progress ? { current: progress, total: PROGRESS_TOTAL } : undefined}
        />
      )}

      <main
        key={step}
        className={cn(
          'scrollbar-none min-h-0 flex-1 overflow-y-auto',
          direction === 1 ? 'animate-step-fwd' : 'animate-step-back',
        )}
      >
        {step === 'splash' && <SplashScreen />}
        {step === 'event' && <EventPreviewScreen />}
        {step === 'terms' && <TermsScreen />}
        {step === 'email' && <EmailStep />}
        {step === 'otp' && <OtpStep />}
        {step === 'profile' && <ProfileStep />}
        {step === 'success' && <SuccessScreen />}
      </main>
    </div>
  )
}
