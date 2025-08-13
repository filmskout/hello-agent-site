import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";
import { defaultLocale, Locale } from "@/lib/i18n";
import ThemeProviders from "@/components/ThemeProviders";

export const metadata: Metadata = {
  title: "Social Pulse CN",
  description: "Social metrics dashboard",
  icons: {
    icon: "/favicon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const langCookie = (await cookies()).get("lang")?.value as Locale | undefined;
  const locale = langCookie || defaultLocale;
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="antialiased min-h-screen">
        <ThemeProviders>
          <Navbar locale={locale} />
          <main className="p-4">{children}</main>
        </ThemeProviders>
      </body>
    </html>
  );
}
