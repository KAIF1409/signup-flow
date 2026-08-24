import { useEffect, useState } from 'react'
import { Bell, Clock, Lock, MapPin, Users } from 'lucide-react'
import { Button } from '../ui/Button'
import { Modal } from '../ui/Modal'
import { useWizardStore } from '../../store/useWizardStore'
import { toast } from 'sonner'

/**
 * Screen 0 · Event preview — the guest experience. Tapping (or auto-opening once)
 * triggers the "YOU NEED AN ACCOUNT" gate that funnels into signup.
 */
export function EventPreviewScreen() {
  const isAuthenticated = useWizardStore((s) => s.isAuthenticated)
  const gateAutoShown = useWizardStore((s) => s.gateAutoShown)
  const markGateAutoShown = useWizardStore((s) => s.markGateAutoShown)
  const notificationsAllowed = useWizardStore((s) => s.notificationsAllowed)
  const detectedArea = useWizardStore((s) => s.detectedArea)
  const goTo = useWizardStore((s) => s.goTo)

  const [gateOpen, setGateOpen] = useState(false)

  // Auto-trigger the account gate once, shortly after mount.
  useEffect(() => {
    if (!gateAutoShown) {
      const timer = setTimeout(() => {
        setGateOpen(true)
        markGateAutoShown()
      }, 900)
      return () => clearTimeout(timer)
    }
  }, [gateAutoShown, markGateAutoShown])

  const handleEventTap = () => {
    if (isAuthenticated) {
      toast.success('Seat reserved — see you Saturday! ☕😄')
    } else {
      setGateOpen(true)
    }
  }

  const handleBellTap = () => {
    toast.info(
      notificationsAllowed === false
        ? 'Notifications are off — enable them in Settings to never miss an event.'
        : "You're all caught up! New events will ping you.",
    )
  }

  return (
    <div className="flex min-h-full flex-col px-5 pb-8 pt-5">
      {/* App bar */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 -rotate-6 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-hot text-base font-extrabold shadow-[0_0_24px_rgba(168,85,247,0.4)]">
            E
          </span>
          <span className="text-sm font-extrabold uppercase tracking-[0.18em]">Extroverts</span>
        </div>
        <button
          type="button"
          onClick={handleBellTap}
          aria-label="Notifications"
          className="relative grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/80 transition-all hover:bg-white/10 active:scale-95"
        >
          <Bell className="h-[18px] w-[18px]" />
          {notificationsAllowed !== false && (
            <span aria-hidden="true" className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-accent-hot" />
          )}
        </button>
      </header>

      {/* Section heading */}
      <div className="mt-7 flex flex-col gap-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-white/45">Popular near you</p>
        <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/70">
          <MapPin className="h-3.5 w-3.5 text-accent" />
          {detectedArea}
        </div>
      </div>

      {/* Event preview card */}
      <button
        type="button"
        onClick={handleEventTap}
        aria-label="Coffee date event — tap to reserve your seat"
        className="card-surface group mt-4 block w-full overflow-hidden text-left transition-transform duration-200 active:scale-[0.985]"
      >
        {/* Cover */}
        <div className="relative grid h-44 place-items-center bg-gradient-to-br from-[#3b1d5a] via-[#201036] to-black">
          <span className="text-6xl transition-transform duration-300 group-hover:scale-110">☕</span>
          <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-accent to-accent-hot px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em]">
            Popular
          </span>
          <span className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/75 backdrop-blur-sm">
            This weekend
          </span>
        </div>

        {/* Body */}
        <div className="space-y-3.5 p-4">
          <h3 className="text-xl font-bold">Coffee Date</h3>
          <div className="flex items-center gap-2.5 text-[13px] text-white/65">
            <Clock className="h-4 w-4 shrink-0 text-accent" />
            Sat · 7:00 PM – 9:30 PM IST
          </div>
          <div className="flex items-start gap-2.5 text-[13px] text-white/65">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            Blue Tokai Roasters, Indiranagar
          </div>

          {/* Host row + seats */}
          <div className="flex items-center justify-between border-t border-white/10 pt-3.5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-accent/70 to-accent-hot/70 text-[11px] font-bold">
                NP
              </span>
              <div className="leading-tight">
                <p className="text-xs font-semibold text-white">@neelpatel</p>
                <p className="text-[10px] uppercase tracking-[0.16em] text-white/40">Host</p>
              </div>
            </div>
            <div className="text-right">
              <p className="flex items-center justify-end gap-1.5 text-[11px] text-white/55">
                <Users className="h-3.5 w-3.5" /> 6 of 8 seats filled
              </p>
              <div className="ml-auto mt-1.5 h-1 w-24 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-accent to-accent-hot" />
              </div>
            </div>
          </div>
        </div>
      </button>

      <p className="mt-auto pt-5 text-center text-[11px] text-white/35">
        {isAuthenticated ? 'You have a pass now — go say hi 👋' : 'Tap the card to reserve your seat'}
      </p>

      {/* Account gate */}
      <Modal open={gateOpen} onClose={() => setGateOpen(false)} sheet labelledById="account-gate-title">
        <div className="rounded-t-[1.75rem] border border-white/10 bg-[#141416]/95 p-6 pb-7 text-center shadow-[0_24px_80px_rgba(0,0,0,0.75)] backdrop-blur-xl sm:rounded-[1.75rem]">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-accent/40 bg-accent/15 text-accent [&>svg]:h-6 [&>svg]:w-6">
            <Lock />
          </div>
          <h2 id="account-gate-title" className="mt-4 text-xl font-extrabold uppercase leading-snug tracking-tight">
            You need an account
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-white/55">
            Sign up in under a minute to unlock events near you and start meeting people.
          </p>
          <div className="mt-6 space-y-2.5">
            <Button
              fullWidth
              autoFocus
              onClick={() => {
                setGateOpen(false)
                goTo('terms', 1)
              }}
            >
              Get started
            </Button>
            <Button
              fullWidth
              variant="ghost"
              onClick={() => {
                setGateOpen(false)
                toast.info('Browsing as a guest — tap the event anytime to join.')
              }}
            >
              Maybe later
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

