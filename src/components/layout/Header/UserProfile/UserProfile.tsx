'use client';

import { useRouter } from 'next/navigation';
import { Session } from 'next-auth';
import './_UserProfile.scss';
import { IconProfile } from '../../../../../public/image';
import { signOutWithForm } from '@/serverActions/authAction';

interface UserProfilePropType {
  userSession: Session | null;
}

function UserProfile({ userSession }: UserProfilePropType) {
  const router = useRouter();

  const navigateToPage = (to: string) => {
    router.push(to);
  };

  const handleProfileClick = () => {
    console.log(userSession);
    if (userSession === null) {
      navigateToPage('/login');
    } else {
      navigateToPage(`/${userSession?.user?.id}/mypage`);
    }
  };

  return (
    <>
      <div className="user-profile-container">
        {userSession?.user ? (
          <>
            <form action={signOutWithForm}>
              <button type="submit">👀로그아웃(임시)</button>
            </form>
            <div onClick={handleProfileClick}>
              <p>{userSession?.user?.name}</p>
              <IconProfile />
            </div>
          </>
        ) : (
          <>
            <div onClick={handleProfileClick}>
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
