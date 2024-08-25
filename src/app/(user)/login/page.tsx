import LoginForm from '@/components/Form/LoginForm/LoginForm';
import './_LoginPage.scss';
import { poppinsFont } from '@/utils/font';

export const metadata = {
  title: '하이라이톡 | 로그인',
  description:
    '하이라이톡 계정 또는 Google, GitHub, KakaoTalk 소셜 계정으로 로그인하여 AI 기반 톡방 분석 서비스를 이용해보세요.',
  keywords: 'highlightalk, 하이라이톡, 로그인, AI 톡방 분석, 소셜 로그인',
};

function LoginPage() {
  return (
    <div className="login-page-container">
      <span className="background"></span>
      <h1 className={`${poppinsFont.className} title`}>로그인</h1>
      <LoginForm />
    </div>
  );
}
export default LoginPage;
