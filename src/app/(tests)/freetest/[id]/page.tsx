'use server';

import Mbti from '@/components/Mbti/Mbti';

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const SERVER_URL = process.env.NEXT_PUBLIC_API_SERVER;
export async function getData(id: string) {
  try {
    const response = await fetch(`${SERVER_URL}/posts/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'client-id': `${CLIENT_ID}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const item = await getData(params.id);
  const extraItem = item?.item?.extra;

  if (!extraItem) {
    return <div>페이지를 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <Mbti extraItem={extraItem} />
    </div>
  );
}
