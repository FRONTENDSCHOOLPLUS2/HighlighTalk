import { signOutWithForm } from '@/serverActions/authAction';

function MyPage({ params }: { params: { id: string } }) {
  console.log(params.id);
  return (
    <div>
      <form action={signOutWithForm}>
        <button type="submit">👀로그아웃하기</button>
      </form>
      마이페이지입니다 user id -{params.id};
    </div>
  );
}
export default MyPage;
