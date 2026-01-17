'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Hook для получения контекста темы
 * @returns Объект с текущей темой и методами для её изменения
 * @throws Ошибка, если используется вне ThemeProvider
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark';
  storageKey?: string;
}

/**
 * Провайдер темы для всего приложения
 * Обеспечивает контекст темы и управляет переключением между светлой и темной темами
 *
 * @param children Дочерние компоненты
 * @param defaultTheme Тема по умолчанию ('light' или 'dark'), по умолчанию 'light'
 * @param storageKey Ключ для сохранения темы в localStorage, по умолчанию 'pdfcraft-theme'
 */
export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'pdfcraft-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    // На сервере возвращаем тему по умолчанию
    if (typeof window === 'undefined') {
      return defaultTheme;
    }

    // На клиенте проверяем localStorage
    const storedTheme = localStorage.getItem(storageKey);
    if (storedTheme === 'light' || storedTheme === 'dark') {
      return storedTheme;
    }

    // Если в localStorage нет значения, проверяем системные настройки
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    // Возвращаем тему по умолчанию
    return defaultTheme;
  });

  // Обновляем тему на HTML элементе и в localStorage
  useEffect(() => {
    const root = window.document.documentElement;

    // Удаляем старые классы темы
    root.classList.remove('light', 'dark');

    // Добавляем текущую тему
    root.classList.add(theme);

    // Сохраняем тему в localStorage
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  // Проверяем системные настройки при изменении
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      // Только меняем тему, если пользователь не выбрал тему вручную
      if (!localStorage.getItem(storageKey)) {
        setThemeState(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [storageKey]);

  const toggleTheme = () => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
  };

  const value = useMemo(() => ({
    theme,
    toggleTheme,
    setTheme
  }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}