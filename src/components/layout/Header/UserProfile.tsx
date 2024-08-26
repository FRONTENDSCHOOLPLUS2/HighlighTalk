'use client';

import { useRouter } from 'next/navigation';
import { Session } from 'next-auth';
import { IconProfile } from '@public/image';
import Image from 'next/image';

const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;

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

  console.log('유자세션', userSession);

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
              <div className="image-container">
                <Image
                  src={`${API_SERVER}${userSession?.user?.image}`}
                  width={50}
                  height={50}
                  alt="not"
                  loading="lazy"
                />
              </div>
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
