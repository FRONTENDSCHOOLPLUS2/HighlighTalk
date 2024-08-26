'use client';

import { sendPostData } from '@/serverActions/fetchServerAction/sendPostData';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function NewPosts() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [type, _] = useState('comm');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      setError('제목과 내용을 모두 입력하세요.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    console.log('보낼 데이터:', { title, content, type });

    try {
      const result = await sendPostData({ title, content, type });
      console.log('결과:', result);
      router.push('/posts');
      if (result) {
        console.log('게시글 작성 성공:', result);
      } else {
        setError('게시글 작성 실패');
      }
    } catch (error) {
      setError('게시글 작성 중 오류 발생');
      console.log('error', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="write-container">
      <h2 className="title">게시판 글쓰기</h2>
      <form className="write-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            제목
          </label>
          <input
            type="text"
            id="title"
            className="form-input"
            placeholder="제목을 입력해 주세요 (100자 이하)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content" className="form-label">
            내용
          </label>
          <textarea
            id="content"
            className="form-textarea"
            placeholder="내용을 입력해 주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? '제출 중...' : '작성하기'}
          </button>
        </div>
        {/* 주의사항 섹션 추가 */}
        <div className="note">
          <div className="note-title">주의사항</div>
          <div className="note-item">- 제목과 내용은 필수 입력 항목입니다.</div>
          <div className="note-item">- 작성된 글은 공개됩니다.</div>
          <div className="note-item">- 부적절한 내용은 삭제될 수 있습니다.</div>
        </div>
      </form>
    </div>
  );
}

export default NewPosts;
