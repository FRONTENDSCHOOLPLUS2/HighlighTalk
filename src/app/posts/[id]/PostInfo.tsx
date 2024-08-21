'use client';

import Button from '@/components/Button/Button';
import { deletePostItem } from '@/serverActions/fetchServerAction/deletePostItem';
import { deleteReplies } from '@/serverActions/fetchServerAction/deleteReplies';
import { PostItem } from '@/types/posts';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface ReplyOner extends PostItem {}

function PostInfo({ item }: { item: ReplyOner }) {
  const params = useParams();
  console.log('ss,', item);
  const postId = params.id.toString(); // URL의 id 파라미터 값
  const res = item._id.toString();
  const router = useRouter();

  const onDeleteHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const data = await deletePostItem(postId);
      console.log('삭제 성공', data);
      router.push('/posts');
    } catch (err) {
      console.log('삭제 실패', err);
    }
  };

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

export default PostInfo;
