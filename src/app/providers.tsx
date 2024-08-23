'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { Session } from 'next-auth';
import { getSession } from '@/serverActions/authAction';

// NOTE - 세션을 반응형으로 작업하기 위한 Provder

const SessionContent = createContext<Session | null>(null);

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    getSession().then((res) => {
      setSession(res);
    });
  }, [pathname]); // 페이지를 이동할 때마다 세션을 갱신

  return <SessionContent.Provider value={session}>{children}</SessionContent.Provider>;
};

// 클라이언트 컴포넌트용 커스텀 훅
export const useSession = () => {
  return useContext(SessionContent);
};
