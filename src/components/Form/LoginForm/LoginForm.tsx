'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { LoginFormType } from '@/types';
import { signInWithCredentials, signInWithSocial } from '@/serverActions/authAction';
import './_LoginForm.scss';

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
          <button type="button">네이버</button>
          <button type="button">카카오</button>
        </div>
      </div>
    </form>
  );
}
export default LoginForm;
