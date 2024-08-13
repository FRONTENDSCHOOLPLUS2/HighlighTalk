import type { Metadata } from 'next';
import localFont from 'next/font/local';

import '@/styles/reset.css';
import '@/styles/variable.css';
import '@/styles/_variable.scss';
import '@/styles/common.css';
import '@/styles/responsible.css';
import Header from '@/components/layout/Header/Header';
import Providers from './providers';
import ClientUserUpdater from '@/components/ClientUserUpdater/ClientUserUpdater';
import { auth } from '@/auth';

const pretendard = localFont({
  src: '../../public/static/font/PretendardVariable.woff2',
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
        <Providers>
          <main className="containerLayout">
            <Header />
            {children}
          </main>
          <ClientUserUpdater />
        </Providers>
      </body>
    </html>
  );
}
