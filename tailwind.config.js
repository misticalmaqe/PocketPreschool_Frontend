/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        adminBackground: '#FDEEDC', // header and nav bar background color
        adminText: '#E38B29', // text color
        adminAccent: '#FBC28E', // button background color

        parentBackground: '#A2CDB0', // header and nav bar background color
        parentText: '#4F6F52', // text color
        parentAccent: '', // Set your accent color if needed
      },
    },
  },
  plugins: [require('daisyui')],
};
