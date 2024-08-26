'use server';

// NOTE - 회원가입 Action
import { OAuthUser, SignupFormType } from '@/types';
import randomProfile from '@/utils/randomProfile';

const API_SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

export async function signup(data: SignupFormType) {
  const randomImage = randomProfile();

  const userData = {
    type: data.type || 'user',
    name: data.name,
    email: data.email,
    password: data.password,
    image: randomImage,
    extra: { coin: 0, orderList: [] },
  };

  const res = await fetch(`${API_SERVER}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'client-id': `${CLIENT_ID}`,
    },
    body: JSON.stringify(userData),
  });

  const resJson = await res.json();
  console.log('💽 userActions 회원가입 /resJson', resJson);
  return resJson;
}

export async function signupWithOAuth(user: OAuthUser) {
  const res = await fetch(`${API_SERVER}/users/signup/oauth`, {
    method: 'POST',
    headers: {
      'client-id': `${CLIENT_ID}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  return res.json();
}

export async function loginOAuth(providerAccountId: string) {
  const res = await fetch(`${API_SERVER}/users/login/with`, {
    method: 'POST',
    headers: {
      'client-id': `${CLIENT_ID}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ providerAccountId }),
  });
  return res.json();
}
