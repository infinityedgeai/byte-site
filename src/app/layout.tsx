'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { MenuBar } from '@/components/MenuBar';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });




export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-hidden">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MenuBar />
          <main className="pt-20 overflow-hidden h-screen">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
