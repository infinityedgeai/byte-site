import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { MenuBar } from '@/components/MenuBar';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://byte-eng.dev'),
  title: {
    default: 'Byte Engineering',
    template: '%s | Byte Engineering',
  },
  description:
    'Byte Engineering — software engineering, web development, and case studies.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Byte Engineering',
    description:
      'Byte Engineering — software engineering, web development, and case studies.',
    url: 'https://byte-eng.dev',
    siteName: 'Byte Engineering',
    images: ['/byte.png'],
    type: 'website',
  },
  robots: { index: true, follow: true },
  verification: {
    google: 'rtO-We4wLkPk5iMbkpoU7cdOEYqpCZdqNvon-UIjGtg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MenuBar />
          <main className="pt-20">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
