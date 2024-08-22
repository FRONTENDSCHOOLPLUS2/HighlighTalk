import './_home.scss';
import MainNotice from '@/components/MainNotice/MainNotice';
import MainSlide from '@/components/MainSlide/MainSlide';
import MainItems from '@/components/MainItems/MainItems';
import MainThemeItems from '@/components/MainThemeItems/MainThemeItems';

export const metadata = {
  title: '하이라이톡 | 메인페이지', // 페이지 타이틀
  description: '하이라이톡 에서 AI기반 톡방 분석 서비스를 받아 보세요', // 페이지 설명
  keywords: 'highlightalk',
};

function MainPage() {
  return (
    <main className="MainPage">
      <div className="main_service">
        <MainSlide />
        <MainItems />
      </div>
      <MainNotice />
      {/* <MainThemeItems /> */}
    </main>
  );
}

export default MainPage;
