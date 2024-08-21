import { auth } from '@/auth';
import { PostItem, Reply } from '@/types/posts';
import Link from 'next/link';
import DeleteReply from './DeleteReply';

async function CommentItem({ item }: { item: Reply }) {
  const session = await auth();

  const isAuthor = session?.user?.id === item?.user._id + ''; // 내 댓글, 게시물 확인

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
        <pre className="comment-content">{item.content}</pre>
        {isAuthor ? <DeleteReply item={item} /> : ''}
      </div>
    </div>
  );
}

export default CommentItem;
