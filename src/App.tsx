import { Toaster } from 'sonner'
import { PhoneShell } from './components/layout/PhoneShell'
import { Wizard } from './components/wizard/Wizard'
import { PermissionFlow } from './components/wizard/PermissionFlow'

/**
 * Extroverts — signup flow demo.
 * Single-page multi-step wizard rendered inside a phone frame:
 * splash → permissions → event preview → terms → email → OTP → profile → success.
 */
export default function App() {
  return (
    <PhoneShell>
      <div className="flex h-full flex-col">
        <Wizard />
      </div>
      <PermissionFlow />
      <Toaster
        position="top-center"
        theme="dark"
        offset={16}
        toastOptions={{
          style: {
            background: '#17171A',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#FFFFFF',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '13px',
          },
        }}
      />
    </PhoneShell>
  )
}
