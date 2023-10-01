/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',

  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      colors: {
        gray: colors.slate,
        red: colors.rose,
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        serif: ['Playfair Display', ...defaultTheme.fontFamily.serif],
        mono: ['Fira Code', ...defaultTheme.fontFamily.mono],
      },
      animation: {
        'fade-in': 'fade-in 0.5s linear forwards',
      },
      keyframes: {
        'fade-in': {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
      },
    },
  },

  variants: {
    extend: {},
  },

  // daisyUI config (optional) //https://daisyui.com/docs/config/
  daisyui: {
    styled: true,
    themes: JSON.parse(process.env.NEXT_PUBLIC_DAISYUI_THEMES || 'false'),
    base: true,
    utils: true,
    logs: false,
    rtl: false,
    prefix: '',
    darkTheme: 'dark',
  },

  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('daisyui'),
  ],
}
