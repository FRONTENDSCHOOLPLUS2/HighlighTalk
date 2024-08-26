import Image from 'next/image';
import Link from 'next/link';

function AdditionalMenu() {
  return (
    <ul className="contents etc">
      <li>
        <Link href="/posts/notice" className="notice">
          <Image src="/image/clay/bell.png" width={70} height={70} alt="공지사항" />
          <b>공지사항</b>
        </Link>
      </li>
      <li className="">
        <Link href="/posts/notice" className="notice">
          <Image src="/image/clay/contract.png" width={70} height={70} alt="게시판 바로가기" />
          <b>게시판</b>
        </Link>
      </li>
      <li className="">
        <Link href="mailto:highlightalk@gmail.com" className="notice">
          <Image src="/image/clay/mail.png" width={70} height={70} alt="문의사항 메일 쓰기" />
          <b>문의사항</b>
        </Link>
      </li>
      <li className="">
        <Link href="/posts/notice" className="notice">
          <Image src="/image/clay/coffee.png" width={70} height={70} alt="buy me a coffee" />
          <b>개발자 도와주기</b>
        </Link>
      </li>
    </ul>
  );
}
export default AdditionalMenu;
