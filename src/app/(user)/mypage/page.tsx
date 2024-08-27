import { auth } from '@/auth';
import './_MyPage.scss';

import Link from 'next/link';
import MyPageProfile from './MyPageProfile';
import AdditionalMenu from './AdditionalMenu';
import CoinSummary from './UserCoinSection';
import ArchiveSummary from './ArchiveSummary';

export const metadata = {
  title: '하이라이톡 | 마이 페이지',
  description:
    '하이라이톡 마이페이지에서 내 프로필을 관리하고, AI 기반 톡방 분석 기록을 확인하며, 코인 잔액을 조회하세요. 다양한 기능을 통해 하이라이톡 서비스를 효율적으로 이용할 수 있어요.',
  keywords: 'highlightalk, 하이라이톡, 마이페이지, 프로필 관리, 분석 기록, 코인 조회',
};

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
          <Link href="/mypage/archive">내 분석 기록</Link>
        </h2>
        <ArchiveSummary />
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
