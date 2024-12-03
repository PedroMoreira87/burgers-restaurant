import { configureStore } from '@reduxjs/toolkit';

import headerReducer from '../store/header-slice.tsx';

export const store = configureStore({
  reducer: {
    header: headerReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
