// src/features/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

// ✅ initial state
const initialState = {
  cartItems: [], // Array of items {id, title, price, amount}
  amount: 0, // Total quantity of items
  total: 0, // Total price of all items
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ✅ clear all items
    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
    },

    // ✅ remove one item by id
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },

    // ✅ increase quantity of one item
    increase: (state, action) => {
      const itemId = action.payload;
      const cartItem = state.cartItems.find((item) => item.id === itemId);
      cartItem.amount += 1;
    },

    // ✅ decrease quantity of one item
    decrease: (state, action) => {
      const itemId = action.payload;
      const cartItem = state.cartItems.find((item) => item.id === itemId);
      if (cartItem && cartItem.amount > 1) {
        cartItem.amount -= 1;
      } else {
        // If amount reaches 0 → remove item completely
        state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      }
    },

    // ✅ calculate totals (re-run every time cart changes)
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },

    // ✅ add new item or increase amount if already in cart
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        existingItem.amount += 1;
      } else {
        state.cartItems.push({ ...newItem, amount: 1 });
        state.amount += 1
      }
    },
  },
});

export const {
  clearCart,
  removeItem,
  increase,
  decrease,
  calculateTotals,
  addToCart,
} = cartSlice.actions;

export default cartSlice.reducer;
