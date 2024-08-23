import { Metadata } from 'next';
import './_TestPage.scss';
import FreeTestContainer from './FreeTestContainer';

// 서버컴포넌트로 분리

export const metadata: Metadata = {
  title: '하이라이톡 | 무료 테스트',
  description: 'Chat GPT API 기반 대화내용 분석 서비스',
  keywords: 'highlightalk',
};

function TestPage() {
  return <FreeTestContainer />;
}

export default TestPage;
