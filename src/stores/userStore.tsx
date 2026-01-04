import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type storeState = {
  user: any;
  username: string | null;
  theme: string;
  hour12Format: boolean;
  setUser: (user: any) => void;
  setUsername: (username: string) => void;
  setTheme: (theme: string) => void;
  setHour12Format: (format: boolean) => void;
};

export const userStore = create<storeState>()(
  persist(
    (set, get) => ({
      user: null,
      username: '',
      theme: 'light',
      hour12Format: true,
      setUser: user => set({ user }),
      setUsername: username => set({ username }),
      setTheme: theme => set({ theme }),
      setHour12Format: hour12Format => set({ hour12Format }),
    }),
    {
      name: 'Nice-Sport-Match-info',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
