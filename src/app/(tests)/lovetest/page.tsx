import { Metadata } from 'next';
import LoveTestContainer from './\bLoveTestContainer';
import './_loveTestPage.scss';

// 서버컴포넌트로 분리

export const metadata: Metadata = {
  title: '하이라이톡 | 연애 테스트',
  description: 'Chat GPT API 기반 대화내용 분석 서비스',
  keywords: 'highlightalk',
};
function TestPage() {
  return <LoveTestContainer />;
}

export default TestPage;
