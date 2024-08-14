import './_ContentResultPage.scss';
import WordCloud from '@/components/graph/WordCloud';
import CirclePacking from '@/components/graph/CirclePacking';

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

const circlePackingData = [
  { key: '김설하', value: 15 },
  { key: '윤우중', value: 30 },
  { key: '여다희', value: 25 },
  { key: '정길용', value: 10 },
  { key: '정현주', value: 9 },
];

function ContentResultPage() {
  const getPercentage = (data: { key: string; value: number }[], value: number) => {
    let sumValue = 0;
    data.forEach((d) => {
      sumValue += d.value;
    });

    return ((value / sumValue) * 100).toFixed(0);
  };

  return (
    <article className="result">
      <section className="theme">
        <h2 className="heading-2">대화 분석 결과</h2>
        <h3 className="heading-3">대화 주제 TOP3</h3>
        <ul className="bubble-list">
          <li className="bubble-item">
            <p className="bubble-title">타이틀</p>
            <p className="bubble-text">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis ullam officia
              rerum. Veniam nam officiis minus, voluptatibus nemo asperiores magni quam sed
              inventore sint tenetur mollitia reiciendis dolores ratione iusto.
            </p>
          </li>
          <li className="bubble-item">
            <p className="bubble-title">타이틀</p>
            <p className="bubble-text">요약</p>
          </li>
          <li className="bubble-item">
            <p className="bubble-title">타이틀</p>
            <p className="bubble-text">요약</p>
          </li>
        </ul>
      </section>
      <section className="top-rated-talker">
        <h3 className="heading-3">가장 많이 말한 사람</h3>
        <p className="heading-desc">우리 대화방 참여자들의 MBTI 예측</p>
        <div className="graph">
          <CirclePacking width={400} height={500} data={circlePackingData} />
          <ul className="rank-list">
            {circlePackingData
              .sort((a, b) => b.value - a.value)
              .map(({ key, value }, index) => (
                <li className="rank-item" key={`rank-${key}-${index}`}>
                  <span className="rank">{index + 1}위</span>
                  <span className="name">{key}</span>
                  <span className="count">{value}회</span>
                  <span className="percentage">{getPercentage(circlePackingData, value)}%</span>
                </li>
              ))}
          </ul>
        </div>
      </section>
      <section className="mbti">
        <h3 className="heading-3">MBTI</h3>
        <p className="heading-desc">우리 대화방 참여자들의 MBTI 예측</p>
        <ol className="mbti-list">
          <li className="mbti-item">
            <span>여다희</span>
          </li>
          <li>
            <span>INTP</span>
          </li>
        </ol>
      </section>
      <section className="most-popular-word">
        <h3 className="heading-3">가장 많이 나온 단어</h3>
        <p className="heading-desc">우리 대화방에서 가장 많이 사용한 단어에요</p>
        <div className="graph">
          <WordCloud data={wordCloudData} />
        </div>
      </section>
    </article>
  );
}

export default ContentResultPage;
