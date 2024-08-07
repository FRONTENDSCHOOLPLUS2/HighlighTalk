import type { Metadata } from 'next';
import localFont from 'next/font/local';

import '@/styles/reset.css';
import '@/styles/variable.css';
import '@/styles/common.css';
import '@/styles/responsible.css';
import Header from '@/components/layout/Header/Header';

const pretendard = localFont({
  src: '../static/font/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

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
      <body className={pretendard.className}>
        <main className="containerLayout">
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
