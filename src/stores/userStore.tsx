import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserState = {
  user: any;
  username: string | null;
  setUser: (user: any) => void;
  setUsername: (username: string | null) => void;
};

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      user: null,
      username: null,
      setUser: user => set({ user }),
      setUsername: username => set({ username }),
    }),
    {
      name: 'Nice-Sport-Match-username', // key in AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        username: state.username,
      }),
    }
  )
);
