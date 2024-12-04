import { createSlice } from '@reduxjs/toolkit';

import { ICartState } from '../interfaces/cart.interface.ts';

const initialState: ICartState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === newItem.id && JSON.stringify(item.modifiers) === JSON.stringify(newItem.modifiers),
      );
      state.totalQuantity += newItem.quantity;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: newItem.quantity,
          totalPrice: newItem.price * newItem.quantity,
          name: newItem.name,
          modifiers: newItem.modifiers,
        });
      } else {
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      }
    },
    removeItemFromCart(state, action) {
      const { id, modifiers } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === id && JSON.stringify(item.modifiers) === JSON.stringify(modifiers),
      );
      if (existingItem) {
        state.totalQuantity--;
        if (existingItem.quantity === 1) {
          state.items = state.items.filter(
            (item) => item.id !== id || JSON.stringify(item.modifiers) !== JSON.stringify(modifiers),
          );
        } else {
          existingItem.quantity--;
          existingItem.totalPrice = existingItem.price * existingItem.quantity;
        }
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
