import LoginForm from '@/components/Form/LoginForm/LoginForm';
import './_LoginPage.scss';
import { poppinsFont } from '@/utils/font';

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
