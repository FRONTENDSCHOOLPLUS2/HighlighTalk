import { auth } from '@/auth';
import { PostItem } from '@/types/posts';
import Link from 'next/link';
import PostInfo from './PostInfo';

async function CommentItem({ item }: { item: PostItem }) {
  const session = await auth();

  const isAuthor = session?.user?.id === item?.user._id + '';
  return (
    <div className="comment-item">
      <div className="comment-header">
        <Link href="" className="comment-user">
          {item.user?.name}
        </Link>
        <time className="comment-date" dateTime={item.updatedAt}>
          {item.updatedAt}
        </time>
      </div>
      <div className="comment-body">
        <form action="#">
          <pre className="comment-content">{item.content}</pre>
          {isAuthor ? <PostInfo item={item} /> : ''}
        </form>
      </div>
    </div>
  );
}

export default CommentItem;
