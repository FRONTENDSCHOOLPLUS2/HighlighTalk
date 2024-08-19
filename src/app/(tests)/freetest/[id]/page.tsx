'use server';

import PopularWordSection from './components/PopularWordSection/PopularWordSection';
import ThemeSection from './components/ThemeSection/ThemeSection';
import MbtiSection from './components/MbtiSection/MbtiSection';
import TopRatedTalkerSection from './components/TopRatedTalkerSection/TopRatedTalkerSection';
import ShareSection from './components/ShareSection/ShareSection';
import Script from 'next/script';
import './_FreeTestResultPage.scss';

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const SERVER_URL = process.env.NEXT_PUBLIC_API_SERVER;

// NOTE 채팅 주제 요약 더미데이터
const chatThemeData = [
  {
    title: '대화내역 분석을 주제로 한 대화',
    content:
      '하이라이톡을 어떻게 개발할 것인가에 대해 의논했어요. 여다희님이 스타일링이 어렵다고 말하며 UI 개선을 제안하고, 김설하님과 윤우중님이 거부했어요.',
  },
  {
    title: '대화내역 분석을 주제로 한 대화',
    content:
      '하이라이톡을 어떻게 개발할 것인가에 대해 의논했어요. 여다희님이 스타일링이 어렵다고 말하며 UI 개선을 제안하고, 김설하님과 윤우중님이 거부했어요.',
  },
  {
    title: '대화내역 분석을 주제로 한 대화',
    content:
      '하이라이톡을 어떻게 개발할 것인가에 대해 의논했어요. 여다희님이 스타일링이 어렵다고 말하며 UI 개선을 제안하고, 김설하님과 윤우중님이 거부했어요.',
  },
];

// NOTE 가장 많이 말한 사람 더미데이터
const circlePackingData = [
  { key: '김설하', value: 15 },
  { key: '윤우중', value: 30 },
  { key: '여다희', value: 25 },
  { key: '정길용', value: 10 },
  { key: '정현주', value: 9 },
];

// NOTE 가장 많이 나온 단어 더미데이터
const wordCloudData = [
  { key: '중우', value: 10 },
  { key: '짱이다', value: 15 },
  { key: '울랄라', value: 30 },
  { key: '얍', value: 100 },
  { key: '응', value: 80 },
  { key: '바빠', value: 41 },
  { key: '나가라', value: 10 },
  { key: '어떻게', value: 20 },
  { key: '되는거지', value: 10 },
  { key: '야', value: 40 },
  { key: '아니야', value: 30 },
  { key: '덤벼', value: 60 },
];

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
    <article className="result">
      <Script
        id="kakao-script"
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
        integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      ></Script>
      <ThemeSection data={chatThemeData} />
      <TopRatedTalkerSection data={circlePackingData} />
      <MbtiSection data={extraItem.result} />
      <PopularWordSection data={wordCloudData} />
      <ShareSection />
    </article>
  );
}
