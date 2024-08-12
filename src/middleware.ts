import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './auth';

// FIXME - 개발하면서 config, matchersForAuth에 접근 제어 페이지들 더 추가하기
// NOTE - login 페이지 개발 완료 전 접근 편의를 위해 우선 주석 처리했습니다.
const matchersForAuth = ['/signup/*', '/login/*'];

export const middleware = async (request: NextRequest) => {
  // const mySession = await auth();
  // const pathname = request.nextUrl.pathname;
  // const isMatchForAuth = matchersForAuth.some((element) => element.includes(pathname));
  // if (isMatchForAuth && mySession) {
  //   return NextResponse.redirect(new URL('/', request.url));
  // }
};

export const config = {
  matcher: ['/login', '/signup'],
};
