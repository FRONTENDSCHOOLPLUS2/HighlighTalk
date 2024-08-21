import CirclePacking from '@/components/graph/CirclePacking';
import WordCloud from '@/components/graph/WordCloud';
import Button from '@/components/Button/Button';
import TokenTest from '@/components/test/TokenTest';
import icon from '/public/image/icon_blue_s.svg';

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
      <hr />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <p>theme="primary"</p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div>
            <Button theme="primary">버튼</Button>
            <Button theme="primary" styleType="tonal">
              버튼
            </Button>
            <Button theme="primary" styleType="outlined">
              버튼
            </Button>
            <Button theme="primary" styleType="text">
              버튼
            </Button>
          </div>
          <div>
            <Button theme="primary" rounded>
              버튼
            </Button>
            <Button theme="primary" styleType="tonal" rounded>
              버튼
            </Button>
            <Button theme="primary" styleType="outlined" rounded>
              버튼
            </Button>
            <Button theme="primary" styleType="text" rounded>
              버튼
            </Button>
          </div>
          <div>
            <Button theme="primary" size="sm" rounded>
              버튼
            </Button>
            <Button theme="primary" size="sm" styleType="tonal" rounded>
              버튼
            </Button>
            <Button theme="primary" size="sm" styleType="outlined" rounded>
              버튼
            </Button>
            <Button theme="primary" size="sm" styleType="text" rounded>
              버튼
            </Button>
          </div>
        </div>
        <p>theme="secondary"</p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div>
            <Button theme="secondary">버튼</Button>
            <Button theme="secondary" styleType="tonal">
              버튼
            </Button>
            <Button theme="secondary" styleType="outlined">
              버튼
            </Button>
            <Button theme="secondary" styleType="text">
              버튼
            </Button>
          </div>
          <div>
            <Button theme="secondary" rounded>
              버튼
            </Button>
            <Button theme="secondary" styleType="tonal" rounded>
              버튼
            </Button>
            <Button theme="secondary" styleType="outlined" rounded>
              버튼
            </Button>
            <Button theme="secondary" styleType="text" rounded>
              버튼
            </Button>
          </div>
          <div>
            <Button theme="secondary" size="sm" rounded>
              버튼
            </Button>
            <Button theme="secondary" size="sm" styleType="tonal" rounded>
              버튼
            </Button>
            <Button theme="secondary" size="sm" styleType="outlined" rounded>
              버튼
            </Button>
            <Button theme="secondary" size="sm" styleType="text" rounded>
              버튼
            </Button>
          </div>
        </div>
        <p>theme="black"</p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div>
            <Button theme="black">버튼</Button>
            <Button theme="black" styleType="tonal">
              버튼
            </Button>
            <Button theme="black" styleType="outlined">
              버튼
            </Button>
            <Button theme="black" styleType="text">
              버튼
            </Button>
          </div>
          <div>
            <Button theme="black" rounded>
              버튼
            </Button>
            <Button theme="black" styleType="tonal" rounded>
              버튼
            </Button>
            <Button theme="black" styleType="outlined" rounded>
              버튼
            </Button>
            <Button theme="black" styleType="text" rounded>
              버튼
            </Button>
          </div>
          <div>
            <Button theme="black" size="sm" rounded>
              버튼
            </Button>
            <Button theme="black" size="sm" styleType="tonal" rounded>
              버튼
            </Button>
            <Button theme="black" size="sm" styleType="outlined" rounded>
              버튼
            </Button>
            <Button theme="black" size="sm" styleType="text" rounded>
              버튼
            </Button>
          </div>
        </div>
        <p>disabled=true</p>
        <div>
          <Button theme="black" disabled>
            버튼
          </Button>
          <Button theme="black" styleType="text" disabled>
            버튼
          </Button>
        </div>
        <div>
          <Button rounded theme="secondary" iconSrc={icon} type="submit">
            버튼
          </Button>
          <Button rounded theme="secondary" styleType="outlined" size="sm" iconSrc={icon}>
            버튼
          </Button>
        </div>
      </div>
    </>
  );
}

export default TestPage;
