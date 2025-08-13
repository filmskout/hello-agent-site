'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { t, Locale } from '@/lib/i18n';

export default function Navbar({ locale }: { locale: Locale }) {
  const { theme, setTheme } = useTheme();
  const toggle = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  return (
    <nav className="flex gap-4 p-4 bg-gray-200 dark:bg-gray-800 text-sm">
      <Link href="/" className="hover:underline">{t(locale, 'dashboard')}</Link>
      <Link href="/accounts" className="hover:underline">{t(locale, 'accounts')}</Link>
      <Link href="/videos" className="hover:underline">{t(locale, 'videos')}</Link>
      <Link href="/imports" className="hover:underline">{t(locale, 'imports')}</Link>
      <Link href="/alerts" className="hover:underline">{t(locale, 'alerts')}</Link>
      <Link href="/settings" className="hover:underline">{t(locale, 'settings')}</Link>
      <button onClick={toggle} className="ml-auto px-2">🌓</button>
    </nav>
  );
}
