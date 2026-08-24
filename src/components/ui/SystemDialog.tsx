import type { ReactNode } from 'react'
import { Modal } from './Modal'
import { cn } from '../../lib/cn'

interface SystemDialogProps {
  open: boolean
  icon: ReactNode
  title: string
  body?: ReactNode
  /** Optional extra content above the actions (e.g. precision selector). */
  extra?: ReactNode
  onAllow: () => void
  onDeny: () => void
  allowLabel?: string
  denyLabel?: string
}

/**
 * iOS-style simulated system permission dialog.
 * Forces an explicit choice — no backdrop dismissal (onClose intentionally omitted).
 */
export function SystemDialog({
  open,
  icon,
  title,
  body,
  extra,
  onAllow,
  onDeny,
  allowLabel = 'Allow',
  denyLabel = "Don't Allow",
}: SystemDialogProps) {
  return (
    <Modal open={open}>
      <div className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#141416]/95 shadow-[0_24px_80px_rgba(0,0,0,0.7)] backdrop-blur-xl animate-scale-in">
        <div className="flex flex-col items-center px-6 pt-6 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-accent to-accent-hot text-white shadow-[0_0_36px_rgba(168,85,247,0.5)] [&>svg]:h-7 [&>svg]:w-7">
            {icon}
          </div>
          <p className="mt-4 text-sm font-semibold leading-snug text-white">{title}</p>
          {body && <p className="mt-1.5 text-xs leading-relaxed text-white/55">{body}</p>}
          {extra && <div className="mt-4 w-full">{extra}</div>}
        </div>
        <div className="mt-5 grid grid-cols-2 border-t border-white/10">
          <button
            type="button"
            onClick={onDeny}
            className="py-3.5 text-[13px] font-medium text-white/50 transition-colors hover:text-white active:bg-white/5"
          >
            {denyLabel}
          </button>
          <button
            type="button"
            onClick={onAllow}
            autoFocus
            className={cn(
              'border-l border-white/10 py-3.5 text-[13px] font-bold text-accent transition-colors',
              'hover:bg-accent/10 active:bg-accent/20',
            )}
          >
            {allowLabel}
          </button>
        </div>
      </div>
    </Modal>
  )
}
