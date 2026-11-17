"use client";

import * as React from "react";
import { Box } from "@chakra-ui/react";
import { Languages } from "lucide-react";
import { useLangStore } from "@/store/lang-store";
import type { Locale } from "@/i18n";

const LOCALES: { code: Locale; flag: string; label: string }[] = [
  { code: "id", flag: "🇮🇩", label: "ID" },
  { code: "en", flag: "🇬🇧", label: "EN" },
];

export function LanguageSwitcher() {
  const { locale, setLocale } = useLangStore();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  // Close on outside click
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  return (
    <Box ref={ref} position="relative" userSelect="none">
      {/* Trigger button — native <button> to avoid Chakra HStack type issues */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Select language"
        aria-expanded={open}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          background: "#F5F8FC",
          padding: "6px 10px",
          borderRadius: "8px",
          border: "1px solid #E7EDF5",
          fontSize: "12px",
          fontWeight: 700,
          color: "#172B4D",
          cursor: "pointer",
          transition: "all 0.15s ease",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.borderColor = "#269FEF";
          el.style.background = "#EAF6FF";
          el.style.color = "#1688DB";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.borderColor = "#E7EDF5";
          el.style.background = "#F5F8FC";
          el.style.color = "#172B4D";
        }}
      >
        <Languages size={13} />
        <span>{current.flag}</span>
        <span>{current.label}</span>
      </button>

      {/* Dropdown */}
      {open && (
        <Box
          position="absolute"
          top="calc(100% + 6px)"
          right={0}
          bg="#FFFFFF"
          border="1px solid #E7EDF5"
          borderRadius="10px"
          boxShadow="0px 8px 24px rgba(15, 23, 42, 0.12)"
          zIndex={200}
          minW="140px"
          overflow="hidden"
        >
          {LOCALES.map((loc) => {
            const isActive = loc.code === locale;
            return (
              <button
                key={loc.code}
                type="button"
                onClick={() => {
                  setLocale(loc.code);
                  setOpen(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  width: "100%",
                  padding: "10px 14px",
                  fontSize: "13px",
                  fontWeight: isActive ? 700 : 500,
                  background: isActive ? "#EAF6FF" : "transparent",
                  color: isActive ? "#1688DB" : "#334155",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background 0.1s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.background = "#F8FAFC";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                <span style={{ fontSize: "16px" }}>{loc.flag}</span>
                <span>{loc.code === "id" ? "Bahasa Indonesia" : "English"}</span>
                {isActive && (
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: "11px",
                      background: "#269FEF",
                      color: "#fff",
                      borderRadius: "4px",
                      padding: "1px 5px",
                    }}
                  >
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
