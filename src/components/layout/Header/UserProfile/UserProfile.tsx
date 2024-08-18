'use client';

import { useRouter } from 'next/navigation';
import { Session } from 'next-auth';
import './_UserProfile.scss';

import { IconProfile } from '@public/image';

interface UserProfilePropType {
  userSession: Session | null;
}

function UserProfile({ userSession }: UserProfilePropType) {
  const router = useRouter();
  // NOTE - 세션 정보 브라우저 조회용으로 작성
  console.log('UserProfile_🪪 session', userSession);

  console.log('UserProfile / session', userSession);

  const userName = userSession?.user?.name;

  return (
    <>
      <div className="user-profile-container">
        {userSession?.user ? (
          <>
            <div
              onClick={() => router.push(`/${userSession?.user?.id}/mypage`)}
              className="profile-button"
            >
              <p>
                안녕하세요, <strong className="user-name">{userName}</strong> 님!
              </p>
              <IconProfile />
            </div>
          </>
        ) : (
          <>
            <div onClick={() => router.push('/login')} className="profile-button">
              <p>로그인 후 이용해주세요</p>
              <IconProfile />
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default UserProfile;
