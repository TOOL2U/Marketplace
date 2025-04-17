import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        darkgray: "#4D4D4D",
        yellow: "#FFF02B",
        "brand-white": "#FFFFFF",
        "brand-black": "#000000",
        "brand-foreground": "#000000",
        "brand-medium-black": "#121212",
        "brand-light-black": "#222222",
        "brand-light-grey-wash": "#E5E5E5",
        "brand-gray-400": "#A3A3A3",
        "brand-neutrals-100": "#F5F5F5",
        "brand-neutrals-200": "#E5E5E5",
        "brand-neutrals-400": "#A3A3A3",
        "brand-neutrals-600": "#525252",
        "brand-neutrals-700": "#404040",
        "brand-neutrals-800": "#262626",
        "brand-neutrals-900": "#171717",
      },
      fontFamily: {
        sans: [
          '"Inter"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        mono: [
          "ui-monospace", 
          "SFMono-Regular", 
          "Menlo", 
          "Monaco", 
          "Consolas", 
          "Liberation Mono", 
          "Courier New", 
          "monospace"
        ],
        'rational-display': [
          'RationalTWDisplay',
          'system-ui',
          'sans-serif'
        ],
        'rational-text': [
          'RationalTWText',
          'system-ui',
          'sans-serif'
        ],
      },
      letterSpacing: {
        '4': '0.04em',
        '-2': '-0.02em',
        '-4': '-0.04em',
      },
      boxShadow: {
        navbar: '0px 5px 18px rgba(204, 204, 204, 0.2)',
      },
      gridTemplateColumns: {
        'navbar': '1fr auto 1fr',
      },
    },
  },
  plugins: [],
} satisfies Config;


