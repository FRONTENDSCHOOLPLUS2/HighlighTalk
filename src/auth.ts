import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import GoogleProvider from 'next-auth/providers/google';

const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const response = await fetch(`${API_SERVER}/users/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'client-id': `${CLIENT_ID}`,
            },
            body: JSON.stringify(credentials),
          });

          if (!response.ok) {
            console.error('☠️ 로그인 실패', response.status, response.statusText);
            return null; // 로그인 실패 시 null 반환
          }

          const responseData = await response.json();
          console.log('resJson >> 됐잔아 ', responseData);

          if (responseData.ok) {
            console.log('🪪 user정보 ->', responseData.item);
            const user = responseData.item;

            // 유저 정보와 토큰 NextAuth 세션에 저장
            return {
              id: user._id,
              name: user.name,
              email: user.email,
              loginType: user.loginType,
              accessToken: user.token?.accessToken!,
              refreshToken: user.token?.refreshToken!,
            };
          } else {
            console.error('로그인 실패: 응답 데이터가 OK가 아닙니다.', responseData);
            return null; // 응답 데이터가 OK가 아닐 때 null 반환
          }
        } catch (error) {
          console.error('로그인 요청 중 오류 발생:', error);
          return null; // 요청 중 오류 발생 시 null 반환
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
  // NOTE - 세션 전략으로 JWT, 최대 수명 24시간
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24,
  },

  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user }) {
      console.log('signIn.user', user);
      return true;
    },

    //JWT 토큰에 사용자 정보를 저장 user 객체가 있을 경우 토큰에 정보를 추가한다

    async jwt({ token, user }) {
      console.log('🪪JWT.user', user);

      if (user) {
        token.id = user.id;
        token.type = user.type;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },

    // 세션을 설정합니다 JWT에서 정보를 가져와 세션에 추가합니다.
    async session({ session, token }) {
      console.log('session.user', session.user);
      session.user.id = token.id as string;
      session.user.type = token.type as string;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
