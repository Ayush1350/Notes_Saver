import { configureStore } from '@reduxjs/toolkit';
import toggleReducer from './features/toggleSlice';
import folderSlice from './features/folderSlice';

export const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    folder: folderSlice,

  },
});

// Infer types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
