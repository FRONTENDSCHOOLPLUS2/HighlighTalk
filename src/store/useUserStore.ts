import { User } from 'next-auth';
import { create } from 'zustand';

interface UserStore {
  user: User;
  isLoggedIn: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const initUserData = {
  id: '',
  name: '',
  email: '',
  type: 'user',
  loginType: '',
  accessToken: '',
  refreshToken: '',
};

export const useUserStore = create<UserStore>((set) => ({
  user: { ...initUserData },
  isLoggedIn: false,
  setUser: (user: User) =>
    set({
      user,
      isLoggedIn: true,
    }),
  clearUser: () =>
    set({
      user: { ...initUserData },
      isLoggedIn: false,
    }),
}));
