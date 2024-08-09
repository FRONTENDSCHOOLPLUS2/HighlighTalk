import './_SignupPage.scss';

function SignupPage() {
  return (
    <>
      <span className="background"></span>
      <div className="signup-page-container">
        <h1 className="title">회원가입</h1>
        <form action="submit" className="signup-form">
          <div className="input-group">
            <label htmlFor="email">이메일</label>
            <input type="text" id="email" placeholder="이메일을 입력해주세요." />
          </div>
          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input type="password" id="password" placeholder="비밀번호를 입력해주세요." />
          </div>
          <div className="input-group">
            <label htmlFor="pw-confirm">비밀번호 확인</label>
            <input type="password" id="pw-confirm" placeholder="비밀번호 확인" />
          </div>
          <button type="submit" className="submit-button">
            회원가입
          </button>
        </form>
      </div>
    </>
  );
}
export default SignupPage;
