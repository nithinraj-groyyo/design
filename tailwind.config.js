/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xxs': '0px',    // Extra extra small devices (below 475px)
        'xs': '475px',  // Extra small devices (phones, less than 576px)
        'sm': '640px',  // Small devices (phones, 640px and up)
        'md': '768px',  // Medium devices (tablets, 768px and up)
        'lg': '1024px', // Large devices (desktops, 1024px and up)
        'xl': '1280px', // Extra large devices (large desktops, 1280px and up)
        '2xl': '1536px',// Double extra large devices (larger desktops, 1536px and up)
      },
    },
  },
  plugins: [],
}