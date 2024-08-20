import { auth } from '@/auth';
import './_MyPage.scss';

import Link from 'next/link';
import MyPageProfile from './MyPageProfile';
import AdditionalMenu from './AdditionalMenu';
import CoinSummary from './UserCoinSection';
import ArchiveSumary from './ArchiveSumary';

async function MyPage() {
  const session = await auth();
  console.log('🪪MyPage / session', session);
  const userInfo = session?.user;

  return (
    <main className="mypage-container">
      <section className="mypage-section">
        <h2 className="sr-only">내 프로필 정보</h2>
        <MyPageProfile userInfo={userInfo} />
      </section>
      <section className="mypage-section">
        <h2>
          <Link href="#">내 분석 기록</Link>
        </h2>
        <ArchiveSumary />
      </section>
      <section className="mypage-section">
        <h2> 내 코인 </h2>
        <CoinSummary coin={userInfo?.coin} />
      </section>
      <section className="mypage-section">
        <h2 className="profile-title sr-only">기타 메뉴</h2>
        <AdditionalMenu />
      </section>
    </main>
  );
}
export default MyPage;
