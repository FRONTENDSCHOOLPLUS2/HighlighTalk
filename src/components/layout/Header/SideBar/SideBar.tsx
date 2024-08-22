'use client';

import { useState } from 'react';
import NavBar from '../NavBar';
import { useSession } from 'next-auth/react';
import IconHamburger from '@public/image/icon_hamburger.svg';
import { IconCross } from '@public/image';
import './_SideBar.scss';
import UserProfile from '../UserProfile';

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const closeSidebar = () => {
    setIsOpen(false);
  };

  const session = useSession();

  return (
    <div className="sidebar-container">
      <button onClick={toggleSidebar} className="hamburger-menu-btn">
        <IconHamburger />
      </button>
      <div className={` sidebar ${isOpen ? 'open' : ''}`}>
        <button onClick={toggleSidebar} className="hamburger-menu-btn">
          <IconCross />
        </button>

        <UserProfile userSession={session.data} onInteraction={closeSidebar} />
        <NavBar onInteraction={closeSidebar} />
      </div>
    </div>
  );
}

export default SideBar;
