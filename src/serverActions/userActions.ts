'use server';

import { SignupFormType } from '@/types';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

export async function signup(data: SignupFormType) {
  const userData = {
    type: data.type || 'user',
    name: data.name,
    email: data.email,
    password: data.password,
  };

  const res = await fetch(`${SERVER}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'client-id': `${CLIENT_ID}`,
    },
    body: JSON.stringify(userData),
  });

  const resJson = await res.json();
  console.log('💽 userActions/resJson', resJson);
  return resJson;
}
