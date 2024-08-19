import Link from 'next/link';
import './_Header.scss';
import { auth } from '@/auth';
import UserProfile from './UserProfile/UserProfile';
import { poppinsFont } from '@/utils/font';
import NavBar from './NavBar/NavBar';

async function Header() {
  const session = await auth();
  return (
    <header className={`${poppinsFont.className} header`}>
      <div className="HeaderLayout">
        {/* 사이트 로고 및 제목 */}
        <h1 className="logo">
          <Link href="/" className="logo-link">
            highlightalk
          </Link>
        </h1>

        {/* 네비게이션 메뉴 */}
        <NavBar />
        <UserProfile userSession={session} />
      </div>
    </header>
  );
}

export default Header;
