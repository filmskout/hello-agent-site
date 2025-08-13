import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes";
import { cookies } from "next/headers";
import { defaultLocale, Locale } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Social Pulse CN",
  description: "Social metrics dashboard",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const langCookie = cookies().get("lang")?.value as Locale | undefined;
  const locale = langCookie || defaultLocale;
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}> 
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Navbar locale={locale} />
          <main className="p-4">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
