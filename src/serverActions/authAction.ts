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
    });
    console.log(result);
  } catch (err) {
    console.error(err);
  }

  redirect('/');
}
