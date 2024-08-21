'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { useSession } from 'next-auth/react';

function ClientUserUpdater() {
  const { data: session, status } = useSession();

  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    if (status === 'authenticated') {
      setUser(session.user!);
    } else {
      clearUser();
    }
  }, [session, setUser, clearUser]);

  return null;
}

export default ClientUserUpdater;
