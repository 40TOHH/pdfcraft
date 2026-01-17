import { renderHook, act } from '@testing-library/react';
import { useLanguagePersistence } from '@/components/common/LanguageSwitcher/useLanguagePersistence';

describe('useLanguagePersistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns the default locale when no preference is saved', () => {
    const { result } = renderHook(() => useLanguagePersistence('en'));

    expect(result.current[0]).toBe('en');
  });

  it('returns the saved locale from localStorage', () => {
    localStorage.setItem('preferredLocale', 'es');

    const { result } = renderHook(() => useLanguagePersistence('en'));

    expect(result.current[0]).toBe('es');
  });

  it('ignores invalid locales from localStorage', () => {
    localStorage.setItem('preferredLocale', 'invalid-locale');

    const { result } = renderHook(() => useLanguagePersistence('en'));

    expect(result.current[0]).toBe('en'); // Should fall back to default
  });

  it('saves locale to localStorage when saveLocale is called', () => {
    const { result } = renderHook(() => useLanguagePersistence('en'));

    act(() => {
      result.current[1]('fr'); // Call saveLocale with 'fr'
    });

    expect(result.current[0]).toBe('fr');
    expect(localStorage.getItem('preferredLocale')).toBe('fr');
  });

  it('does not save invalid locales', () => {
    const { result } = renderHook(() => useLanguagePersistence('en'));

    act(() => {
      result.current[1]('invalid-locale'); // Try to save invalid locale
    });

    expect(result.current[0]).toBeNull(); // State remains unchanged
    expect(localStorage.getItem('preferredLocale')).toBeNull(); // Nothing saved to localStorage
  });
});