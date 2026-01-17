import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher/LanguageSwitcher';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(() => '/en/some-page'),
}));

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'common.languageSwitcher.ariaLabel': 'Change language',
      'common.selectLanguage': 'Select Language',
    };
    return translations[key] || key;
  },
}));

describe('LanguageSwitcher', () => {
  const mockPush = jest.fn();
  
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders the current language', () => {
    render(<LanguageSwitcher currentLocale="en" />);
    
    expect(screen.getByLabelText(/Change language/i)).toBeInTheDocument();
    expect(screen.getByText(/English/i)).toBeInTheDocument(); // Current language should be displayed
  });

  it('opens the language dropdown when clicked', () => {
    render(<LanguageSwitcher currentLocale="en" />);
    
    const button = screen.getByLabelText(/Change language/i);
    fireEvent.click(button);
    
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('displays all supported languages', async () => {
    render(<LanguageSwitcher currentLocale="en" />);
    
    const button = screen.getByLabelText(/Change language/i);
    fireEvent.click(button);
    
    // Wait for the dropdown to appear
    await waitFor(() => {
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });
    
    // Check that some of the supported languages are present
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('日本語')).toBeInTheDocument(); // Japanese
    expect(screen.getByText('한국어')).toBeInTheDocument(); // Korean
    expect(screen.getByText('Español')).toBeInTheDocument(); // Spanish
  });

  it('changes language and updates URL when a language is selected', async () => {
    render(<LanguageSwitcher currentLocale="en" />);
    
    const button = screen.getByLabelText(/Change language/i);
    fireEvent.click(button);
    
    // Wait for the dropdown to appear
    await waitFor(() => {
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });
    
    // Click on Spanish
    const spanishOption = screen.getByText('Español');
    fireEvent.click(spanishOption);
    
    // Verify that router.push was called with the correct path
    expect(mockPush).toHaveBeenCalledWith('/es/some-page');
    
    // Verify that the language preference was saved to localStorage
    expect(localStorage.getItem('preferredLocale')).toBe('es');
  });

  it('closes the dropdown when clicking outside', () => {
    render(<LanguageSwitcher currentLocale="en" />);
    
    const button = screen.getByLabelText(/Change language/i);
    fireEvent.click(button);
    
    // Verify dropdown is open
    expect(screen.getByRole('menu')).toBeInTheDocument();
    
    // Simulate click outside
    fireEvent.mouseDown(document.body);
    
    // Verify dropdown is closed
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});