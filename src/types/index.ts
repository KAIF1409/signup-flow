/** High-level screens of the onboarding wizard, in navigation order. */
export type Step = 'splash' | 'event' | 'terms' | 'email' | 'otp' | 'profile' | 'success'

/** Direction used to pick the slide animation between steps. */
export type Direction = 1 | -1

/** Simulated OS permission dialog stages. */
export type PermissionStage = 'idle' | 'notifications' | 'location' | 'locating' | 'done'

export type LocationPrecision = 'precise' | 'approximate'
