'use client';

import { useRouter } from 'next/navigation';
import { Session } from 'next-auth';
import { IconProfile } from '@public/image';

interface UserProfilePropType {
  userSession: Session | null;
  onInteraction?: () => void;
}

function UserProfile({ userSession, onInteraction }: UserProfilePropType) {
  const router = useRouter();
  const userName = userSession?.user?.name;
  const handleProfileClick = () => {
    onInteraction?.();
    const targetRoute = userSession?.user ? '/mypage' : '/login';
    router.push(targetRoute);
  };

  return (
    <>
      <div className="user-profile-container">
        {userSession?.user ? (
          <>
            <div onClick={() => handleProfileClick()} className="profile-button">
              <p>
                <span>안녕하세요,&nbsp;</span>
                <strong className="user-name">{userName}</strong>
                <span>님!</span>
              </p>
              <IconProfile />
            </div>
          </>
        ) : (
          <>
            <div onClick={() => handleProfileClick()} className="profile-button">
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
