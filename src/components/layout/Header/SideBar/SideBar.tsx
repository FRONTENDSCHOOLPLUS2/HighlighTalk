'use client';

import { useState } from 'react';
import NavBar from '../NavBar';

import IconHamburger from '@public/image/icon_hamburger.svg';
import { IconCross } from '@public/image';
import './_SideBar.scss';
import UserProfile from '../UserProfile';
import { useSession } from '@/app/providers';

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div className="sidebar-container">
      <button onClick={toggleSidebar} className="hamburger-menu-btn">
        <IconHamburger />
      </button>
      <div className={` sidebar ${isOpen ? 'open' : ''}`}>
        <button onClick={toggleSidebar} className="hamburger-menu-btn">
          <IconCross />
        </button>

        <UserProfile userSession={session} onInteraction={closeSidebar} />
        <NavBar onInteraction={closeSidebar} />
      </div>
    </div>
  );
}

export default SideBar;
