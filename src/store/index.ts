import { configureStore } from '@reduxjs/toolkit';

import headerReducer from './cart-slice.ts';
import menuReducer from './menu-slice.ts';

const store = configureStore({
  reducer: {
    cart: headerReducer,
    menu: menuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
