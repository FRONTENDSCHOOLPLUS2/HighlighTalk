export declare module '@auth/core/types' {
  interface User {
    type: string;
    loginType: string;
    coin: number;
    orderList: number[];
    accessToken: string;
    refreshToken: string;
  }

  interface Session {
    coin: number;
    orderList: number[];
    accessToken: string;
    refreshToken: string;
  }
}

export declare module '@auth/core/jwt' {
  interface JWT {
    coin: number;
    orderList: number[];
    accessToken: string;
    refreshToken: string;
  }
}
