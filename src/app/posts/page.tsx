import React from 'react';
import './_post.scss';
import Link from 'next/link';
import { getPostData } from '@/serverActions/fetchServerAction/getDataFetch';
import PostListItem from './PostListItem';
import { PostItem } from '@/types/posts';

export async function PostPage() {
  const data: PostItem[] = await getPostData('');
  const list = data.map((item: any) => <PostListItem key={item._id} item={item} />);

  return (
    <main className="post-cover">
      <div className="title">게시판</div>
      <div className="types-cover">
        <ul className="types">
          <li className="type">
            <Link href="">전체</Link>
          </li>
          <li className="type">
            <Link href="/posts/notice">공지사항</Link>
          </li>
          <li className="type">
            <Link href="">자유게시판</Link>
          </li>
          <li className="type">
            <Link href="/posts/new">새 글쓰기</Link>
          </li>
        </ul>
      </div>
      <section className="section-table">
        <table className="custom-table">
          <colgroup>
            <col className="col-10" />
            <col className="col-60" />
            <col className="col-30" />
            <col className="col-0" />
            <col className="col-0" />
            <col className="col-0" />
          </colgroup>
          <thead>
            <tr className="table-header">
              <th className="table-cell">번호</th>
              <th className="table-cell">제목</th>
              <th className="table-cell">글쓴이</th>
              <th className="table-cell hidden-sm">조회수</th>
              <th className="table-cell hidden-sm">댓글수</th>
              <th className="table-cell hidden-sm">작성일</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </table>
        <hr className="table-divider" />
      </section>
    </main>
  );
}

export default PostPage;
