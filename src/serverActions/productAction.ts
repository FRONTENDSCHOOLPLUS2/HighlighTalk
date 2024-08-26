'use server';

import { auth, update } from '@/auth';

const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

export async function fetchProductInfo(id: string, newCoin: number) {
  const session = await auth();

  const res = await fetch(`${API_SERVER}/codes/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'client-id': `${CLIENT_ID}`,
    },
  });

  return res;
}
