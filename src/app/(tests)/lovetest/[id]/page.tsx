import Script from 'next/script';
import ScoreSection from './components/ScoreSection/ScoreSection';
import './_LoveTestResultPage.scss';
import SummarySection from './components/SummarySection/SummarySection';

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
        names={'여다희, 박수빈'}
        summary={
          '여다희와 박수빈은 서로에게 깊은 신뢰와 애정을 가지고 있는 친구 관계로 보인다. 대화에서 서로의 생일을 축하하고, 선물을 주고받으며, 서로의 일상에 관심을 가지는 모습이 나타난다. 특히, 여다희가 박수빈의 생일을 축하하며 보낸 메시지는 따뜻한 감정을 전달하고 있다. 또한, 두 사람은 함께 시간을 보내고 싶어하며, 맛있는 음식을 함께 나누고자 하는 의사를 표현한다. 서로의 건강과 안부를 걱정하는 모습도 보인다. 이러한 요소들은 두 사람의 관계가 단순한 친구 이상의 감정을 포함하고 있음을 시사한다. 대화 중에는 유머와 장난이 섞여 있어 서로의 관계가 편안하고 친밀하다는 것을 보여준다. 전반적으로, 여다희와 박수빈은 서로에게 긍정적인 영향을 주며, 앞으로도 좋은 관계를 유지할 가능성이 높다.'
        }
      />
      <ScoreSection
        names={'여다희, 박수빈'}
        score={85}
        reason={
          '서로의 일상에 관심을 가지고, 서로를 걱정하며, 유머를 주고받는 모습이 나타나 서로의 궁합이 좋다고 생각한다.'
        }
      />
    </article>
  );
}

export default LoveTestResultPage;
