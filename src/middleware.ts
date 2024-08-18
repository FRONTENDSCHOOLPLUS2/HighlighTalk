import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './auth';

// TODO - 현재 테스트 클릭시 게스트 상태이면 Login 안내 모달 없이 /login 페이지로 리다이렉트
// 모달 띄워서 안내하도록 추가해야함

const matchersForSignIn = ['/signup/*', '/login/*'];
const matchersForAuth = ['/mypage/*', '/charge/*', '/freetest/*', '/lovetest/*', '/charge'];

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
};

export const config = {
  matcher: ['/login', '/signup', '/mypage', '/freetest', '/lovetest/', '/charge'],
};
