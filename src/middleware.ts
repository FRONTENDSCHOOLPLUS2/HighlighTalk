import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './auth';

// TODO - 현재 테스트 클릭시 게스트 상태이면 Login 안내 모달 없이 /login 페이지로 리다이렉트
// 모달 띄워서 안내하도록 추가해야함

const matchersForSignIn = ['/signup/*', '/login/*'];
const matchersForAuth = ['/mypage/*', '/charge/*', '/freetest/*', '/lovetest/*'];

export const middleware = async (request: NextRequest) => {
  const mySession = await auth();
  const pathname = request.nextUrl.pathname;
  // const step = request.nextUrl.searchParams.get('step');

  // NOTE - 로그인 후 회원가입 및 로그인 페이지 접근 제어
  const isMatchForSignIn = matchersForSignIn.some((element) => element.includes(pathname));
  if (isMatchForSignIn && mySession) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // NOTE - 인증이 필요한 페이지 접근 제어
  // FIXME - 결과페이지 로그인 유무만 제어 중, 본인의 결과인지에 대해 추가 보호 필요함
  const isMatchForAuth = matchersForAuth.some((element) =>
    pathname.startsWith(element.replace('*', ''))
  );
  if (isMatchForAuth) {
    return mySession ? NextResponse.next() : NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    '/login',
    '/signup',
    '/mypage',
    '/freetest',
    '/lovetest',
    '/charge',
    '/freetest/:path*',
  ],
};
