import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type storeState = {
  user: any;
  username: string | null;
  theme: string;
  setUser: (user: any) => void;
  setUsername: (username: string) => void;
  setTheme: (theme: string) => void;
};

export const useStore = create<storeState>()(
  persist(
    (set, get) => ({
      user: null,
      username: '',
      theme: 'light',
      setUser: user => set({ user }),
      setUsername: username => set({ username }),
      setTheme: theme => set({ theme }),
    }),
    {
      name: 'Nice-Sport-Match-info',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
