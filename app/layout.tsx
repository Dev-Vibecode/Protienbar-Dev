import './globals.css';
import type { Metadata } from 'next';
import { DM_Sans, Space_Mono, Bebas_Neue } from 'next/font/google';

// DM Sans for primary UI text
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-dm-sans',
});

// Space Mono for technical/mono details
const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
});

// Bebas Neue for the bold "Gen-Z" headings
const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
});

export const metadata: Metadata = {
  title: 'Nutri Bar — Real Protein. Zero Nonsense.',
  description: 'Premium Gen-Z protein bars. 22g protein, 5 ingredients only. Looks like dessert. Works like fuel.',
  openGraph: {
    images: [{ url: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=1200' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [{ url: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=1200' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${spaceMono.variable} ${bebas.variable}`}>
      <body className={`${dmSans.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}