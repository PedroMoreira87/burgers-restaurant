import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getMenu } from '../apis/menu.ts';
import { IMenu } from '../interfaces/menu.interface.ts';

export const fetchMenu = createAsyncThunk('menu/fetchMenu', async () => {
  return await getMenu();
});

interface MenuState {
  data: IMenu | null;
  loading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  data: null,
  loading: false,
  error: null,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch menu';
      });
  },
});

export default menuSlice.reducer;
