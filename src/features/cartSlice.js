// src/features/cartSlice.js
import { createSlice } from '@reduxjs/toolkit'

// ✅ initial state
const initialState = {
  cartItems: [], // Array of items {id, title, price, amount}
  amount: 0, // Total quantity of items
  total: 0, // Total price of all items
  userCarts: {}, // Store carts per user: { userId: { cartItems, amount, total } }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // ✅ clear all items
    clearCart: (state) => {
      state.cartItems = []
      state.amount = 0
      state.total = 0
    },

    // ✅ remove one item by id
    removeItem: (state, action) => {
      const itemId = action.payload
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId)
      // Recalculate totals
      let amount = 0
      let total = 0
      state.cartItems.forEach((item) => {
        amount += item.amount
        total += item.amount * item.price
      })
      state.amount = amount
      state.total = total
    },

    // ✅ increase quantity of one item
    increase: (state, action) => {
      const itemId = action.payload
      const cartItem = state.cartItems.find((item) => item.id === itemId)
      if (cartItem) {
        cartItem.amount += 1
        // Recalculate totals
        let amount = 0
        let total = 0
        state.cartItems.forEach((item) => {
          amount += item.amount
          total += item.amount * item.price
        })
        state.amount = amount
        state.total = total
      }
    },

    // ✅ decrease quantity of one item
    decrease: (state, action) => {
      const itemId = action.payload
      const cartItem = state.cartItems.find((item) => item.id === itemId)
      if (cartItem && cartItem.amount > 1) {
        cartItem.amount -= 1
      } else {
        // If amount reaches 0 → remove item completely
        state.cartItems = state.cartItems.filter((item) => item.id !== itemId)
      }
      // Recalculate totals
      let amount = 0
      let total = 0
      state.cartItems.forEach((item) => {
        amount += item.amount
        total += item.amount * item.price
      })
      state.amount = amount
      state.total = total
    },

    // ✅ calculate totals (re-run every time cart changes)
    calculateTotals: (state) => {
      let amount = 0
      let total = 0
      state.cartItems.forEach((item) => {
        amount += item.amount
        total += item.amount * item.price
      })
      state.amount = amount
      state.total = total
    },

    // ✅ add new item or increase amount if already in cart
    addToCart: (state, action) => {
      const newItem = action.payload
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      )

      if (existingItem) {
        existingItem.amount += 1
      } else {
        state.cartItems.push({ ...newItem, amount: 1 })
      }

      // Recalculate totals
      let amount = 0
      let total = 0
      state.cartItems.forEach((item) => {
        amount += item.amount
        total += item.amount * item.price
      })
      state.amount = amount
      state.total = total
    },

    // ✅ Load cart for specific user
    loadUserCart: (state, action) => {
      const userId = action.payload
      if (state.userCarts[userId]) {
        state.cartItems = state.userCarts[userId].cartItems || []
        state.amount = state.userCarts[userId].amount || 0
        state.total = state.userCarts[userId].total || 0
      } else {
        state.cartItems = []
        state.amount = 0
        state.total = 0
      }
    },

    // ✅ Save current cart for specific user
    saveUserCart: (state, action) => {
      const userId = action.payload
      state.userCarts[userId] = {
        cartItems: [...state.cartItems],
        amount: state.amount,
        total: state.total,
      }
    },

    // ✅ Clear cart for current user
    clearUserCart: (state, action) => {
      const userId = action.payload
      state.cartItems = []
      state.amount = 0
      state.total = 0
      if (state.userCarts[userId]) {
        state.userCarts[userId] = {
          cartItems: [],
          amount: 0,
          total: 0,
        }
      }
    },

    // ✅ Load stored carts from localStorage
    loadStoredCarts: (state, action) => {
      const { userId, cartData } = action.payload
      state.userCarts[userId] = cartData
    },
  },
})

export const {
  clearCart,
  removeItem,
  increase,
  decrease,
  calculateTotals,
  addToCart,
  loadUserCart,
  saveUserCart,
  clearUserCart,
  loadStoredCarts,
} = cartSlice.actions

export default cartSlice.reducer
