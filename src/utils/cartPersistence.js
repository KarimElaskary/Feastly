// src/utils/cartPersistence.js

const CART_STORAGE_KEY = 'feastly_user_carts'

// Save cart data to localStorage
export const saveCartToStorage = (userCarts) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(userCarts))
  } catch (error) {
    console.error('Error saving cart to localStorage:', error)
  }
}

// Load cart data from localStorage
export const loadCartFromStorage = () => {
  try {
    const storedCarts = localStorage.getItem(CART_STORAGE_KEY)
    return storedCarts ? JSON.parse(storedCarts) : {}
  } catch (error) {
    console.error('Error loading cart from localStorage:', error)
    return {}
  }
}

// Clear cart data from localStorage
export const clearCartFromStorage = () => {
  try {
    localStorage.removeItem(CART_STORAGE_KEY)
  } catch (error) {
    console.error('Error clearing cart from localStorage:', error)
  }
}
