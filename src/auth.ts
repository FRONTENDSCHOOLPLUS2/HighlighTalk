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
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        //작성
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
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
