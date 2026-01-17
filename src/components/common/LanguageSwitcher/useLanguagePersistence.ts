import { useState, useEffect } from 'react';
import { type Locale, locales } from '@/lib/i18n/config';

export const useLanguagePersistence = (defaultLocale: Locale): [Locale | null, (locale: Locale) => void] => {
  const [storedLocale, setStoredLocale] = useState<Locale | null>(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('preferredLocale');
      if (savedLocale && isValidLocale(savedLocale)) {
        return savedLocale as Locale;
      }
    }
    return null; // Return null initially, we'll handle default in useEffect
  });

  // Load stored locale on mount
  useEffect(() => {
    if (storedLocale === null) {
      const savedLocale = localStorage.getItem('preferredLocale');
      if (savedLocale && isValidLocale(savedLocale)) {
        setStoredLocale(savedLocale as Locale);
      } else {
        setStoredLocale(defaultLocale);
      }
    }
  }, [storedLocale, defaultLocale]);

  // Save locale to localStorage
  const saveLocale = (locale: Locale) => {
    if (isValidLocale(locale)) {
      localStorage.setItem('preferredLocale', locale);
      setStoredLocale(locale);
    }
  };

  return [storedLocale, saveLocale];
};

// Helper function to validate locale
const isValidLocale = (locale: string): locale is Locale => {
  return locales.includes(locale as Locale);
};