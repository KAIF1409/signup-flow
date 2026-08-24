/**
 * Mock API layer — strictly front-end simulation.
 * Every "network" call resolves after an artificial setTimeout delay.
 */

/** Promise-based sleep helper. */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** Generates a random 6-digit numeric OTP. */
export function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000))
}

export interface SendOtpResult {
  code: string
  email: string
}

/** Simulates "send OTP" email delivery. */
export async function sendOtp(email: string): Promise<SendOtpResult> {
  await delay(1100)
  return { code: generateOtp(), email }
}

/** Simulates server-side OTP verification against the expected code. */
export async function verifyOtp(code: string, expected: string): Promise<boolean> {
  await delay(950)
  return code === expected
}

/** Simulates profile submission / account creation. */
export async function createAccount(): Promise<{ id: string }> {
  await delay(1500)
  return { id: `ext_${Math.random().toString(36).slice(2, 10)}` }
}
