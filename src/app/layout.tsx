import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@/styles/reset.css';
import '@/styles/variable.css';
import '@/styles/common.css';
import '@/styles/responsible.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '하이라이톡',
  description: '하이라이톡 | 메인페이지',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
