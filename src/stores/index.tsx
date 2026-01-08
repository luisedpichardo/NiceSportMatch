import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
// Slices
import pastMatchesSlice from './slices/pastMatchesSlice';
import myMatchesSlice from './slices/myMatchesSlice';
import otherMatchesSlice from './slices/otherMatchesSlice';

export const store = configureStore({
  reducer: {
    pastMatches: pastMatchesSlice,
    myMatches: myMatchesSlice,
    otherMatches: otherMatchesSlice,
  },
  middleware: getDefaultMiddeware => getDefaultMiddeware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
