'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navItems = [
  { path: '/', label: '홈' },
  { path: '/posts', label: '커뮤니티' },
  { path: '/mypage/archive', label: '보관함' },
  { path: '/charge', label: '코인충전' },
];

function NavBar({ onInteraction }: { onInteraction?: () => void }) {
  const pathname = usePathname();
  const indexInit = navItems.findIndex((item) => item.path === pathname);
  const [activeIndex, setActiveIndex] = useState(indexInit);

  useEffect(() => {
    setActiveIndex(navItems.findIndex((item) => item.path === pathname));
  }, [pathname]);

  const handleLinkClick = (index: number) => {
    setActiveIndex(index);
    if (onInteraction) onInteraction();
  };

  return (
    <nav className="header-nav">
      <ul>
        {navItems.map((item, index) => (
          <li key={item.path} className={pathname === item.path ? 'active' : ''}>
            <Link href={item.path} onClick={() => handleLinkClick(index)}>
              {item.label}
            </Link>
          </li>
        ))}
        <div
          className="active-box"
          style={{
            opacity: activeIndex === -1 ? '0' : '1',
            left: activeIndex !== -1 ? `${activeIndex * (100 / navItems.length)}%` : 'auto',
            width: activeIndex !== -1 ? `${100 / navItems.length}%` : '0',
            transition: 'left 0.3s ease, width 0.3s ease',
          }}
        />
      </ul>
    </nav>
  );
}
export default NavBar;
