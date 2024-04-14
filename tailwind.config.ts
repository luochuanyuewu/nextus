import type { Config } from 'tailwindcss'

import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'
// import { getThemesFromEnv } from '@/lib/utils/theme'

function getThemesFromEnv() {
  if (process.env.NEXT_PUBLIC_DAISYUI_THEMES) {
      return JSON.parse(process.env.NEXT_PUBLIC_DAISYUI_THEMES)
  }

  return ['light', 'dark']
}


export default {
  darkMode: 'class',

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
            opacity: '0',
          },
          to: {
            opacity: '1',
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
    themes: getThemesFromEnv(),
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
} satisfies Config
