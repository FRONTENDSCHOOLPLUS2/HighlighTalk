import Link from 'next/link';
import './home.scss';
function MainPage() {
  return (
    <main className="MainPage">
      <Link href="/freetest">
        <div>채팅방 내용 검사하기</div>
      </Link>
    </main>
  );
}

export default MainPage;
