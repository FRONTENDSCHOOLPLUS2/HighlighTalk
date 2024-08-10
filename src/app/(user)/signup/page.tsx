import SignupForm from '@/components/Form/SignupForm/SignupForm';
import './_SignupPage.scss';

function SignupPage() {
  return (
    <>
      <span className="background"></span>
      <div className="signup-page-container">
        <h1 className="title">회원가입</h1>
        <SignupForm />
      </div>
    </>
  );
}
export default SignupPage;
