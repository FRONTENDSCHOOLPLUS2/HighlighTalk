export interface UserType {
  _id: number;
  email: string;
  name: string;
  type: 'user';
  loginType?: 'email'; // 'email' | 'google' | 'kakao' 등으로 확장 작성
  image?: string;
  profile?: string;

  createdAt: string;
  updatedAt: string;
}
export interface UserToken {
  accessToken: string;
  refreshToken: string;
}
export interface SignUpResponsType extends UserType {
  token?: UserToken;
}

export interface LoginFormType extends Pick<UserType, 'email'> {
  password: string;
}
export interface SignupFormType extends Pick<UserType, 'type' | 'name' | 'email'> {
  password: string;
  passwordConfirm: string;
}
