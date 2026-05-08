/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
        colors: {
            space: {
                900: '#0a0514',
                800: '#130b29',
                700: '#23154d',
                600: '#3a2282',
            },
            neon: {
                blue: '#00f3ff',
                purple: '#b026ff',
                pink: '#ff00aa'
            }
        },
        fontFamily: {
            sans: ['Inter', 'system-ui', 'sans-serif'],
        }
    }
  },
  plugins: [],
}
