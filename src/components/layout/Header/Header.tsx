import Link from 'next/link';
import { auth } from '@/auth';
import UserProfile from './UserProfile';
import { poppinsFont } from '@/utils/font';
import NavBar from './NavBar';
import SideBar from './SideBar/SideBar';
import './_Header.scss';

async function Header() {
  const session = await auth();
  return (
    <header className={`${poppinsFont.className} header`}>
      <div className="HeaderLayout">
        <h1 className="logo">
          <Link href="/" className="logo-link">
            highlightalk
          </Link>
        </h1>
        <NavBar />
        <UserProfile userSession={session} />
      </div>
      <SideBar />
    </header>
  );
}

export default Header;
