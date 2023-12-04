/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        adminBackground: "#FDEEDC", // header and nav bar background color
        adminIconactive: "E38B29", // button color when clicked
        adminIconnotactive: "FBC28E", // button color when not clicked
        adminText: "#E38B29", // text color
        adminAccent: "#4F6F52", // button background color

        parentBackground: "#A2CDB0",
        parentIconactive: "#3A4D39", // button color when clicked
        parentIconnotactive: "#739072", // button color when not clicked
        parentText: "#4F6F52",
        parentAccent: "", // Set your accent color if needed
      },
    },
  },
  plugins: [require("daisyui")],
};
