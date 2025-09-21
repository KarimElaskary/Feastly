// src/hooks/useUserCart.js
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useUser } from '@clerk/clerk-react'
import { setUser, clearUser } from '../features/userSlice'
import { loadUserCart, saveUserCart } from '../features/cartSlice'
import {
  saveCartToStorage,
  loadCartFromStorage,
} from '../utils/cartPersistence'

export const useUserCart = () => {
  const dispatch = useDispatch()
  const { user, isLoaded } = useUser()
  const { currentUser } = useSelector((state) => state.user)
  const { userCarts, cartItems } = useSelector((state) => state.cart)
  const previousUserRef = useRef(null)
  const previousCartItemsRef = useRef([])

  // Handle user authentication changes
  useEffect(() => {
    if (isLoaded) {
      if (user) {
        // User is logged in
        const newUser = {
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          fullName: user.fullName,
          username: user.username,
        }

        // Only update if user actually changed
        if (previousUserRef.current?.id !== user.id) {
          dispatch(setUser(newUser))
          // Load user's cart from Redux store
          dispatch(loadUserCart(user.id))
        }
        previousUserRef.current = newUser
      } else {
        // User is logged out
        if (previousUserRef.current) {
          // Save current cart before logging out
          dispatch(saveUserCart(previousUserRef.current.id))
        }
        dispatch(clearUser())
        previousUserRef.current = null
      }
    }
  }, [user, isLoaded, dispatch])

  // Save cart to localStorage whenever userCarts changes
  useEffect(() => {
    if (Object.keys(userCarts).length > 0) {
      saveCartToStorage(userCarts)
    }
  }, [userCarts])

  // Save current cart when cart items change (for logged in users)
  useEffect(() => {
    if (
      currentUser &&
      JSON.stringify(cartItems) !== JSON.stringify(previousCartItemsRef.current)
    ) {
      dispatch(saveUserCart(currentUser.id))
      previousCartItemsRef.current = [...cartItems]
    }
  }, [cartItems, currentUser, dispatch])

  // Load carts from localStorage on app start
  useEffect(() => {
    const storedCarts = loadCartFromStorage()
    if (Object.keys(storedCarts).length > 0) {
      // Dispatch an action to load stored carts
      // We'll need to add this to the cart slice
      Object.entries(storedCarts).forEach(([userId, cartData]) => {
        dispatch({
          type: 'cart/loadStoredCarts',
          payload: { userId, cartData },
        })
      })
    }
  }, [dispatch])

  return {
    currentUser,
    isAuthenticated: !!currentUser,
    isLoaded,
  }
}
