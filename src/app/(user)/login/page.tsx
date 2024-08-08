import Link from 'next/link';
import './_LoginPage.scss';

function LoginPage() {
  return (
    <>
      <span className="background"></span>
      <div className="login-page-container">
        <h1 className="title">로그인</h1>
        <form action="submit" className="login-form">
          <div className="input-group">
            <label htmlFor="email">이메일</label>
            <input type="text" id="email" placeholder="이메일을 입력해주세요." />
          </div>
          <div className="input-group">
            <label htmlFor="password">비밀번호</label>
            <input type="password" id="password" placeholder="비밀번호를 입력해주세요." />
          </div>
          <button type="button" className="login-button">
            로그인
          </button>
          <button type="button" className="signup-button">
            <Link href="/signup">회원가입</Link>
          </button>
          <div className="social-login">
            <p>소셜로그인으로 간편하게 이용해보세요!</p>
            <span className="hr"></span>
            <div className="icons">
              {/* TODO - icon으로 추후 변경 */}
              <div>구글</div>
              <div>카톡</div>
              <div>깃허브</div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
export default LoginPage;
