/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: (theme) => {
        const isConditionTrue = /* your condition here */ true;

        if (isConditionTrue) {
          return {
            background: "#FDEEDC", // header and nav bar background color
            iconactive: "E38B29", // button color when clicked
            iconnotactive: "FBC28E", // button color when not clicked
            text: "#E38B29", //text color
            accent: "#4F6F52", //button background color
          };
        } else {
          // Change the colors to a different code
          return {
            background: "#A2CDB0",
            iconactive: "", // button color when clicked
            iconnotactive: "", // button color when not clicked
            text: "",
            accent: "",
          };
        }
      },
    },
  },
  plugins: [require("daisyui")],
};
