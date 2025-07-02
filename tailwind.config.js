/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "btn-color": "var(--btn-color)",
        "del-color": "var(--del-color)",
      },
    },
  },
  plugins: [],
};
