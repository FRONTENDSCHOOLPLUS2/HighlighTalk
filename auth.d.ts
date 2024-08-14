export declare module '@auth/core/types' {
  interface User {
    type: string;
    loginType: string;
    coin: string;
    accessToken: string;
    refreshToken: string;
  }

  interface Session {
    coin: string;
    accessToken: string;
    refreshToken: string;
  }
}

export declare module '@auth/core/jwt' {
  interface JWT {
    coin: string;
    accessToken: string;
    refreshToken: string;
  }
}
