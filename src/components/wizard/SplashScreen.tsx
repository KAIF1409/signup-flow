import { AlertTriangle } from 'lucide-react'
import { Button } from '../ui/Button'
import { useWizardStore } from '../../store/useWizardStore'

/**
 * Screen 0 · Splash — logo 'E' with top gradient backdrop,
 * bold uppercase headline and the high-five warning.
 */
export function SplashScreen() {
  const goTo = useWizardStore((s) => s.goTo)

  return (
    <div className="relative flex h-full flex-col overflow-hidden px-6 pb-9">
      {/* Top gradient backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[42vh] bg-gradient-to-b from-accent/35 via-accent-hot/15 to-transparent"
      />

      {/* Floating emoji decorations */}
      <span aria-hidden="true" className="absolute left-9 top-[22%] animate-floaty text-2xl opacity-80">
        🎉
      </span>
      <span
        aria-hidden="true"
        className="absolute right-12 top-[16%] animate-floaty text-xl opacity-70 [animation-delay:1.2s]"
      >
        ✨
      </span>
      <span
        aria-hidden="true"
        className="absolute bottom-[30%] right-10 animate-floaty text-2xl opacity-60 [animation-delay:0.6s]"
      >
        👋
      </span>

      {/* Center content */}
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="grid h-24 w-24 -rotate-6 place-items-center rounded-[1.75rem] bg-gradient-to-br from-accent to-accent-hot text-5xl font-extrabold shadow-[0_0_70px_rgba(168,85,247,0.5)]">
          E
        </div>

        <h1 className="mt-11 max-w-[300px] text-center text-[34px] font-extrabold uppercase leading-[1.12] tracking-tight">
          An app only for <span className="text-gradient">extroverts</span>
        </h1>

        <p className="mt-5 flex max-w-[300px] items-start gap-2 text-center text-[13px] leading-relaxed text-white/55">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent-hot" />
          <span>Warning: Entering may lead to spontaneous dancing and unsolicited high-fives!</span>
        </p>
      </div>

      <Button fullWidth onClick={() => goTo('event', 1)}>
        Continue
      </Button>
      <p className="mt-3 text-center text-[10px] uppercase tracking-[0.2em] text-white/25">
        No introverts were harmed in this demo
      </p>
    </div>
  )
}
