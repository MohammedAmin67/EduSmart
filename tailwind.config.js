/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
  extend: {
    animation: {
      fadeIn: "fadeIn 1s ease-out",
      fadeInUp: "fadeInUp 0.8s cubic-bezier(.39,.575,.565,1) both",
      slideIn: "slideIn 0.8s cubic-bezier(.39,.575,.565,1) both",
      glow: "glow 2.5s infinite alternate",
    },
    keyframes: {
      fadeIn: { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
      fadeInUp: { "0%": { opacity: 0, transform: "translateY(40px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
      slideIn: { "0%": { opacity: 0, transform: "translateX(40px)" }, "100%": { opacity: 1, transform: "translateX(0)" } },
      glow: { "0%": { filter: "drop-shadow(0 0 0px #facc15)" }, "100%": { filter: "drop-shadow(0 0 8px #facc15)" } },
    },
  },
},
  plugins: [],
}
