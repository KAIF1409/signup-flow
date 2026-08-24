import { useEffect } from 'react'
import { Bell, Check, Loader2, MapPin } from 'lucide-react'
import { SystemDialog } from '../ui/SystemDialog'
import { useWizardStore } from '../../store/useWizardStore'
import { toast } from 'sonner'
import { delay } from '../../lib/mockApi'
import { cn } from '../../lib/cn'

const NEARBY_AREAS = ['Indiranagar, Bengaluru', 'Koramangala, Bengaluru', 'Bandra West, Mumbai']

/**
 * Screen 0 · Simulated system permission sequence:
 * notifications dialog → location dialog (Precise/Approximate) → locating overlay.
 * Rendered as an overlay above the wizard inside the phone frame.
 */
export function PermissionFlow() {
  const step = useWizardStore((s) => s.step)
  const stage = useWizardStore((s) => s.permissionStage)
  const precision = useWizardStore((s) => s.locationPrecision)
  const setStage = useWizardStore((s) => s.setPermissionStage)
  const setPermission = useWizardStore((s) => s.setPermission)
  const setPrecision = useWizardStore((s) => s.setLocationPrecision)
  const setDraft = useWizardStore((s) => s.setDraft)

  // Kick off the permission chain shortly after landing on the event preview.
  useEffect(() => {
    if (step === 'event' && stage === 'idle') {
      const timer = setTimeout(() => setStage('notifications'), 450)
      return () => clearTimeout(timer)
    }
  }, [step, stage, setStage])

  // Simulated GPS fetch while the "locating" overlay is visible.
  useEffect(() => {
    if (stage !== 'locating') return
    let active = true
    const run = async () => {
      await delay(1700)
      if (!active) return
      const area = NEARBY_AREAS[Math.floor(Math.random() * NEARBY_AREAS.length)]
      const allowed = useWizardStore.getState().locationAllowed === true
      setDraft({ detectedArea: area })
      setStage('done')
      if (allowed) {
        toast.success('Location unlocked — showing events near you 📍')
      } else {
        toast.info("No worries — we're showing popular events instead.")
      }
    }
    void run()
    return () => {
      active = false
    }
  }, [stage, setDraft, setStage])

  return (
    <>
      {/* Notification permission */}
      <SystemDialog
        open={stage === 'notifications'}
        icon={<Bell />}
        title={'Allow "Extroverts" to send you notifications?'}
        body="You'll get alerts when new events drop near you."
        onAllow={() => {
          setPermission('notifications', true)
          setStage('location')
        }}
        onDeny={() => {
          setPermission('notifications', false)
          setStage('location')
        }}
      />

      {/* Location permission */}
      <SystemDialog
        open={stage === 'location'}
        icon={<MapPin />}
        title={'Allow "Extroverts" to access this device\'s location?'}
        body="Used to surface events happening around you."
        onAllow={() => {
          setPermission('location', true)
          setStage('locating')
        }}
        onDeny={() => {
          setPermission('location', false)
          setStage('locating')
        }}
        extra={
          <div className="space-y-2 text-left">
            {(['precise', 'approximate'] as const).map((option) => {
              const active = precision === option
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setPrecision(option)}
                  className={cn(
                    'flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-left transition-colors',
                    active
                      ? 'border-accent/60 bg-accent/10 text-white'
                      : 'border-white/10 bg-white/[0.03] text-white/60 hover:border-white/25',
                  )}
                >
                  <span className="flex flex-col">
                    <span className="text-xs font-semibold capitalize">{option}</span>
                    <span className="text-[10px] text-white/40">
                      {option === 'precise' ? 'Exact spot — best for meetups' : 'General area only'}
                    </span>
                  </span>
                  <span
                    className={cn(
                      'grid h-4 w-4 shrink-0 place-items-center rounded-full border',
                      active ? 'border-accent bg-accent' : 'border-white/30',
                    )}
                  >
                    {active && <Check className="h-2.5 w-2.5 text-white" strokeWidth={4} />}
                  </span>
                </button>
              )
            })}
          </div>
        }
      />

      {/* Fetching location overlay */}
      {stage === 'locating' && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-ink animate-fade-in">
          <div className="relative grid place-items-center">
            <span className="absolute h-24 w-24 rounded-full border-2 border-accent/50 animate-pulse-ring" />
            <span className="absolute h-24 w-24 rounded-full border-2 border-accent-hot/40 animate-pulse-ring [animation-delay:0.5s]" />
            <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-hot shadow-[0_0_50px_rgba(168,85,247,0.55)]">
              <Loader2 className="h-7 w-7 animate-spin text-white" />
            </div>
          </div>
          <p className="text-[13px] font-bold uppercase tracking-[0.22em]">Fetching your location…</p>
          <div className="w-44 space-y-2">
            <div className="h-2 rounded-full bg-gradient-to-r from-white/10 via-white/30 to-white/10 bg-[length:200%_100%] animate-shimmer" />
            <div className="mx-auto h-2 w-2/3 rounded-full bg-gradient-to-r from-white/10 via-white/20 to-white/10 bg-[length:200%_100%] animate-shimmer" />
          </div>
          <p className="absolute bottom-10 text-[11px] text-white/35">Using GPS · this is only a simulation</p>
        </div>
      )}
    </>
  )
}
