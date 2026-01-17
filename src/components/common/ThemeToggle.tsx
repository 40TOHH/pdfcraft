'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

/**
 * Компонент переключения темы (светлая/темная)
 * Предоставляет интерактивный элемент для переключения между светлой и темной темами
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const handleClick = () => {
    toggleTheme();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  };

  return (
    <button
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={
        theme === 'dark'
          ? 'Switch to light theme'
          : 'Switch to dark theme'
      }
      className="
        relative
        inline-flex
        items-center
        justify-center
        rounded-full
        p-2
        transition-colors
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-[hsl(var(--color-primary))]
        hover:bg-[hsl(var(--color-muted))]
        text-[hsl(var(--color-foreground))]
      "
      role="switch"
      aria-checked={theme === 'dark'}
      type="button"
    >
      {theme === 'dark' ? (
        <Sun
          className="h-5 w-5 text-[hsl(var(--color-foreground))]"
          aria-hidden="true"
        />
      ) : (
        <Moon
          className="h-5 w-5 text-[hsl(var(--color-foreground))]"
          aria-hidden="true"
        />
      )}
      <span className="sr-only">
        {theme === 'dark' ? 'Light theme active' : 'Dark theme active'}
      </span>
    </button>
  );
}