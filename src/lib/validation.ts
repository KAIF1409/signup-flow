import { z } from 'zod'

/** Pragmatic email pattern — no whitespace anywhere, requires a dot TLD of 2+ chars. */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/* ------------------------------------------------------------------ */
/* Screen 2 · Step 1 — Email verification                              */
/* ------------------------------------------------------------------ */

export const emailFormSchema = z.object({
  // .trim() guards against whitespace-only submissions before every check.
  email: z
    .string()
    .trim()
    .min(1, 'Email is required.')
    .max(320, 'Email is too long.')
    .regex(EMAIL_PATTERN, 'Please enter a valid email address.'),
  newsletter: z.boolean(),
})

export type EmailFormValues = z.infer<typeof emailFormSchema>

/* ------------------------------------------------------------------ */
/* Screen 3 · Step 2 — OTP                                             */
/* ------------------------------------------------------------------ */

export const otpSchema = z.object({
  otp: z.string().regex(/^\d{6}$/, 'Enter the 6-digit code.'),
})

/* ------------------------------------------------------------------ */
/* Screen 4 · Steps 3 & 4 — Profile details                            */
/* ------------------------------------------------------------------ */

export const profileFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, 'Full name is required.')
    .min(2, 'Full name needs at least 2 characters.')
    .max(60, 'That name is a little too long.'),
  age: z
    .string()
    .trim()
    .min(1, 'Age is required.')
    .regex(/^\d{1,3}$/, 'Enter your age as a number.')
    .refine((v) => Number(v) >= 18, {
      message: 'You must be 18 or older to join.',
    })
    .refine((v) => Number(v) <= 100, {
      message: 'Enter a realistic age.',
    }),
  pronouns: z.string().min(1, 'Select your pronouns.'),
  region: z.string().min(1, 'Select your state.'),
  college: z.string().min(1, 'Select your college or city.'),
})

export type ProfileFormValues = z.infer<typeof profileFormSchema>
