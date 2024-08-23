import { getNoticeData } from '@/serverActions/fetchServerAction/getNoticeData';
import './_mainSeverNotice.scss';
import Link from 'next/link';

// 공지사항 입니다.

interface TopItems {
  _id: number;
  title: string;
  content: string;
  type: string;
  views: number;
  createdAt: string;
  repliesCount: number;
}

async function MainSeverNotice() {
  const data: TopItems[] = await getNoticeData();

  return (
    <div className="notice-board">
      <div className="notice-info">
        <h2 className="title">공지사항</h2>
        <Link href="/posts/notice" className="more-link">
          더보기
        </Link>
      </div>
      <hr />
      {data ? (
        data.map((item, index) => (
          <div className="notice-item" key={index}>
            <span className="tag hot">NEW</span>
            <span className="notice-text">{item.title}</span>
            <span className="date">{item.createdAt.split(' ')[0]}</span>
          </div>
        ))
      ) : (
        <div className="notice-item">
          <span className="notice-text">없음</span>
        </div>
      )}
    </div>
  );
}

export default MainSeverNotice;
