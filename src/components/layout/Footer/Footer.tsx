'use client';
import Link from 'next/link';
import './_Footer.scss';
import { IconGithubWhite, IconInsta, IconMail } from '@public/image';
import { poppinsFont } from '@/utils/font';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="contact-contents">
        <div className="head">
          <h2 className={`${poppinsFont.className}`}>highlightalk</h2>
          <p className="title">Project highlightalk | TmuchTalker</p>
        </div>
        <div className="footer-details">
          <dl className="info">
            <div className="info-content">
              <dt>Contact</dt>
              <dd>Nope... Mail Plz.</dd>
            </div>
            <div className="info-content">
              <dt>Email</dt>
              <dd>tmuchtalker@gmail.com</dd>
            </div>
            <div className="info-content">
              <dt>Phone</dt>
              <dd>111-1234-1234</dd>
            </div>
          </dl>
          {/* <address></address> */}
        </div>
        <small className="copyright">
          <b>ⓒ TmuchTalker</b> All Rights Reserved.
        </small>
      </div>

      <nav className="social-links">
        {/* <Link href="#">
          <IconInsta />
        </Link> */}
        <Link href="mailto:tmuchtalker@gmail.com" target="_blank">
          <IconMail />
        </Link>
        <Link href="https://github.com/FRONTENDSCHOOLPLUS2/HighlighTalk/tree/main" target="_blank">
          <IconGithubWhite />
        </Link>
      </nav>
    </footer>
  );
}
