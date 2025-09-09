// src/features/productsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Fetch all products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get(
      'https://e-commerce9.runasp.net/api/Products'
    )
    return response.data.data
  }
)

// Search products by query
export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (searchTerm) => {
    const response = await axios.get(
      `https://e-commerce9.runasp.net/api/Products/search?name=${searchTerm}`
    )
    return response.data.data || response.data.products || []
  }
)

// Initial state
const initialState = {
  products: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
}

// Products slice
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Add sync reducers here if needed in future
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.products = action.payload || []
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      // Search products
      .addCase(searchProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.products = action.payload || []
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

// Export reducer (no actions needed for now)
export default productsSlice.reducer
