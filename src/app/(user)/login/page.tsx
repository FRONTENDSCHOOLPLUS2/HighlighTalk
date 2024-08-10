import LoginForm from '@/components/Form/LoginForm/LoginForm';
import './_LoginPage.scss';

function LoginPage() {
  return (
    <>
      <span className="background"></span>
      <div className="login-page-container">
        <h1 className="title">로그인</h1>
        <LoginForm />
      </div>
    </>
  );
}
export default LoginPage;
