import './globals.css';
import type { Metadata } from 'next';
import { DM_Sans, Space_Mono } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-dm-sans',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
});

export const metadata: Metadata = {
  title: 'FUELBAR — Real Protein. Zero Nonsense.',
  description: 'Premium Gen-Z protein bars. 22g protein, 5 ingredients only. Looks like dessert. Works like fuel.',
  openGraph: {
    images: [
      {
        url: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=1200',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=1200',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${spaceMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: ':root { --font-bebas: "Bebas Neue", sans-serif; }' }} />
      </head>
      <body className={dmSans.className}>{children}</body>
    </html>
  );
}
