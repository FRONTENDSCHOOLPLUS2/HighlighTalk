import { Metadata } from 'next';
import LoveTestContainer from './LoveTestContainer';
import './_loveTestPage.scss';

// 서버컴포넌트로 분리

export const metadata: Metadata = {
  title: '하이라이톡 | 연애 테스트',
  description: 'Chat GPT API 기반 대화내용 분석 서비스',
  keywords: 'highlightalk',
};

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const SERVER_URL = process.env.NEXT_PUBLIC_API_SERVER;

// 횟수 조회 함수
const getData = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/posts`, {
      headers: {
        'Content-Type': 'application/json',
        'client-id': `${CLIENT_ID}`,
      },
    });

    if (!response.ok) {
      return null;
    }
    const result = await response.json();
    return result.item;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

async function TestPage() {
  const data = await getData();
  const totalCount = data[0]?._id;
  // console.log('xXxxxx', totalCount);
  return <LoveTestContainer totalCount={totalCount} />;
}

export default TestPage;
