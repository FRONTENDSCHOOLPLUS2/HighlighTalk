import Link from 'next/link';
import './Header.scss';

function Header() {
  return (
    <header>
      <div className="HeaderLayout">
        {/* 사이트 로고 및 제목 */}
        <div className="logo">
          <Link href="/" className="logo-link">
            Highlightalk
          </Link>
        </div>

        {/* 네비게이션 메뉴 */}
        <nav className="header-nav">
          <ul>
            <li>
              <Link href="/about">about</Link>
            </li>
            <li>
              <Link href="/">contact</Link>
            </li>
            <li>
              <Link href="/">Posts</Link>
            </li>
          </ul>
        </nav>

        <div className="profile">
          <p>p</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
