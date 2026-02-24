/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#050c05',
        'dark-secondary': '#0c150c',
        'accent-cyan': '#00ff88',
        'accent-purple': '#10b981',
        'accent-blue': '#059669',
        'text-primary': '#ffffff',
        'text-secondary': '#a0b0a0',
      },
      fontFamily: {
        'display': ['Space Grotesk', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-in': 'slide-in 0.8s ease-out',
        'glitch': 'glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)' },
          '50%': { opacity: '1', boxShadow: '0 0 40px rgba(0, 255, 136, 0.6)' },
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(16px)',
      },
    },
  },
  plugins: [],
}
