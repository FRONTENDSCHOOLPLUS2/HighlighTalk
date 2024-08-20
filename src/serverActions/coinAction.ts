'use server';

import { auth } from '@/auth';

const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

export async function updateCoinData(id: string, newCoin: number) {
  const bodyData = {
    extra: {
      coin: newCoin,
    },
  };

  const session = await auth();

  const res = await fetch(`${API_SERVER}/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'client-id': `${CLIENT_ID}`,
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify(bodyData),
  });

  const data = await res.json();
  console.log('updateCoinData', data);
  return data;
}
