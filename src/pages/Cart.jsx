// src/pages/Cart.jsx
import React, { useEffect } from 'react'
import CartItem from '../components/CartItem'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart, calculateTotals } from '../features/cartSlice' // make sure these actions are correctly imported

const Cart = () => {
  const { cartItems, amount, total } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems, dispatch])

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  if (cartItems.length === 0) {
    return (
      <div className='px-5 md:container mx-auto mt-[50px] text-white text-center'>
        <h1 className='text-primary text-3xl font-bold'>Your Cart is Empty</h1>
      </div>
    )
  }

  return (
    <div className='px-5 md:container mx-auto mt-[50px] text-white'>
      {/* Title */}
      <h1 className='text-primary text-3xl font-bold'>Your Cart</h1>
      <hr className='text-primary mt-3' />

      {/* Cart Items */}
      {cartItems.map((cartItem) => (
        <CartItem key={cartItem.id} cartItem={cartItem} />
      ))}

      <hr className='text-primary mt-3' />

      {/* Totals */}
      <h1 className='text-primary text-3xl font-bold mt-5 text-center'>
        Total: ${total.toFixed(2)}
      </h1>

      {/* Buttons */}
      <div className='text-primary mt-5 mb-5 flex flex-col md:flex-row gap-5 justify-center'>
        <button
          onClick={handleClearCart}
          className='bg-white text-primary p-5 rounded-lg border border-primary hover:bg-primary hover:text-white transition-all cursor-pointer'
        >
          Clear Cart
        </button>
        <button className='bg-primary text-white p-5 rounded-lg border border-primary hover:bg-white hover:text-primary transition-all cursor-pointer'>
          Check Out
        </button>
      </div>
    </div>
  )
}

export default Cart
