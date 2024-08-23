'use server';

import { auth } from '@/auth';
import { revalidateTag } from 'next/cache';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

interface PostData {
  title: string;
  content: string;
  type: string;
}

export async function sendPostData(postData: PostData) {
  const session = await auth();
  const accessToken = session?.accessToken;
  const url = `${SERVER}/posts`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Client-ID': `${CLIENT_ID}`,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(postData),
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
      console.error('에러다:', resJson);
      return null;
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}
