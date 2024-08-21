'use client';

import Button from '@/components/Button/Button';
import { deleteReplies } from '@/serverActions/fetchServerAction/deleteReplies';
import { Reply } from '@/types/posts';
import { useParams } from 'next/navigation';

function DeleteReply({ item }: { item: Reply }) {
  const params = useParams();
  const postId = params.id.toString();
  const res = item._id.toString();

  const onDeleteHandler2 = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const data = await deleteReplies(postId, res);
      console.log('삭제 성공', data);
    } catch (err) {
      console.log('삭제 실패', err);
    }
  };

  return (
    <>
      <Button theme="black" size="sm" onClick={onDeleteHandler2}>
        삭제
      </Button>
    </>
  );
}

export default DeleteReply;
