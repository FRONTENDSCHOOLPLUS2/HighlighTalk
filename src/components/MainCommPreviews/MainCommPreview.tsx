import React from 'react';
import { fetchPosts } from '@/serverActions/fetchServerAction/getDataFetch';
import { User } from '@/types/posts';
import MainCommPreviewItem from './MainCommPreviewItem';
import './_mainCommPreview.scss';
import Link from 'next/link';

interface TopItems {
  _id: string;
  title: string;
  content: string;
  type: string;
  views: number;
  user: User;
  createdAt: string;
  repliesCount: number;
}

async function MainCommPreview() {
  const item: { item: TopItems[] } = await fetchPosts('comm', '', '');

  const topThreeItems = item?.item
    ?.sort((a: { views: number }, b: { views: number }) => b.views - a.views)
    .slice(0, 3);

  // console.log('Top 3 Items:', topThreeItems);

  return (
    <div className="mainComm">
      <h1 className="pre-title">
        <div className="title-tag">HOT</div>
        <Link href={`/posts`}>자유 게시판 &gt;</Link>
      </h1>
      <div className="mainCommPre-cover">
        {topThreeItems.map((item, _) => {
          return <MainCommPreviewItem key={item._id} data={item} />;
        })}
      </div>
    </div>
  );
}

export default MainCommPreview;
