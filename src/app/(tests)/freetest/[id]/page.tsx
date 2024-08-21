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

type EmotionType = '기쁨' | '슬픔' | '불안' | '놀람' | '분노';

interface FreeTestResultData {
  topic: { summary: { title: string; content: string }[] };
  mbti: {
    analysis: {
      names: string;
      value: string;
      reason: string;
      ability: { energy: number; social: number; intelligence: number }[];
      etc: string[];
    }[];
  };
  talkCount: {
    counts: {
      [key: string]: number;
    };
  };
  mostWords: {
    topWords: {
      [key: string]: number;
    };
  };
  peoples: string[];
  talkbangEmotion: {
    [key in EmotionType]: number;
  };
}

const getData = async (id: string): Promise<FreeTestResultData | null> => {
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

    const result = await response.json();
    return result.item.extra.result;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getData(params.id);
  const { topic, mbti, talkCount, mostWords } = data!;

  if (!data) {
    throw new Error('잘못된 접근입니다.');
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
      <ThemeSection data={topic.summary} />
      <TopRatedTalkerSection data={talkCount.counts} />
      <MbtiSection data={mbti.analysis} />
      <PopularWordSection data={mostWords.topWords} />
      <ShareSection />
    </article>
  );
}
