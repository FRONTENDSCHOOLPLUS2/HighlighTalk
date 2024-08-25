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
        <div className="card-footer">
          <div className="footer-content">
            <div className="icon-img n1"></div>
            <span>{data.views}</span>
          </div>
          <div className="footer-content">
            <div className="icon-img n2"></div>
            <p>{data.repliesCount}</p>
          </div>
          <div className="footer-content">
            <div className="icon-img n3"></div>
            <p className="p-3">{data.createdAt.split(' ')[0]}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MainCommPreviewItem;
