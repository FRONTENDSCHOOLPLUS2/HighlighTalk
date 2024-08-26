import Script from 'next/script';
import './_LoveTestResultPage.scss';
import { LoveTestData } from '@/types/test';

import ScoreSection from './components/ScoreSection/ScoreSection';
import SummarySection from './components/SummarySection/SummarySection';
import LoversComparisonSection from './components/LoversComparisonSection/LoversComparisonSection';
import TopicsSection from './components/TopicsSection/TopicsSection';
import PersonalInterestSection from './components/PersonalInterestSection/PersonalInterestSection';
import ShareSection from '@/app/(tests)/components/ShareSection/ShareSection';
import PopularWordSection from '../../freetest/[id]/components/PopularWordSection/PopularWordSection';

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const SERVER_URL = process.env.NEXT_PUBLIC_API_SERVER;

const getData = async (id: string) => {
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
    // NOTE post type "lovetest"로 들어가게 개발되엇을 경우 주석 해제
    // if (data.item.type !== 'lovetest') {
    //   throw new Error('Error 404: 잘못된 접근입니다.');
    // }
    console.log(data.item);
    return data.item.extra as LoveTestData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

async function LoveTestResultPage({ params }: { params: { id: string } }) {
  const item = await getData(params.id);

  if (item === null || item === undefined) {
    throw new Error('잘못된 접근입니다.');
  }

  const summary = item?.relationshipAnalysis?.summary || '';
  const analysis = item?.relationshipAnalysis?.analysis[0];
  const interestData = analysis?.interestedAbout;
  const names = analysis?.names || '';

  console.log(interestData);

  return (
    <article className="analysis-result love">
      <Script
        id="kakao-script"
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
        integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      ></Script>
      {summary && <SummarySection names={names} summary={summary} />}
      {analysis?.compatibilityScore && (
        <ScoreSection
          names={names}
          score={analysis?.compatibilityScore}
          reason={analysis?.reason}
          couple={analysis?.relationshipProbability?.becomeCouple}
          marriage={analysis?.relationshipProbability?.marriageProbability}
        />
      )}
      {analysis?.betterLover && (
        <LoversComparisonSection names={names} betterLover={analysis?.betterLover} />
      )}
      {analysis?.personalFactors && <TopicsSection personalFactors={analysis?.personalFactors} />}
      {interestData && <PersonalInterestSection interestedAbout={interestData} />}
      {analysis?.mostWords?.topWords && <PopularWordSection data={analysis?.mostWords?.topWords} />}
      <ShareSection />
    </article>
  );
}

export default LoveTestResultPage;
