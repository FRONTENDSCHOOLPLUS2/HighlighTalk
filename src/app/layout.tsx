import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google'; // Import the Noto Sans font
import Script from 'next/script';

import '@/styles/reset.css';
import '@/styles/variable.css';
import '@/styles/_variable.scss';
import '@/styles/common.css';
import '@/styles/responsible.css';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import { SessionProvider } from './providers';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-sans',
});

export const metadata: Metadata = {
  title: '하이라이톡',
  description: '하이라이톡 | AI 기반 톡방 분석 서비스',
  icons: {
    icon: '/image/icon_blue_s.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={notoSans.className}>
        <SessionProvider>
          <Header />
          <main className="containerLayout">{children}</main>
          <Footer />
        </SessionProvider>
        <Script src="https://cdn.iamport.kr/v1/iamport.js"></Script>
      </body>
    </html>
  );
}

// import type { Metadata } from 'next';
// import localFont from 'next/font/local';

// import '@/styles/reset.css';
// import '@/styles/variable.css';
// import '@/styles/_variable.scss';
// import '@/styles/common.css';
// import '@/styles/responsible.css';
// import Header from '@/components/layout/Header/Header';
// import Providers from './providers';
// import ClientUserUpdater from '@/components/ClientUserUpdater/ClientUserUpdater';
// import { auth } from '@/auth';

// const pretendard = localFont({
//   src: '../../public/static/font/PretendardVariable.woff2',
//   display: 'swap',
//   weight: '45 920',
//   variable: '--font-pretendard',
// });

// export const metadata: Metadata = {
//   title: '하이라이톡',
//   description: '하이라이톡 | 메인페이지',
// };
// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="ko">
//       <body className={pretendard.className}>
//         <Providers>
//           <main className="containerLayout">
//             <Header />
//             {children}
//           </main>
//           <ClientUserUpdater />
//         </Providers>
//       </body>
//     </html>
//   );
// }
