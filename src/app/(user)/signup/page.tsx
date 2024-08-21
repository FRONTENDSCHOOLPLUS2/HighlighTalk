import SignupForm from '@/components/Form/SignupForm/SignupForm';
import './_SignupPage.scss';
import { poppinsFont } from '@/utils/font';

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
