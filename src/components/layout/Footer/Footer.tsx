'use client';
import Link from 'next/link';
import './_Footer.scss';
import { IconGithub, IconInsta, IconMail } from '@public/image';

export default function Footer() {
  return (
    <footer className="footer-container">
      <h2>Highlightalk</h2>
      <div className="footer-details">
        <p>Project Highlightalk | TmuchTalker</p>
        <dl>
          <dt>Contact</dt>
          <dd>Nope... Mail Plz.</dd>

          <dt>Email</dt>
          <dd>tmuchtalker@gmail.com</dd>

          <dt>Phone</dt>
          <dd>111-1234-1234</dd>
        </dl>
        <address></address>
        <small>ⓒ TmuchTalker All Rights Reserved.</small>
      </div>

      <nav className="social-links">
        <Link href="#">
          <IconInsta />
        </Link>
        <Link href="mailto:tmuchtalker@gmail.com" target="_blank">
          <IconMail />
        </Link>
        <Link href="https://github.com/FRONTENDSCHOOLPLUS2/HighlighTalk" target="_blank">
          <IconGithub />
        </Link>
      </nav>
    </footer>
  );
}
