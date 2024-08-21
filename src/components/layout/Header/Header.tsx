import Link from 'next/link';
import './_Header.scss';
import { auth } from '@/auth';
import UserProfile from './UserProfile/UserProfile';
import { poppinsFont } from '@/utils/font';
import NavBar from './NavBar/NavBar';
import { IconHamburger } from '@public/image';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import SideBar from './SideBar/SideBar';

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
        <NavBar />
        <UserProfile userSession={session} />
      </div>
      <SideBar />
    </header>
  );
}

export default Header;
