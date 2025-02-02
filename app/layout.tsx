import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'CookieGen - Fortune Cookie Generator',
    template: '%s | CookieGen'
  },
  description: 'Generate random fortune cookie messages instantly. Fun and inspirational quotes for daily motivation.',
  keywords: ['fortune cookie', 'random quote', 'inspiration', 'motivation', 'daily quote'],
  openGraph: {
    title: 'CookieGen - Fortune Cookie Generator',
    description: 'Generate random fortune cookie messages instantly.',
    siteName: 'CookieGen',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
