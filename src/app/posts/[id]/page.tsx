import React from 'react';
import './_detail.scss';
import { getPostData } from '@/serverActions/fetchServerAction/getDataFetch';
import Link from 'next/link';
import { auth } from '@/auth';
import CommentList from './CommentList';
import DeletePost from './DeletePost';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { type: string; id: string };
}): Promise<Metadata> {
  const item = await getPostData(params.id);

  return {
    title: `${item?.title} - 게시물 상세보기`,
    description: `작성자: ${item.user?.name} | ${item.content}`,
    openGraph: {
      title: item?.title,
      description: item.content,
    },
  };
}

async function PostDetailPage({ params }: { params: { type: string; id: string } }) {
  const item = await getPostData(params.id);
  const session = await auth();
  const isAuthor = session?.user?.id === item?.user._id + '';

  return (
    <div className="PostDetail">
      <main className="container">
        <section className="post-detail">
          <form action={`/${params.type}`}>
            <div className="post-title">제목 : {item?.title}</div>
            <div className="post-author">작성자 : {item.user?.name}</div>
            <div className="post-content">
              <div>
                <pre>{item.content}</pre>
              </div>
              <hr />
            </div>
            <div className="post-actions">
              <Link href={`/posts`} className="btn btn-list">
                목록
              </Link>
              {isAuthor && (
                <>
                  <Link href={`/posts/${params.id}/edit`} className="btn btn-edit">
                    수정
                  </Link>
                  <DeletePost item={item} />
                </>
              )}
            </div>
          </form>
        </section>

        <div>
          <CommentList id={params.id} />
        </div>
      </main>
    </div>
  );
}

export default PostDetailPage;
