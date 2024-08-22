'use client';

import Link from 'next/link';
import React, { useRef, useState } from 'react';
import Menu from '../Menu/Menu';
import './_Card.scss';

interface CardPropType {
  type: string;
  _id: number;
  title: string;
  username: string;
  createdAt: string;
  isMine: boolean;
}

function Card({
  type = '',
  _id = 0,
  title = '제목 없는 분석',
  username = '',
  createdAt,
  isMine = false,
}: CardPropType) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const parseDateString = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();

    return [year, month, day].join('.');
  };

  const handleFormSubmit = () => {};

  return (
    <Link href={`/${type}/${_id}`}>
      <div className="cont-data">
        <span className="tag">{type}</span>
        {isEditing ? (
          <form className="title-form" onSubmit={handleFormSubmit}>
            <input className="title-input" type="text" defaultValue={title} ref={inputRef} />
            <button type="submit" className="title-button">
              저장
            </button>
          </form>
        ) : (
          <p className="title">{title}</p>
        )}
        <p className="bottom-info">
          <span className="author">{username}</span>
          <span className="date">{parseDateString(new Date(createdAt))}</span>
        </p>
      </div>
      {isMine && <Menu _id={_id} setIsEditing={setIsEditing} />}
    </Link>
  );
}

export default Card;
