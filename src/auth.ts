import NextAuth, { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import GithubProvider from 'next-auth/providers/github';
import KakaoProvider from 'next-auth/providers/kakao';
import GoogleProvider from 'next-auth/providers/google';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { OAuthUser, RefreshTokenRes, SignupResponsType } from './types';
import { loginOAuth, signupWithOAuth } from './serverActions/userActions';
import { fetchAccessToken } from './utils/fetchToken';

const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

export const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: update,
} = NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials): Promise<User | null> {
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
            return null;
          }

          const resJson = await response.json();

          if (resJson.ok) {
            console.log('🪪 user정보->', resJson.item);
            const user = resJson.item;

            // 유저 정보와 토큰 NextAuth 세션에 저장
            return {
              id: user._id,
              name: user.name,
              email: user.email,
              type: user.type,
              coin: user.extra.coin,
              loginType: user.loginType,
              accessToken: user.token?.accessToken,
              refreshToken: user.token?.refreshToken,
            };
          } else {
            console.error('로그인 실패: 응답 데이터가 OK가 아닙니다.', response);
            return null; // 응답 데이터가 OK가 아닐 때 null 반환
          }
        } catch (error) {
          console.error('로그인 요청 중 오류 발생:', error);
          return null; // 요청 중 오류 발생 시 null 반환
        }
      },
    }),

    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID ?? '',
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? '',
    }),
    KakaoProvider({
      clientId: process.env.AUTH_KAKAO_ID ?? '',
      clientSecret: process.env.AUTH_KAKAO_SECRET ?? '',
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID ?? '',
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  // NOTE - 세션 전략으로 JWT, 최대 수명 24시간
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24,
  },

  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('callbacks.signIn', user, account, profile);
      switch (account?.provider) {
        case 'credentials':
          console.log('🪪 id/pwd 로그인', user);
          break;
        case 'google':
        case 'github':
        case 'kakao':
          console.log('🪪 OAuth 로그인', user);

          // DB에서 id를 조회해서 있으면 로그인 처리를 없으면 자동 회원 가입 후 로그인 처리
          let userInfo: SignupResponsType | null = null;
          try {
            // 자동 회원 가입 + 코인 0 init
            const newUser: OAuthUser = {
              type: 'user',
              loginType: account.provider,
              name: user.name!,
              email: user.email!,
              image: user.image!,
              extra: { ...profile, providerAccountId: account.providerAccountId, coin: 0 },
            };

            // 이미 가입된 회원이면 회원가입이 되지 않고 에러를 응답하므로 무시하면 됨
            const result = await signupWithOAuth(newUser);
            console.log('회원 가입', result);

            // 자동 로그인
            const resData = await loginOAuth(account.providerAccountId);
            if (resData.ok) {
              userInfo = resData.item;
              console.log(userInfo);
            } else {
              // API 서버의 에러 메시지 처리
              throw new Error(resData.message);
            }
          } catch (err) {
            console.error(err);
            throw err;
          }

          user.id = String(userInfo?._id);
          user.type = userInfo?.type!;
          user.accessToken = userInfo?.token!.accessToken as string;
          user.refreshToken = userInfo?.token!.refreshToken as string;
          user.coin = userInfo?.extra!.coin;

          break;
      }
      return true;
    },

    //JWT 토큰에 사용자 정보를 저장 user 객체가 있을 경우 토큰에 정보를 추가
    async jwt({ token, user, session, trigger }) {
      if (user) {
        token.id = user.id;
        token.type = user.type;
        token.coin = user.coin;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }

      // JWT 자체의 만료 시간 추출
      const decodedToken = jwt.decode(token.accessToken) as JwtPayload | null;
      const accessTokenExpires = decodedToken?.exp ? decodedToken?.exp * 1000 : 0; // 밀리초 단위로 변환

      // 토큰 만료 확인
      const shouldRefreshToken = Date.now() > accessTokenExpires;
      if (shouldRefreshToken) {
        try {
          console.log('토큰 만료됨.', Date.now() + ' ➡️ ' + accessTokenExpires);
          const res = await fetchAccessToken(token.refreshToken);
          if (res.ok) {
            const resJson: RefreshTokenRes = await res.json();
            return {
              ...token,
              accessToken: resJson.accessToken,
            };
          } else {
            if (res.status === 401) {
              console.log('리프레시 토큰 인증 실패. 로그인 페이지로 이동', await res.json());
            }
          }
        } catch (error) {
          if (error instanceof Error) {
            console.error(error);
            return {
              ...token,
              error: error.message,
            };
          }
        }
      } else {
        // NOTE - 토큰 만료 시간 로깅 필요하다면 주석 해제해서 사용
        // console.log(`토큰 ${accessTokenExpires - Date.now()} ms 남음`);
      }
      // 세션 업데이트
      if (trigger === 'update' && session) {
        Object.assign(token, session.user);
        token.coin = session.user.coin; // 코인 수정 시 반영
      }

      return token;
    },

    // JWT에서 정보를 가져와 세션에 추가
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.type = token.type as string;
      session.user.coin = token.coin;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
});
