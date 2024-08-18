import { auth } from '@/auth';
import './_MyPage.scss';
import Button from '@/components/Button/Button';
import Link from 'next/link';

async function MyPage({ params }: { params: { id: string } }) {
  console.log(params.id);
  const session = await auth();

  console.log('session', session);

  const userInfo = session?.user;

  return (
    <main className="mypage-container">
      <section className="mypage-section">
        <h2 className="profile-title sr-only">내 프로필 정보</h2>
        <div className="contents-wrapper">
          <div className="contents profile">
            <span>
              <strong className="username">{userInfo?.name}</strong>님
            </span>
            <p>{userInfo?.email}</p>
          </div>
        </div>
      </section>
      <section className="mypage-section">
        <h2>내 분석 기록</h2>
        <div className="contents result">
          <ul className="result-box">
            <li>어쩌구</li>
            <li>저쩌구</li>
          </ul>
        </div>
      </section>
      <section className="mypage-section">
        <h2> 내 코인 </h2>
        <div className="contents coin">
          <div className="coin-box">
            <span>🪙</span>
            보유 코인 <span>0</span>개
          </div>
          <Button>
            <Link href={`/${params.id}/charge`}>코인 충전하기</Link>
          </Button>
        </div>
      </section>
      <section className="mypage-section">
        <h2 className="profile-title sr-only">기타 메뉴</h2>
        <ul className="contents etc">
          <li className="contents-box">공지사항</li>
          <li className="contents-box">게시판</li>
          <li className="contents-box">개발자에게 메일 보내기</li>
          <li className="contents-box">Buy me a coffee</li>
        </ul>
      </section>
    </main>
  );
}
export default MyPage;
