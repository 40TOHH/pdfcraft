'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Globe } from 'lucide-react';
import { locales, localeConfig, type Locale } from '@/lib/i18n/config';
import { Button } from '@/components/ui/Button';
import { useLanguagePersistence } from './useLanguagePersistence';

// Helper function to validate locale
const isValidLocale = (locale: string): locale is Locale => {
  return locales.includes(locale as Locale);
};

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLocale }) => {
  const t = useTranslations('common');
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocale, setSelectedLocale] = useState<Locale>(() => {
    // Initialize state on client side only to prevent hydration mismatch
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('preferredLocale');
      if (savedLocale && isValidLocale(savedLocale)) {
        return savedLocale as Locale;
      }
    }
    return currentLocale;
  });
  const [, savePreferredLocale] = useLanguagePersistence(currentLocale);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update selected locale when current locale changes
  useEffect(() => {
    setSelectedLocale(currentLocale);
  }, [currentLocale]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocaleChange = (locale: Locale) => {
    // Update the URL to reflect the new locale
    const newPath = pathname.replace(/^\/[^\/]+/, `/${locale}`);
    router.push(newPath);

    // Store user preference using the hook
    savePreferredLocale(locale);

    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Get the native name of the current language
  const currentLanguageName = localeConfig[selectedLocale]?.nativeName || selectedLocale;

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={t('languageSwitcher.ariaLabel') || 'Change language'}
        className="flex items-center gap-2 text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))] relative z-10"
      >
        <Globe className="h-5 w-5" aria-hidden="true" />
        <span className="hidden sm:inline-block text-sm">{currentLanguageName}</span>
      </Button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-48 bg-[hsl(var(--color-background))] border border-[hsl(var(--color-border))] rounded-xl shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
          role="menu"
        >
          <ul className="py-1 max-h-64 overflow-y-auto">
            {locales.map((locale) => {
              const localeInfo = localeConfig[locale];
              return (
                <li key={locale}>
                  <button
                    onClick={() => handleLocaleChange(locale)}
                    className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 transition-colors ${
                      locale === selectedLocale
                        ? 'bg-[hsl(var(--color-primary))/0.1] text-[hsl(var(--color-primary))]'
                        : 'text-[hsl(var(--color-foreground))] hover:bg-[hsl(var(--color-muted))]'
                    }`}
                    role="menuitem"
                    aria-checked={locale === selectedLocale}
                  >
                    <span>{localeInfo.nativeName}</span>
                    <span className="text-xs text-[hsl(var(--color-muted-foreground))] ml-auto">
                      {localeInfo.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};