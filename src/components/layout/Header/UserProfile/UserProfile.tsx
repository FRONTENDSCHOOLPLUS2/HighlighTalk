'use client';

import { useRouter } from 'next/navigation';
import { IconProfile } from '../../../../../public/image';
import Image from 'next/image';
import { Session } from 'next-auth';
import './_UserProfile.scss';

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
        {/* <p className="content">로그인 후 이용해주세요</p> */}
        <p>{userSession?.user?.name}</p>
        <button onClick={handleGoLogin}>
          <Image src={IconProfile} alt="leftBtn" width={35} />
        </button>
      </div>
    </>
  );
}
export default UserProfile;
