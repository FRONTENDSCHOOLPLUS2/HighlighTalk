import SignupForm from '@/components/Form/SignupForm/SignupForm';
import './_SignupPage.scss';
import { poppinsFont } from '@/utils/font';

export const metadata = {
  title: '하이라이톡 | 회원가입',
  description:
    'AI기반 톡방 분석 서비스 - 빠르고 간편한 회원가입으로 하이라이톡의 다양한 기능을 만나보세요.',
  keywords: 'highlightalk',
};

function SignupPage() {
  return (
    <div className="signup-page-container">
      <span className="background"></span>
      <h1 className={`${poppinsFont.className} title`}>회원가입</h1>
      <SignupForm />
    </div>
  );
}
export default SignupPage;
