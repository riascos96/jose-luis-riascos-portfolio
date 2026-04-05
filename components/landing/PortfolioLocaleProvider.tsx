"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import {
  defaultLocale,
  getPortfolioContent,
  type Locale,
} from "@/lib/portfolio-content";

type PortfolioLocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  content: ReturnType<typeof getPortfolioContent>;
};

const PortfolioLocaleContext = createContext<PortfolioLocaleContextValue | null>(null);
const LOCALE_STORAGE_KEY = "portfolio-locale";

export function PortfolioLocaleProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const content = getPortfolioContent(locale);

  useEffect(() => {
    try {
      const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);

      if (storedLocale === "es" || storedLocale === "en") {
        setLocaleState(storedLocale);
        return;
      }

      const browserLanguages = [navigator.language, ...(navigator.languages ?? [])]
        .filter(Boolean)
        .map((language) => language.toLowerCase());

      const detectedLocale: Locale = browserLanguages.some((language) => language.startsWith("en"))
        ? "en"
        : defaultLocale;

      setLocaleState(detectedLocale);
    } catch {
      setLocaleState(defaultLocale);
    }
  }, []);

  function setLocale(locale: Locale) {
    setLocaleState(locale);

    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {}
  }

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <PortfolioLocaleContext.Provider value={{ locale, setLocale, content }}>
      {children}
    </PortfolioLocaleContext.Provider>
  );
}

export function usePortfolioLocale() {
  const context = useContext(PortfolioLocaleContext);

  if (!context) {
    throw new Error("usePortfolioLocale must be used within PortfolioLocaleProvider");
  }

  return context;
}
