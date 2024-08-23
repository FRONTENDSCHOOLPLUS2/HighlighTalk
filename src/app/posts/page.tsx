import './_post.scss';
import { fetchPosts } from '@/serverActions/fetchServerAction/getDataFetch';
import PostListItem from './PostListItem';
import PostContainer from './PostContainer';
import { Metadata } from 'next';
import { PostItem } from '@/types/posts';

export const metadata: Metadata = {
  title: '하이라이톡 | 게시판',
  description: '하이라이톡 게시판에서 다양한 글을 확인하세요.',
};

type Params = {
  params: { type: string };
  searchParams: { page: string; keyword: string };
};

async function PostPage({ params, searchParams }: Params) {
  const data = await fetchPosts('comm', searchParams.page, searchParams.keyword);
  const list = data?.item?.length
    ? data.item.map((item: PostItem) => <PostListItem key={item._id} item={item} />)
    : null;
  return <PostContainer list={list} data={data} />;
}

export default PostPage;
