/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'glow': '0 0 10px #ffffff, 0 0 20px #3b82f6', // White and Blue glow
      },
    },
  },
  plugins: [],
};
