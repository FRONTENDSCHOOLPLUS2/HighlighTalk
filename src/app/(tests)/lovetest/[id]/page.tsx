import Script from 'next/script';
import ScoreSection from './components/ScoreSection';
import './_LoveTestResultPage.scss';

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
