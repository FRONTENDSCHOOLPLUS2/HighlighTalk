'use client';

import { useForm } from 'react-hook-form';
import { SignupFormType } from '@/types';
import './_SignupForm.scss';
import { signup } from '@/serverActions/userActions';
import Button from '@/components/Button/Button';
import { useRouter } from 'next/navigation';

function SignupForm() {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<SignupFormType>();
  const router = useRouter();
  const password = watch('password');

  // TODO - 타입 가드 떡칠 상태, 더 나은 방법 고민하기
  const nameErrorMessage: string | undefined =
    errors.name?.message && typeof errors.name.message === 'string'
      ? errors.name.message
      : undefined;

  const emailErrorMessage: string | undefined =
    errors.email?.message && typeof errors.email.message === 'string'
      ? errors.email.message
      : undefined;

  const passwordErrorMessage: string | undefined =
    errors.password?.message && typeof errors.password.message === 'string'
      ? errors.password.message
      : undefined;

  const confirmMessage: string | undefined =
    errors.passwordConfirm?.message && typeof errors.passwordConfirm.message === 'string'
      ? errors.passwordConfirm.message
      : undefined;

  const createUser = async (formData: SignupFormType) => {
    formData.type = 'user';
    try {
      const resData = await signup(formData);
    } catch (error) {
      console.error('Error:', error);
    }

    router.push('/login');
  };

  return (
    <form action="submit" className="signup-form" onSubmit={handleSubmit(createUser)}>
      <div className="input-group">
        <label htmlFor="name">이름</label>
        <input
          type="text"
          id="name"
          placeholder="이름을 입력해주세요."
          {...register('name', {
            required: '이름을 입력하세요.',
            minLength: {
              value: 2,
              message: '이름을 2글자 이상 입력하세요.',
            },
          })}
        />
        <span className="error-message">{nameErrorMessage}</span>
      </div>
      <div className="input-group">
        <label htmlFor="email">이메일</label>
        <input
          type="text"
          id="email"
          placeholder="이메일을 입력해주세요."
          {...register('email', {
            required: { value: true, message: '이메일을 입력해주세요.' },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: '이메일 형식을 입력해주세요.',
            },
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
            required: '비밀번호를 입력하세요.',
          })}
        />
        <span className="error-message">{passwordErrorMessage}</span>
      </div>
      <div className="input-group">
        <label htmlFor="password-confirm">비밀번호 확인</label>
        <input
          type="password"
          id="password-confirm"
          placeholder="비밀번호 확인"
          {...register('passwordConfirm', {
            required: '비밀번호 확인을 입력해주세요.',
            validate: (value) => value === password || '비밀번호가 일치하지 않습니다.',
          })}
        />
        <span className="error-message">{confirmMessage}</span>
      </div>
      <Button theme="primary" type="submit" size="full" styleType="tonal">
        가입하기
      </Button>
    </form>
  );
}
export default SignupForm;
