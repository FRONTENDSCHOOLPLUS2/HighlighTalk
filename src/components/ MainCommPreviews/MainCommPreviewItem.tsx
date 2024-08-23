import Link from 'next/link';
import React from 'react';

interface TestData {
  title: string;
  content: string;
  views: number;
  _id: string;
  createdAt: string;
  repliesCount: number;
}

interface MainThemesProps {
  data: TestData;
}

function MainCommPreviewItem({ data }: MainThemesProps) {
  return (
    <div className="card">
      <Link href={`posts/${data._id}`}>
        <h1>{data.title}</h1>
        <p className="card-content">{data.content}</p>
        <span>{data.views}</span>
        <p>{data.repliesCount}</p>
        <p>{data.createdAt.split(' ')[0]}</p>
      </Link>
    </div>
  );
}

export default MainCommPreviewItem;
