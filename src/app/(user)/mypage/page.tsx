import { auth } from '@/auth';
import './_MyPage.scss';

import Button from '@/components/Button/Button';
import Link from 'next/link';
import Image from 'next/image';
import { signOutWithForm } from '@/serverActions/authAction';

async function MyPage({ params }: { params: { id: string } }) {
  console.log(params.id);
  const session = await auth();

  console.log('session', session);

  const userInfo = session?.user;

  return (
    <main className="mypage-container">
      <section className="mypage-section">
        <h2 className="sr-only">내 프로필 정보</h2>
        <div className="contents profile">
          <div className="profile-img">
            {userInfo?.image && (
              <Image src={userInfo.image} alt="유저 프로필 이미지" width={100} height={100} />
            )}
            <button className="edit"></button>
          </div>
          <span>
            <strong className="username">{userInfo?.name}</strong>&nbsp;님
          </span>
          <p>{userInfo?.email}</p>
          <form action={signOutWithForm}>
            <button type="submit">👀 로그아웃하기(임시)</button>
          </form>
        </div>
      </section>
      <section className="mypage-section">
        <h2>
          <Link href="#">내 분석 기록</Link>
        </h2>

        <div className="contents result">
          <ul className="result-box">
            <li>
              <span className="result-title">
                <span>기본 분석 리포트</span>
                <span className="date">2024.08.18</span>
              </span>

              <span className="people">여다희, 김설하, 윤우중</span>
            </li>
            <li>
              <span className="result-title">
                <span>기본 분석 레포트</span>
                <span className="date">2024.08.18</span>
              </span>

              <span>피카츄, 라이츄, 파이리 외 3명</span>
            </li>
          </ul>
        </div>
      </section>
      <section className="mypage-section">
        <h2> 내 코인 </h2>
        <div className="contents coin">
          <div className="coin-box">
            <span className="coin-img"></span>
            보유 코인&nbsp;<b>{userInfo?.coin}</b>&nbsp;개
          </div>
          <Button theme="primary" size="full" rounded>
            <Link href={`/charge`}>코인 충전하기</Link>
          </Button>
        </div>
      </section>
      <section className="mypage-section">
        <h2 className="profile-title sr-only">기타 메뉴</h2>
        <ul className="contents etc">
          <li className="">공지사항</li>
          <li className="">게시판</li>
          <li className="">개발자에게 메일 보내기</li>
          <li className="">Buy me a coffee</li>
        </ul>
      </section>
    </main>
  );
}
export default MyPage;
