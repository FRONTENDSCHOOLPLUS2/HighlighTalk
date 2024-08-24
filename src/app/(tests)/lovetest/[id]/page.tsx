import Script from 'next/script';
import ScoreSection from './components/ScoreSection/ScoreSection';
import './_LoveTestResultPage.scss';
import SummarySection from './components/SummarySection/SummarySection';
import LoversComparisonSection from './components/LoversComparisonSection/LoversComparisonSection';

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
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

async function LoveTestResultPage({ params }: { params: { id: string } }) {
  const item = await getData(params.id);
  console.log('item', item);

  if (!item) {
    return <div>page를 찾을 수 없습니다.</div>;
  }

  return (
    <article className="analysis-result">
      <Script
        id="kakao-script"
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
        integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      ></Script>
      <SummarySection
        names={'여다희, 김지후'}
        summary={
          '여다희와 김지후는 서로의 일상과 관심사에 대해 활발하게 소통하며, 서로의 의견을 존중하는 관계를 형성하고 있다. 두 사람은 함께 식사 계획을 세우고, 서로의 취미와 관심사에 대해 이야기하며 친밀감을 쌓아가고 있다. 특히, 여다희는 김지후에게 자신의 고민을 털어놓고, 김지후는 여다희의 이야기에 귀 기울이며 조언을 아끼지 않는다. 이들은 서로의 건강과 안부를 챙기며, 서로의 삶에 긍정적인 영향을 미치고 있다. 또한, 두 사람은 함께 시간을 보내고 싶어하는 의사를 자주 표현하며, 이는 그들의 관계가 더욱 깊어질 가능성을 시사한다. 서로의 일에 대한 이해와 지지를 바탕으로, 이들은 앞으로도 좋은 관계를 유지할 것으로 보인다.'
        }
      />
      <ScoreSection
        names={'여다희, 김지후'}
        score={85}
        reason={
          '서로의 일상과 관심사에 대해 활발하게 소통하며, 서로의 의견을 존중하는 관계를 형성하고 있다.'
        }
        couple={70}
        marriage={50}
      />
      <LoversComparisonSection
        names={'여다희, 김지후'}
        betterLover={{
          여다희: 30,
          김지후: 70,
        }}
      />
    </article>
  );
}

export default LoveTestResultPage;
