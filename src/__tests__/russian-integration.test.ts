import { describe, it, expect } from 'vitest';
import { locales, localeConfig, isValidLocale, getLocalizedPath } from '@/lib/i18n/config';
import { SUPPORTED_LOCALES } from '@/lib/i18n';

describe('Русский язык интеграция', () => {
  it('должен включать русский язык в список поддерживаемых локалей', () => {
    expect(locales).toContain('ru');
  });

  it('должен включать русский язык в список поддерживаемых локалей в i18n utils', () => {
    expect(SUPPORTED_LOCALES).toContain('ru');
  });

  it('должен иметь корректную конфигурацию для русского языка', () => {
    expect(localeConfig.ru).toBeDefined();
    expect(localeConfig.ru.name).toBe('Russian');
    expect(localeConfig.ru.nativeName).toBe('Русский');
    expect(localeConfig.ru.direction).toBe('ltr');
    expect(localeConfig.ru.dateFormat).toBe('DD.MM.YYYY');
  });

  it('должен корректно проверять валидность русской локали', () => {
    expect(isValidLocale('ru')).toBe(true);
  });

  it('должен корректно генерировать пути для русской локали', () => {
    const path = getLocalizedPath('/tools/merge-pdf', 'ru');
    expect(path).toBe('/ru/tools/merge-pdf');
  });
});