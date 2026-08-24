/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0D0D0D',
          soft: '#151517',
        },
        accent: {
          DEFAULT: '#A855F7',
          hot: '#E23BD6',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'step-fwd': {
          '0%': { opacity: '0', transform: 'translateX(32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'step-back': {
          '0%': { opacity: '0', transform: 'translateX(-32px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(.92) translateY(10px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'sheet-up': {
          '0%': { opacity: '0', transform: 'translateY(48px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-8px)' },
          '40%': { transform: 'translateX(8px)' },
          '60%': { transform: 'translateX(-5px)' },
          '80%': { transform: 'translateX(5px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.55' },
          '100%': { transform: 'scale(1.9)', opacity: '0' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0) rotate(var(--tw-rotate, 0deg))' },
          '50%': { transform: 'translateY(-10px) rotate(var(--tw-rotate, 0deg))' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'step-fwd': 'step-fwd .38s cubic-bezier(.22,1,.36,1) both',
        'step-back': 'step-back .38s cubic-bezier(.22,1,.36,1) both',
        'fade-in': 'fade-in .25s ease-out both',
        'scale-in': 'scale-in .28s cubic-bezier(.22,1,.36,1) both',
        'sheet-up': 'sheet-up .35s cubic-bezier(.22,1,.36,1) both',
        shake: 'shake .45s ease-in-out',
        'pulse-ring': 'pulse-ring 1.6s ease-out infinite',
        floaty: 'floaty 4.5s ease-in-out infinite',
        shimmer: 'shimmer 1.6s linear infinite',
      },
    },
  },
  plugins: [],
}
