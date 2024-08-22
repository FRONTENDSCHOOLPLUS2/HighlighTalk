import { NextRequest, NextResponse } from 'next/server';
import FetchData from '@/hooks/useGpt';
import { auth } from '@/auth';

const SERVER_URL = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

export async function POST(req: NextRequest) {
  const session = await auth();
  const accessToken = session?.accessToken;
  const { prompt, message } = await req.json();

  try {
    const data = await FetchData(prompt, message);
    console.log('Fetched Data:', data);

    if (data?.choices?.length > 0) {
      let fetchedContent = data.choices[0].message.content;
      // ```json``` 등 불필요한 요소를 제거
      fetchedContent = fetchedContent.replace(/```json\n|```/g, '').trim();
      // fetchedContent를 자바스크립트 객체로 파싱
      let parsedContent;
      try {
        parsedContent = JSON.parse(fetchedContent);
      } catch (error) {
        console.error('JSON Parsing Error:', error);
        return NextResponse.json({ error: 'Invalid JSON format' }, { status: 400 });
      }

      // const path = req.nextUrl.pathname; // 요청의 경로
      // console.log('pathtl', path);
      // let dynamicType = 'freetest'; // 기본값 설정

      // if (path.includes('/freetest')) {
      //   dynamicType = 'freetest';
      // } else if (path.includes('/lovetest')) {
      //   dynamicType = 'lovetest';
      // }

      // 파싱된 객체를 서버에 다시 전송
      const secondResponse = await fetch(`${SERVER_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'client-id': `${CLIENT_ID}`,
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          extra: parsedContent,
          // title: `${parsedContent.result?.peoples[0]}님 외 ${parsedContent.result?.peoples?.length - 1}명의 대화`,
          // type: dynamicType,
        }),
      });

      const secondData = await secondResponse.json();
      console.log('Second Response Data:', secondData);
      return NextResponse.json({ data, secondData }, { status: 200 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
