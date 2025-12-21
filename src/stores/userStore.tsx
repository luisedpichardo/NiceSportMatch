import { create } from 'zustand';

type UserState = {
  user: any;
  username: string | null;
  setUser: (user: any) => void;
  setUsername: (username: string | null) => void;
};

export const useUserStore = create<UserState>(set => ({
  user: null,
  username: null,
  setUser: user => set({ user }),
  setUsername: username => set({ username }),
}));
