/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      boxShadow: {
        "custom-white":
          "0 0 10px 1px rgb(255,255,255), 0 0 50px rgb(255,255,255), 0 0 100px rgb(255,255,255)",
        "custom-black":
          "0 0 20px rgba(0,0,0,0.8), 0 0 50px rgba(0,0,0,0.5), 0 0 100px rgba(0,0,0,0.3)",
        "custom-red":
          "0 0 10px 1px rgb(220,38,38), 0 0 50px rgb(220,38,38), 0 0 100px rgb(220,38,38)",
        "custom-green":
          "0 0 20px rgba(0,255,0,0.8), 0 0 50px rgba(0,255,0,0.5), 0 0 100px rgba(0,255,0,0.3)",
        "custom-blue":
          "0 0 20px rgba(0,0,255,0.8), 0 0 50px rgba(0,0,255,0.5), 0 0 100px rgba(0,0,255,0.3)",
      },
    },
  },
  plugins: [],
};
