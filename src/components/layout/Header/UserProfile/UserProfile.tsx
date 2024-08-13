'use client';

import { useRouter } from 'next/navigation';

import Image from 'next/image';
import { Session } from 'next-auth';
import './_UserProfile.scss';
import { IconProfile } from '../../../../../public/image';
import { signOutWithForm } from '@/serverActions/authAction';

interface UserProfilePropType {
  userSession: Session | null;
}

function UserProfile({ userSession }: UserProfilePropType) {
  const router = useRouter();
  const handleGoLogin = () => {
    router.push('/login');
  };

  return (
    <>
      <div className="user-profile-container">
        {userSession?.user && <p>{userSession?.user?.name}</p>}

        {userSession?.user ? (
          <>
            <form action={signOutWithForm}>
              <button type="submit">로그아웃하기^^</button>
            </form>
          </>
        ) : (
          <>
            <button onClick={handleGoLogin}>로그인 후 이용해주세요 </button>
          </>
        )}

        <Image src={IconProfile} alt="leftBtn" width={35} />
      </div>
    </>
  );
}
export default UserProfile;
