import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

export const topremitColors = {
  // Primary Brand Colors
  primary: "#269FEF",
  primaryDark: "#1688DB",
  lightBlue: "#EAF6FF",
  paleBlue: "#D8EDFF",

  // Neutral Colors
  white: "#FFFFFF",
  background: "#F5F8FC",
  border: "#E7EDF5",
  secondaryText: "#64748B",
  heading: "#172B4D",
  darkText: "#0F172A",

  // Status Colors
  success: "#16A34A",
  warning: "#F59E0B",
  error: "#DC2626",
};

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#EAF6FF" },
          100: { value: "#D8EDFF" },
          200: { value: "#BCE1FF" },
          300: { value: "#8AC8FC" },
          400: { value: "#58AEF8" },
          500: { value: "#269FEF" }, // Topremit Primary Blue
          600: { value: "#1688DB" }, // Primary Dark
          700: { value: "#0F6BB0" },
          800: { value: "#0A4E82" },
          900: { value: "#063356" },
        },
        topremit: {
          blue: { value: "#269FEF" },
          blueDark: { value: "#1688DB" },
          lightBlue: { value: "#EAF6FF" },
          paleBlue: { value: "#D8EDFF" },
          bg: { value: "#F5F8FC" },
          border: { value: "#E7EDF5" },
          card: { value: "#FFFFFF" },
          heading: { value: "#172B4D" },
          textDark: { value: "#0F172A" },
          secondary: { value: "#64748B" },
          success: { value: "#16A34A" },
          warning: { value: "#F59E0B" },
          error: { value: "#DC2626" },
        },
      },
      fonts: {
        heading: { value: "var(--font-inter), sans-serif" },
        body: { value: "var(--font-inter), sans-serif" },
      },
      radii: {
        card: { value: "16px" },
        button: { value: "10px" },
        input: { value: "12px" },
        modal: { value: "20px" },
        badge: { value: "9999px" },
      },
      shadows: {
        card: { value: "0px 2px 8px rgba(15, 23, 42, 0.04)" },
        hoverCard: { value: "0px 6px 16px rgba(38, 159, 239, 0.12)" },
        dropdown: { value: "0px 8px 24px rgba(15, 23, 42, 0.1)" },
        modal: { value: "0px 16px 40px rgba(15, 23, 42, 0.15)" },
      },
    },
    semanticTokens: {
      colors: {
        "bg.canvas": { value: "{colors.topremit.bg}" },
        "bg.surface": { value: "{colors.topremit.card}" },
        "border.subtle": { value: "{colors.topremit.border}" },
        "fg.default": { value: "{colors.topremit.textDark}" },
        "fg.muted": { value: "{colors.topremit.secondary}" },
        "fg.heading": { value: "{colors.topremit.heading}" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
