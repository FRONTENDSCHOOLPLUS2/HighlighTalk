import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import GoogleProvider from 'next-auth/providers/google';

const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

// NOTE -NextAuth에서 사용할 옵션을 모듈화하여 내보냄
const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const response = await fetch(`${API_SERVER}/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'client-id': `${CLIENT_ID}`,
          },
          body: JSON.stringify(credentials),
        });

        if (!response.ok) {
          console.error('로그인 실패', response.status, response.statusText);
          return null;
        }

        const responseData = await response.json();
        console.log('resJson >> 됐잔아 ', responseData);

        if (responseData.ok) {
          console.log('🪪 user정보 ->', responseData.item);
          const user = responseData.item;

          return {
            id: user._id,
            name: user.name,
            email: user.email,
            loginType: user.loginType,
            accessToken: user.token?.accessToken!,
            refreshToken: user.token?.refreshToken!,
          };
        } else {
          return null;
        }
      },
    }),
    NaverProvider({
      clientId: process.env.KAKAO_CLIENT_ID ?? '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET ?? '',
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID ?? '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET ?? '',
    }),
    GoogleProvider({
      clientId: process.env.KAKAO_CLIENT_ID ?? '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET ?? '',
    }),
  ],

  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24,
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
