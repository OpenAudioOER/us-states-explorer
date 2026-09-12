/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#3B82F6",
          purple: "#8B5CF6",
          pink: "#EC4899",
          yellow: "#F59E0B",
          green: "#10B981",
          sky: "#0EA5E9",
        },
        "brand-blue": "#3B82F6",
        "brand-purple": "#8B5CF6",
        "brand-pink": "#EC4899",
        "brand-yellow": "#F59E0B",
        "brand-green": "#10B981",
        "brand-sky": "#0EA5E9",
      },
    },
  },
  plugins: [],
};
