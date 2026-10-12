/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#06170E',
          900: '#0A2617',
          800: '#0F3822',
          700: '#184C30',
          600: '#236542',
          500: '#2E8055',
        },
        lime: {
          400: '#A3E635',
          500: '#84CC16',
          600: '#65A30D',
        },
        offwhite: {
          50: '#FDFDFB',
          100: '#FBFBF6',
          200: '#F4F4EB',
          300: '#E7E7D9',
        },
        earth: {
          800: '#3A2E2B',
          600: '#685750',
          400: '#9E8B83',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'nature': '0 4px 20px -2px rgba(15, 56, 34, 0.08)',
        'nature-lg': '0 10px 30px -4px rgba(15, 56, 34, 0.12)',
      }
    },
  },
  plugins: [],
}
