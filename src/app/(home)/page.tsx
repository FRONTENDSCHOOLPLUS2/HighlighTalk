import './_home.scss';
import MainNotice from '@/components/MainNotice/MainNotice';
import MainSlide from '@/components/MainSlide/MainSlide';
import MainItems from '@/components/MainItems/MainItems';
import MainSeverNotice from '@/components/MainNotice/MainSeverNotice';
import MainCommPreview from '@/components/ MainCommPreviews/MainCommPreview';
import ModalTrigger from '@/components/ModalTrigger/ModalTrigger';
import { cookies } from 'next/headers';

export const metadata = {
  title: '하이라이톡 | 메인페이지',
  description: '하이라이톡 에서 AI기반 톡방 분석 서비스를 받아 보세요',
  keywords: 'highlightalk',
};

function MainPage() {
  const isNewUser = cookies().get('isNewUser');

  return (
    <main className="MainPage">
      <div className="main_service">
        <MainSlide />
        <MainItems />
      </div>
      <MainNotice />
      <MainCommPreview />
      <MainSeverNotice />
      <ModalTrigger isNewUser={isNewUser?.name} />
    </main>
  );
}

export default MainPage;
