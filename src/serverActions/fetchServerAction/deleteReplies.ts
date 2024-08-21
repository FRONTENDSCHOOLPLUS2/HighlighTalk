'use server';

import { auth } from '@/auth';
import { revalidateTag } from 'next/cache';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

export async function deleteReplies(id: string, replyId: string) {
  const session = await auth();
  const accessToken = session?.accessToken;
  const url = `${SERVER}/posts/${id}/replies/${replyId}`;

  console.log('url url ru', url);

  try {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Client-ID': `${CLIENT_ID}`,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log('res', res);

    if (!res.ok) {
      console.error(`Error: ${res.status} ${res.statusText}`);
      return null;
    }

    const resJson = await res.json();

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
    revalidateTag(`/posts/${id}`);
  }
}
