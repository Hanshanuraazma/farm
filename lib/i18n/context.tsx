'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Locale } from './types';
import { defaultLocale } from './types';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const LOCALE_STORAGE_KEY = 'gofarm-locale';

interface I18nProviderProps {
  children: React.ReactNode;
  translations: Record<string, any>;
  initialLocale?: Locale;
}

export function I18nProvider({ children, translations, initialLocale }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale;
      return saved || initialLocale || defaultLocale;
    }
    return initialLocale || defaultLocale;
  });

  const [currentTranslations, setCurrentTranslations] = useState<Record<string, any>>(translations);

  useEffect(() => {
    import(`./dictionaries/${locale}.json`)
      .then((module) => setCurrentTranslations(module.default))
      .catch((err) => console.error('Failed to load translations:', err));
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
      document.documentElement.lang = newLocale;
    }
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = currentTranslations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}

export function useTranslation() {
  const { t } = useI18n();
  return { t };
}

export function useLocale() {
  const { locale, setLocale } = useI18n();
  return { locale, setLocale };
}
