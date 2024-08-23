'use server';

import { auth, signIn, signOut } from '@/auth';
import { LoginFormType } from '@/types';

import { redirect } from 'next/navigation';

export const signInWithCredentials = async (data: LoginFormType) => {
  console.log('👼 User Login-> ', data);
  try {
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
  } catch (error) {
    // @ts-expect-error-next-line // NOTE - 아직 해당 타입이 없어 무시합니다.
    throw new Error(error.cause.err.message);
  }
  redirect('/');
};

export const signInWithSocial = async (provider: string) => {
  await signIn(provider, { redirectTo: '/' });
};

export const signOutWithForm = async (formData: FormData) => {
  await signOut({ redirectTo: '/' });
};

export { auth as getSession };
