import { Metadata } from 'next';
import './_newPosts.scss';
import NewPosts from './newPosts';

export const metadata: Metadata = {
  title: '하이라이톡 | 글쓰기',
  description: '하이라이톡 게시판에서 다양한 글을 작성해보세요.',
};

function Page() {
  return <NewPosts />;
}

export default Page;
