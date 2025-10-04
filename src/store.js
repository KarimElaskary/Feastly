import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './features/productsSlice'
import cartReducer from './features/cartSlice'
import authReducer from './features/authSlice'

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
  },
})

export default store
