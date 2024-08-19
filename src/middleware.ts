import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './auth';

// TODO - 현재 lovetest 로그인만 되면 접근 가능함 유료 결제에 대한 접근 수정필요

const matchersForSignIn = ['/signup/*', '/login/*'];
const matchersForAuth = ['/mypage/*', '/charge/*', '/charge'];
const matchersForTest = ['/freetest', '/lovetest'];

export const middleware = async (request: NextRequest) => {
  const mySession = await auth();
  const pathname = request.nextUrl.pathname;

  // NOTE - 로그인 후 회원가입 및 로그인 페이지 접근 제어
  const isMatchForSignIn = matchersForSignIn.some((element) => element.includes(pathname));
  if (isMatchForSignIn && mySession) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // NOTE - 인증이 필요한 페이지 접근 제어
  const isMatchForAuth = matchersForAuth.some((element) => element.includes(pathname));
  if (isMatchForAuth) {
    return mySession ? NextResponse.next() : NextResponse.redirect(new URL('/login', request.url));
  }

  // NOTE - TEST 페이지들 선택적 접근 제어

  for (const matcher of matchersForTest) {
    if (request.nextUrl.pathname.startsWith(matcher)) {
      // 접근 허용 경로
      if (pathname === matcher) {
        return NextResponse.next();
      }
      // /matcher/ 다음에 어떤 값이 붙었음 (결과 페이지) + 로그인되어있지 않으면 접근 못하도록
      const regex = new RegExp(`^${matcher}/\\d+$`);
      if (regex.test(pathname) && !mySession) {
        console.log('test,', regex.test(pathname));
        return NextResponse.rewrite(new URL('/login', request.url));
      }
    }
  }
};

export const config = {
  matcher: [
    '/login',
    '/signup',
    '/mypage',
    '/freetest',
    '/freetest/:path*',
    '/lovetest/',
    '/lovetest/:path*',
    '/charge',
  ],
};
