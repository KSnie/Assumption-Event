// tailwind.config.js
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        customGray: '#F8F9FA',
        customRed: '#C85858',
      },
      fontFamily: {
        sans: ['"Open Sans"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xxs: '0.4rem',
        xss: '0.6rem',
      },
      letterSpacing: {
        Custom: '2.00em',
      },
      width: {
        CustomW: '105%',
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};
