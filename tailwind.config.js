export default {
  content: [
    './src/**/*.{html,ts}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      colors: {
        border: '#e5e7eb',
        input: '#f3f4f6',
        ring: '#3b82f6',
        background: {
          light: '#f8fafc',
          dark: '#1e293b',
        },
        foreground: {
          light: '#1e293b',
          dark: '#f1f5f9',
        },
        primary: {
          light: '#0ea5e9',
          dark: '#0891b2',
          DEFAULT: '#0ea5e9',
        },
        secondary: {
          light: '#8b5cf6',
          dark: '#a78bfa',
          DEFAULT: '#8b5cf6',
        },
        accent: {
          light: '#f472b6',
          dark: '#ec4899',
          DEFAULT: '#f472b6',
        },
        muted: {
          light: '#6b7280',
          dark: '#9ca3af',
          DEFAULT: '#6b7280',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
};