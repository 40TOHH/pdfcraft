'use client';

import { ThemeProvider as PDFCraftThemeProvider } from '@/components/common/ThemeProvider';

interface ThemeWrapperProps {
  children: React.ReactNode;
}

export function ThemeWrapper({ children }: ThemeWrapperProps) {
  return (
    <PDFCraftThemeProvider>
      {children}
    </PDFCraftThemeProvider>
  );
}