import { auth } from '@/auth';
import { signOutWithForm } from '@/serverActions/authAction';

// TODO - MiddelWare 처리

async function MyPage() {
  const userAuth = await auth();
  console.log('userAuth', userAuth);
  return (
    <div>
      <form action={signOutWithForm}>
        <button type="submit">👀로그아웃하기</button>
      </form>
      마이페이지입니다 user id {userAuth?.user!.id ?? '하이'}
    </div>
  );
}
export default MyPage;
