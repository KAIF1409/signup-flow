import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface ModalProps {
  open: boolean
  /** When provided, clicking the backdrop closes the modal. System dialogs omit it. */
  onClose?: () => void
  children: ReactNode
  /** Bottom-sheet presentation instead of centered card. */
  sheet?: boolean
  labelledById?: string
}

/** Overlay constrained to the phone frame (absolute inside the nearest relative parent). */
export function Modal({ open, onClose, children, sheet = false, labelledById }: ModalProps) {
  if (!open) return null

  return (
    <div
      className="absolute inset-0 z-40 flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledById}
    >
      {onClose ? (
        <button
          type="button"
          aria-label="Close overlay"
          onClick={onClose}
          className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm animate-fade-in"
        />
      ) : (
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm animate-fade-in" />
      )}
      <div className={cn('relative w-full', sheet ? 'max-w-md animate-sheet-up' : 'max-w-[340px] animate-scale-in')}>
        {children}
      </div>
    </div>
  )
}
