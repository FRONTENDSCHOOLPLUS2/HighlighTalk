'use client';

import Button from '@/components/Button/Button';
import { deletePostItem } from '@/serverActions/fetchServerAction/deletePostItem';
import { PostItem } from '@/types/posts';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

function DeletePost({ item }: { item: PostItem }) {
  const params = useParams();
  const postId = params.id.toString();
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

  return (
    <>
      <Button theme="black" size="sm" onClick={onDeleteHandler}>
        삭제
      </Button>
    </>
  );
}

export default DeletePost;
