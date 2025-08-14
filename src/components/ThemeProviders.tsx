'use client';

import type { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';

export default function ThemeProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {children}
    </ThemeProvider>
  );
}
