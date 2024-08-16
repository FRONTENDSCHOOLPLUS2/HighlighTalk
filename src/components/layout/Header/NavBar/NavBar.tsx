'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import './_NavBar.scss';

function NavBar() {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);

  const navItems = [
    { path: '/', label: 'home' },
    { path: '/about', label: 'about' },
    { path: '/contact', label: 'contact' },
    { path: '/posts', label: 'Posts' },
  ];

  return (
    <nav className="header-nav">
      <ul>
        {navItems.map((item, index) => (
          <li
            key={item.path}
            className={pathname === item.path ? 'active' : ''}
            onClick={() => setActiveIndex(index)}
          >
            <Link href={item.path}>{item.label}</Link>
          </li>
        ))}
        <div
          className="active-box"
          style={{
            left: `${activeIndex * (100 / navItems.length)}%`,
            width: `${100 / navItems.length}%`,
          }}
        />
      </ul>
    </nav>
  );
}
export default NavBar;
