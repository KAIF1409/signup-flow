import { create } from 'zustand'
import type { Direction, LocationPrecision, PermissionStage, Step } from '../types'
import { generateOtp } from '../lib/mockApi'

/** Draft fields persisted across step-back navigation. */
export interface WizardDrafts {
  email: string
  newsletter: boolean
  otpCode: string
  fullName: string
  age: string
  pronouns: string
  region: string
  college: string
  detectedArea: string
}

interface WizardState extends WizardDrafts {
  step: Step
  direction: Direction
  /** Simulated OS permission dialog stage. */
  permissionStage: PermissionStage
  notificationsAllowed: boolean | null
  locationAllowed: boolean | null
  locationPrecision: LocationPrecision
  /** Whether the "YOU NEED AN ACCOUNT" modal has auto-shown once already. */
  gateAutoShown: boolean
  isAuthenticated: boolean

  goTo: (step: Step, direction?: Direction) => void
  setDraft: (patch: Partial<WizardDrafts>) => void
  setPermissionStage: (stage: PermissionStage) => void
  setPermission: (kind: 'notifications' | 'location', allowed: boolean) => void
  setLocationPrecision: (precision: LocationPrecision) => void
  markGateAutoShown: () => void
  authenticate: () => void
  reset: () => void
}

function initialState() {
  return {
    step: 'splash' as Step,
    direction: 1 as Direction,
    permissionStage: 'idle' as PermissionStage,
    notificationsAllowed: null,
    locationAllowed: null,
    locationPrecision: 'precise' as LocationPrecision,
    gateAutoShown: false,
    isAuthenticated: false,
    email: '',
    newsletter: false,
    otpCode: generateOtp(),
    fullName: '',
    age: '',
    pronouns: '',
    region: '',
    college: '',
    detectedArea: 'Indiranagar, Bengaluru',
  }
}

export const useWizardStore = create<WizardState>()((set) => ({
  ...initialState(),

  goTo: (step, direction = 1) => set({ step, direction }),

  setDraft: (patch) => set(patch),

  setPermissionStage: (permissionStage) => set({ permissionStage }),

  setPermission: (kind, allowed) =>
    set(kind === 'notifications' ? { notificationsAllowed: allowed } : { locationAllowed: allowed }),

  setLocationPrecision: (locationPrecision) => set({ locationPrecision }),

  markGateAutoShown: () => set({ gateAutoShown: true }),

  authenticate: () => set({ isAuthenticated: true }),

  reset: () => set(initialState()),
}))
