export interface UserType {
  _id: number;
  email: string;
  name: string;
  type: 'user';
  loginType?: 'email' | 'google' | 'kakao' | 'github'; // 'email' | 'google' | '' 등으로 확장 작성
  image?: string;
  profile?: string;
  createdAt: string;
  updatedAt: string;
  extra?: {
    [key: string]: any;
  };
}

export type OAuthUser = Required<Pick<UserType, 'type' | 'loginType'>> &
  Partial<Pick<UserType, 'name' | 'email' | 'image' | 'extra'>>;

export interface TokenType {
  id?: string;
  type?: string;
  accessToken?: string;
  refreshToken?: string;
}
export interface SignupResponsType extends UserType {
  token?: TokenType;
}

export interface LoginFormType extends Pick<UserType, 'email'> {
  password: string;
}

// NOTE - 회원가입 할 때는 extra 데이터에 coin 넣어서 보냄
export interface SignupFormType extends Pick<UserType, 'type' | 'name' | 'email'> {
  password: string;
  passwordConfirm: string;
  extra: { coin: number };
}
