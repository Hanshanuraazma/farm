/**
 * i18n types and configuration
 */

export type Locale = 'id' | 'en';

export const locales: Locale[] = ['id', 'en'];
export const defaultLocale: Locale = 'id';

export const localeNames: Record<Locale, string> = {
  id: 'Indonesia',
  en: 'English',
};

export const localeFlags: Record<Locale, string> = {
  id: '🇮🇩',
  en: '🇬🇧',
};
