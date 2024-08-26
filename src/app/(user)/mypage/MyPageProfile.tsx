'use client';

import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';
import { useModalStore } from '@/store/ModalStore';
import { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import Image from 'next/image';

const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
interface MyPageProfilePropType {
  userInfo: User | undefined;
}
function MyPageProfile({ userInfo }: MyPageProfilePropType) {
  const { isOpen, openModal, closeModal } = useModalStore();

  const handleSignOut = async () => {
    try {
      // NOTE - .env의 NEXTAUTH_URL 옵션 참고하여 Redirect됨
      await signOut({ callbackUrl: '/' });
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  console.log(userInfo, '유저인뽀');

  return (
    <div className="contents profile">
      <div className="profile-img">
        {userInfo?.image && (
          <Image
            src={`${API_SERVER}${userInfo?.image}`}
            alt="유저 프로필 이미지"
            width={100}
            height={100}
          />
        )}
        <button className="edit"></button>
      </div>
      <span>
        <strong className="username">{userInfo?.name}</strong>&nbsp;님
      </span>
      <p>{userInfo?.email}</p>
      <Button
        type="button"
        theme="secondary"
        size="sm"
        styleType="text"
        onClick={() => openModal()}
      >
        로그아웃
      </Button>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          title="로그아웃 하시겠습니까?"
          content=""
          buttons={[
            {
              label: '로그아웃',
              onClick: () => handleSignOut(),
              theme: 'secondary',
            },
            { label: `닫기`, onClick: () => closeModal(), theme: 'black' },
          ]}
        ></Modal>
      )}
    </div>
  );
}
export default MyPageProfile;
