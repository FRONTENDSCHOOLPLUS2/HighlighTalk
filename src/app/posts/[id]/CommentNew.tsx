'use client';

import { sendCommentData } from '@/serverActions/fetchServerAction/sendComment';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';

function CommentNew() {
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const params = useParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) {
      setError('내용은 필수입니다.');
      return;
    }

    try {
      const postData = {
        title: 'New Comment', // 댓글 제목, 필요에 따라 수정
        content: comment,
        type: 'comm', // 댓글 타입, 필요에 따라 수정
      };

      const postId = params.id as string;

      const result = await sendCommentData(postData, postId);

      if (result) {
        setComment('');
        setError('');
        setSuccess('댓글이 성공적으로 등록되었습니다.');
      } else {
        setError('댓글 등록 중 오류가 발생했습니다.');
      }
    } catch (e) {
      console.error(e);
      setError('댓글 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="comment-new">
      <h4 className="comment-header">새로운 댓글을 추가하세요.</h4>
      <form onSubmit={handleSubmit}>
        <div className="textarea-container">
          <textarea
            rows={3}
            cols={40}
            className="comment-textarea"
            placeholder="내용을 입력하세요."
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          {error && <p className="comment-error">{error}</p>}
          {success && <p className="comment-success">{success}</p>}
        </div>
        <button type="submit" className="comment-submit">
          댓글 등록
        </button>
      </form>
    </div>
  );
}

export default CommentNew;
