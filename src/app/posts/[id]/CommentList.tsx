import { getAllReplies } from '@/serverActions/fetchServerAction/getAllReplies';
import CommentItem from './CommentItem';
import CommentNew from './CommentNew';

async function CommentList({ id }: { id: string }) {
  const data = await getAllReplies(id);

  // console.log('check data', data);

  const list = data.map((item: any) => <CommentItem key={item._id} item={item} />);

  return (
    <section className="replies-cover">
      <h4 className="replies">댓글 {data?.length || 0}개</h4>
      {list}
      <CommentNew />
    </section>
  );
}
export default CommentList;
