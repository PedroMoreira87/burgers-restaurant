import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReactNode } from 'react';

interface HeaderState {
  children?: ReactNode;
  index: number;
  value: number;
}

const initialState: HeaderState = {
  index: 0,
  value: 0,
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setTab: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
      state.index = action.payload;
    },
  },
});

export const { setTab } = headerSlice.actions;
export default headerSlice.reducer;
