'use server';

import { auth, signIn, signOut } from '@/auth';
import { UserDataType } from '@/components/Form/LoginForm/LoginForm';

export async function signInWithCredentials(data: UserDataType) {
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
}
