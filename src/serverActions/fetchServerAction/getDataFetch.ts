'use server';

import { auth } from '@/auth';
import { revalidateTag } from 'next/cache';

const LIMIT = process.env.NEXT_PUBLIC_LIMIT;
const DELAY = process.env.NEXT_PUBLIC_DELAY;
const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

// 게시물 하나 가져오기
export async function getPostData(id: string) {
  const session = await auth();
  const accessToken = session?.accessToken;
  const url = `${SERVER}/posts/${id}?type=comm`;

  try {
    const res = await fetch(url, {
      method: 'GET',
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
    revalidateTag('posts');
  }
}

// 게시물 전체 가져오기
export async function fetchPosts(type: string | undefined, page?: string, keyword?: string) {
  const params = new URLSearchParams();

  type && params.set('type', type);
  page && params.set('page', page);
  keyword && params.set('keyword', keyword);
  LIMIT && params.set('limit', LIMIT);
  DELAY && params.set('delay', DELAY);
  params.toString();

  const url = `${SERVER}/posts?${params.toString()}`;
  const tags = ['posts?type=comm'];
  if (type) tags.push(type);

  const res = await fetch(url, {
    headers: {
      'client-id': `${CLIENT_ID}`,
    },
    next: {
      tags,
      revalidate: 50,
    },
  });
  const resJson = await res.json();

  return resJson;
}
