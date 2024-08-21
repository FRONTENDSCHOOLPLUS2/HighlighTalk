'use client';

import { useState } from 'react';
import UserProfile from '../UserProfile/UserProfile';
import { auth } from '@/auth';
import NavBar from '../NavBar/NavBar';
import './_SideBar.scss';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import IconHamburger from '@public/image/icon_hamburger.svg';
import { IconCross } from '@public/image';

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const session = useSession();
  // Fetch user session asynchronously
  // const [session, setSession] = useState(null);
  // useState(() => {
  //   const fetchSession = async () => {
  //     const result = await auth();
  //     setSession(result);
  //   };
  //   fetchSession();
  // }, []);

  return (
    <div className="sidebar-container">
      <button onClick={toggleSidebar} className="hamburger-menu-btn">
        <IconHamburger />
      </button>
      <div className={` sidebar ${isOpen ? 'open' : ''}`}>
        <button onClick={toggleSidebar} className="hamburger-menu-btn">
          <IconCross />
        </button>

        <UserProfile userSession={session.data} />
        <NavBar />
      </div>
    </div>
  );
}

export default SideBar;
