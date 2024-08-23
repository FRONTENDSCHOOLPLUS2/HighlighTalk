'use server';

import { auth } from '@/auth';
import { revalidateTag } from 'next/cache';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

export async function getNoticeData() {
  const session = await auth();
  const accessToken = session?.accessToken;
  let url = `${SERVER}/posts?type=notice`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Client-ID': `${CLIENT_ID}`,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      console.error(`Error: ${res.status} ${res.statusText}`);
      return null;
    }

    const resJson = await res.json();
    revalidateTag('posts');

    if (resJson && resJson.item) {
      return resJson.item;
    } else {
      console.error('데이터 전송이상:', resJson);
      return null;
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  } finally {
    revalidateTag('posts');
  }
}
