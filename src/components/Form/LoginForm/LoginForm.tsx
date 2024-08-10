'use client';

import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import './_LoginForm.scss';
import { signIn } from '@/auth';

const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

interface UserDataType {
  email: string;
  password: string;
}

// TODO - 에러메세지 정교하게

function LoginForm() {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm();

  const emailErrorMessage: string | undefined =
    errors.email?.message && typeof errors.email.message === 'string'
      ? errors.email.message
      : undefined;

  const passwordErrorMessage: string | undefined =
    errors.password?.message && typeof errors.password.message === 'string'
      ? errors.password.message
      : undefined;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <div className="input-group">
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          id="email"
          placeholder="."
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
          <button type="submit">로그인테스트</button>
          {/* TODO - icon으로 추후 변경 */}
          <div>구글</div>
          <div>카톡</div>
          <div>깃허브</div>
        </div>
      </div>
    </form>
  );
}
export default LoginForm;
