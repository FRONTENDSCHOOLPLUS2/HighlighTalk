'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { LoginFormType } from '@/types';
import { signInWithCredentials, signInWithSocial } from '@/serverActions/authAction';
import './_LoginForm.scss';
import Button from '@/components/Button/Button';
import { useState } from 'react';
import Modal from '@/components/Modal/Modal';

function LoginForm() {
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm<LoginFormType>();

  const emailErrorMessage: string | undefined =
    errors.email?.message && typeof errors.email.message === 'string'
      ? errors.email.message
      : undefined;

  const passwordErrorMessage: string | undefined =
    errors.password?.message && typeof errors.password.message === 'string'
      ? errors.password.message
      : undefined;

  const handleSubmitLogin = async (data: LoginFormType) => {
    try {
      await signInWithCredentials(data);
    } catch (error) {
      if (error instanceof Error) {
        setError('password', {
          type: 'manual',
          message: '이메일 혹은 비밀번호를 확인해주세요.',
        });
      }
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      await signInWithSocial(provider);
    } catch (error) {
      console.error('Error ->', error);
    }
  };

  // FIXME - 전역 상태로 리팩터링 이전의 모달 사용
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const TEST_PASSWORD = process.env.NEXT_PUBLIC_TEST_ACCOUNT_PASSWORD;

  const testAccountLogin = async () => {
    const testAccountData: LoginFormType = {
      email: 'tmuchtalker@gmail.com',
      password: `${TEST_PASSWORD}`,
    };
    try {
      await signInWithCredentials(testAccountData);
    } catch (error) {
      if (error instanceof Error) {
        setError('password', {
          type: 'manual',
          message: '테스트 계정 로그인에 실패했습니다.',
        });
      }
    }
  };

  // TODO - 모달 열어서 '테스트계정으로 로그인하시겠습니까?' 한번 걸기
  const handleTestAccountLogin = async () => {
    openModal();
  };
  // FIXME - 소셜 로그인 눌렀을 때 페이지 이동 전 폼의 에러 메세지 출력되는 오류 해결하기

  return (
    <form onSubmit={handleSubmit(handleSubmitLogin)} className="login-form">
      <div className="input-group">
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          id="email"
          placeholder="highlightalk@gmail.com"
          {...register('email', {
            required: '이메일을 입력하세요.',
          })}
        />
        <span className="error-message">{emailErrorMessage}</span>
      </div>

      <div className="input-group">
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          placeholder="비밀번호를 입력해주세요."
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
            minLength: {
              value: 8,
              message: '8자리 이상 비밀번호를 입력하세요.',
            },
          })}
        />
        <span className="error-message">{passwordErrorMessage}</span>
      </div>
      <Button theme="black" size="full" onClick={handleTestAccountLogin}>
        테스트 계정으로 로그인하기
      </Button>
      <button type="submit" className="login-button">
        로그인
      </button>
      <button type="button" className="signup-button">
        <Link href="/signup">회원가입</Link>
      </button>
      <div className="social-login">
        <p>소셜로그인으로 간편하게 이용해보세요!</p>
        <span className="hr"></span>
        <div className="icons">
          {/* TODO - icon으로 추후 변경 */}
          <button onClick={() => handleSocialLogin('google')}>구글</button>
          <button type="button" onClick={() => handleSocialLogin('github')}>
            깃헙
          </button>
          <button type="button" onClick={() => handleSocialLogin('kakao')}>
            카카오
          </button>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          content="테스트 계정으로 로그인하시겠습니까?"
        >
          <span className="modal-contents">
            <strong>⚠️ 테스트 계정은 다음과 같은 제한사항이 있습니다.</strong>
            <ul>
              <li>
                <b>더미 데이터</b>를 사용해, 채팅 분석이 <b>제한</b>됩니다.
              </li>
              <li>
                일부 기능은 테스트 계정에서 <b>비활성화</b>될 수 있습니다.
              </li>
              <li>
                <b>개인 데이터 저장이 불가능</b>하며, 세션 종료 시 데이터가 삭제됩니다.
              </li>
            </ul>
            <p>이용 중 발생할 수 있는 불편에 대해 양해 부탁드립니다.</p>
          </span>
          <Button theme="black" onClick={testAccountLogin}>
            로그인할게요
          </Button>
        </Modal>
      )}
    </form>
  );
}
export default LoginForm;
