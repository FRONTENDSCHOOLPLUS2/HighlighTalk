interface UserType {
  _id: number;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  type: 'user';
  loginType?: 'email';
  image?: string;
  profile?: string;
  token?: {
    accessToken: string;
    refreshToken: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface LoginFormType extends Pick<UserType, 'email'> {
  password: string;
}
interface SignupFormType extends Pick<UserType, 'type' | 'name' | 'email'> {}

interface UserToken extends Pick<UserType, 'token'> {
  accessToken: string;
  refreshToken: string;
}
