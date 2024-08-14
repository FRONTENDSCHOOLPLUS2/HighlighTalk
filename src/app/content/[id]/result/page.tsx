import './_ContentResultPage.scss';
import ThemeSection from './components/ThemeSection/ThemeSection';
import TopRatedTalkerSection from './components/TopRatedTalkerSection/TopRatedTalkerSection';
import MbtiSection from './components/MbtiSection/MbtiSection';
import PopularWordSection from './components/PopularWordSection/PopularWordSection';

// TODO 데이터 fetching
function ContentResultPage() {
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
    <article className="result">
      <ThemeSection
        data={[
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
        ]}
      />
      <TopRatedTalkerSection data={circlePackingData} />
      <MbtiSection data={[]} />
      <PopularWordSection data={wordCloudData} />
    </article>
  );
}

export default ContentResultPage;
