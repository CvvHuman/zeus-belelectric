import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ZEUS - Электромонтаж под ключ. От розеток до щитов',
  description: 'Профессиональный монтаж под ключ. От розеток до щитов. Работаем по ГОСТ, договору и с гарантией 2 года.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  );
}