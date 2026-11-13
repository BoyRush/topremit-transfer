import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

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
          pageBg: { value: "#F5F8FC" },
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
    },
    semanticTokens: {
      colors: {
        "bg.canvas": { value: "{colors.topremit.pageBg}" },
        "bg.surface": { value: "{colors.topremit.card}" },
        "border.subtle": { value: "{colors.topremit.border}" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
