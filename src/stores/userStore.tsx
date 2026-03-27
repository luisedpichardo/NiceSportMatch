import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type storeState = {
  user: any;
  username: string | null;
  theme: string;
  hour12Format: boolean;
  isLoading: boolean;
  hasHydrated: boolean; // Add this
  setUser: (user: any) => void;
  setUsername: (username: string) => void;
  setTheme: (theme: string) => void;
  setHour12Format: (format: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setHasHydrated: (state: boolean) => void; // Add this
};

export const userStore = create<storeState>()(
  persist(
    (set, get) => ({
      user: null,
      username: '',
      theme: 'light',
      hour12Format: true,
      isLoading: true,
      hasHydrated: false, // Initial state
      setUser: user => set({ user }),
      setUsername: username => set({ username }),
      setTheme: theme => set({ theme }),
      setHour12Format: hour12Format => set({ hour12Format }),
      setIsLoading: isLoading => set({ isLoading }),
      setHasHydrated: state => set({ hasHydrated: state }),
    }),
    {
      name: 'Nice-Sport-Match-info',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => state => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
