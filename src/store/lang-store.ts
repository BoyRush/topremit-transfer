import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Locale } from "@/i18n";
import { t, type TranslationKey } from "@/i18n";

interface LangState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** Convenience translate function bound to the current locale. */
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
}

export const useLangStore = create<LangState>()(
  persist(
    (set, get) => ({
      locale: "id" as Locale,
      setLocale: (locale) => set({ locale }),
      t: (key, vars) => t(key, get().locale, vars),
    }),
    {
      name: "topremit-lang",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            }
      ),
      partialize: (state) => ({ locale: state.locale }),
    }
  )
);

/**
 * React hook that provides a translate function bound to the current locale.
 * Re-renders automatically when language changes.
 */
export function useT() {
  const { locale } = useLangStore();
  return (key: TranslationKey, vars?: Record<string, string | number>) => t(key, locale, vars);
}
