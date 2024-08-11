'use server';

import { signIn } from '@/auth';
import { LoginFormType } from '@/types';

import { redirect } from 'next/navigation';

export async function signInWithCredentials(data: LoginFormType) {
  console.log('👼 User Login-> ', data);
  try {
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
  } catch (error) {
    // @ts-ignore-next-line // NOTE - 아직 해당 타입이 없어 무시합니다.
    throw new Error(error.cause.err.message);
  }
  redirect('/');
}
