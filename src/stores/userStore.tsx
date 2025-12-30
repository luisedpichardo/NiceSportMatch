import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type UserState = {
  user: any;
  username: string | null;
  setUser: (user: any) => void;
  setUsername: (username: string) => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      username: '',
      setUser: user => set({ user }),
      setUsername: username => set({ username }),
    }),
    {
      name: 'Nice-Sport-Match-info',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
