// NOTE - 서버 사이드 페이지 렌더링 이전에 middleware 실행
// 사용자 로그인 여부에 따라 redirect 추가

import { NextResponse } from 'next/server';
import { auth } from './auth';

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

export const middleware = auth((req) => {
  const headers = new Headers(req.headers);
  headers.set('Content-Type', 'application/json');

  headers.set('client-id', `${CLIENT_ID}`);

  // 기타 middleware 처리들...

  return NextResponse.next({
    request: {
      headers,
    },
  });
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
