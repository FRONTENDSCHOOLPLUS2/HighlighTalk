import CirclePacking from '@/components/graph/CirclePacking';
import WordCloud from '@/components/graph/WordCloud';
import TokenTest from '@/components/test/TokenTest';

function TestPage() {
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

  return (
    <>
      <h1>테스트 페이지</h1>
      <hr />
      <h2>토큰수 테스트</h2>
      <p>gpt-4o 기준, o200k_base 인코딩</p>
      <TokenTest />
      <hr />
      <h2>그래프 테스트</h2>
      <p>가장 많이 말한 사람</p>
      <CirclePacking data={circlePackingData} />
      <p>가장 많이 나온 단어</p>
      <WordCloud data={wordCloudData} />
    </>
  );
}

export default TestPage;
