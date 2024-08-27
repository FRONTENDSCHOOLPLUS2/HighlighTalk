'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import Menu from '../Menu/Menu';
import './_Card.scss';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import { useForm } from 'react-hook-form';

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
  const {
    register,
    formState: { errors },
    setError,
    setFocus,
    handleSubmit,
  } = useForm<{ title: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const parseDateString = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();

    return [year, month, day].join('.');
  };

  const enterEditMode = () => {
    setIsEditing(true);
    setFocus('title');
  };

  const handleFormSubmit = async (formData: { title: string }) => {
    if (title === formData.title) {
      return;
    }
    try {
      setIsEditing(false);
      alert(formData.title);
    } catch (error) {
      setError('title', { message: '변경에 실패했어요.' }, { shouldFocus: true });
    }
  };

  return (
    <>
      {/* <Link href={`/${type}/${_id}`}> */}
      <div
        className="cont-data"
        onClick={(e) => {
          router.push(`/${type}/${_id}`);
        }}
      >
        <span className="tag">{type}</span>
        {isEditing ? (
          <form
            className="title-form"
            onSubmit={handleSubmit(handleFormSubmit)}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <input
              className="title-input"
              id={'title'}
              type="text"
              defaultValue={title}
              maxLength={20}
              {...register('title', {
                required: '제목을 입력하세요.',
                minLength: {
                  value: 2,
                  message: '2자 이상, 20자 이하로 입력해주세요.',
                },
                maxLength: {
                  value: 20,
                  message: '2자 이상, 20자 이하로 입력해주세요.',
                },
              })}
            />
            <div className="title-input-bottom">
              <p className="error-message"></p>
              <Button size="md" type="submit">
                저장
              </Button>
            </div>
          </form>
        ) : (
          <p className="title">{title}</p>
        )}
        <p className="bottom-info">
          <span className="author">{username}</span>
          <span className="date">{parseDateString(new Date(createdAt))}</span>
        </p>
      </div>
      {isMine && <Menu _id={_id} enterEditMode={enterEditMode} />}
      {/* </Link> */}
    </>
  );
}

export default Card;
