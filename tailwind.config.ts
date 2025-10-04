/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00a878", // ✅ green approve
        danger: "#ef4444",  // ❌ reject red
        warning: "#facc15", // 🟡 pending
        lightBg: "#f8fafc", // 🩶 subtle background
        card: "#ffffff",    // 🧊 white cards
        borderColor: "#e5e7eb", // light border
        textMain: "#111827", // black text
        textMuted: "#6b7280", // gray text
      },
      boxShadow: {
        soft: "0 4px 12px rgba(0, 0, 0, 0.05)",
      },
      borderRadius: {
        xl: "12px",
      },
    },
  },
  plugins: [],
};
