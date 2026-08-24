# Extroverts — Signup Flow

A responsive single-page web app replicating the **Extroverts** mobile app signup flow.
Dark-theme, Poppins typography, purple/magenta accents, and a phone-frame presentation
on desktop (full-bleed on mobile).

## Tech Stack

| Concern           | Choice                                        |
| ----------------- | --------------------------------------------- |
| Framework         | React 18 + Vite 5 (TypeScript)                |
| Styling           | Tailwind CSS 3                                |
| State             | Zustand (multi-step wizard store)             |
| Forms/Validation  | React Hook Form + Zod (`@hookform/resolvers`) |
| Icons / Toasts    | lucide-react · Sonner                         |
| Font              | Poppins (Google Fonts)                        |

## Getting Started

```bash
npm install
npm run dev      # start dev server
npm run build    # typecheck + production build
npm run preview  # serve the production build
```

## Flow Map

```
Splash ─ CONTINUE ─▶ Event Preview (guest)
                      │  simulated OS dialogs: Notifications → Location (Precise/Approximate) → GPS fetch overlay
                      │  auto-opens "YOU NEED AN ACCOUNT" gate (tap card reopens after "MAYBE LATER")
                      ▼
                   Terms & Conditions ─ ACCEPT ─▶ Step 1 · Email (live validation + newsletter opt-in)
                                                    │ PROCEED → mock sendOtp()
                                                    ▼
                                                  Step 2 · OTP (6-box input, auto-advance,
                                                    │         resend cooldown 30 s, GO BACK)
                                                    │ VERIFY → mock verifyOtp()
                                                    ▼
                                                  Steps 3 & 4 · Profile (name, age 18+ gate,
                                                    │   pronouns pills, State → College filtered dropdown)
                                                    │ COMPLETE PROFILE → mock createAccount()
                                                    ▼
                                                  Success (profile summary ticket + welcome toast)
```

Back navigation is available on every wizard step (Terms → Event, Email → Terms, OTP → Email, Profile → OTP);
all draft values survive step-backs via the Zustand store.

## Project Structure

```
src/
├── components/
│   ├── layout/PhoneShell.tsx        # mobile frame + desktop ambient glows/rail
│   ├── ui/                          # Button, TextField, Checkbox, SelectField,
│   │                                # PillGroup, OtpInput, Modal, SystemDialog, Spinner
│   └── wizard/                      # Wizard shell, header, and all 8 screens incl. PermissionFlow
├── data/locations.ts                # State → College/City dataset for cross-field dropdowns
├── lib/
│   ├── cn.ts                        # className joiner
│   ├── mockApi.ts                   # setTimeout-based fake API (sendOtp / verifyOtp / createAccount)
│   └── validation.ts                # Zod schemas (email, otp, profile)
├── store/useWizardStore.ts          # Zustand wizard state + drafts + permission stage machine
└── types/index.ts                   # shared types
```

## Demo Notes

- The generated OTP is displayed in a dashed "Demo mode" chip on the verification screen so the full flow can be completed end-to-end. Resending generates a fresh code.
- Permission dialogs are simulations — "Don't Allow" simply skips ahead with the choice recorded.
- All submissions use artificial `setTimeout` delays; buttons show inline spinners while pending.
