'use client';

import { useRouter } from 'next/navigation';
import { Session } from 'next-auth';
import './_UserProfile.scss';

import { signOutWithForm } from '@/serverActions/authAction';
import { IconProfile } from '@public/image';

interface UserProfilePropType {
  userSession: Session | null;
}

function UserProfile({ userSession }: UserProfilePropType) {
  const router = useRouter();
  // NOTE - 세션 정보 브라우저 조회용으로 작성
  console.log('UserProfile_🪪 session', userSession);

  return (
    <>
      <div className="user-profile-container">
        {userSession?.user ? (
          <>
            <form action={signOutWithForm}>
              <button type="submit">👀로그아웃(임시)</button>
            </form>
            <button type="button" onClick={() => router.push(`/${userSession?.user?.id}/mypage`)}>
              <p>{userSession?.user?.name}</p>
              <IconProfile />
            </button>
          </>
        ) : (
          <>
            <button type="button" onClick={() => router.push('/login')}>
              <p>로그인 후 이용해주세요</p>
              <IconProfile />
            </button>
          </>
        )}
      </div>
    </>
  );
}
export default UserProfile;
