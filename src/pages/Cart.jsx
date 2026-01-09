// src/pages/Cart.jsx
import React, { useEffect } from "react";
import CartItem from "../components/CartItem";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, calculateTotals } from "../features/cartSlice"; // make sure these actions are correctly imported

const Cart = () => {
  const { cartItems, amount, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-6 text-center animate-[fadeIn_0.5s_ease-out]">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-slate-800">
          Your Cart is Empty
        </h1>
        <p className="text-slate-500 max-w-sm">
          Looks like you haven't added anything to your cart yet. Go ahead and
          explore our menu!
        </p>
        <a
          href="/products"
          className="bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all"
        >
          Browse Menu
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 animate-[fadeIn_0.5s_ease-out]">
      <h1 className="text-3xl font-bold text-slate-800 mb-8 border-l-4 border-primary pl-4">
        Your Cart ({amount} items)
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Cart Items List */}
        <div className="w-full lg:w-2/3">
          <div className="space-y-4">
            {cartItems.map((cartItem) => (
              <CartItem key={cartItem.id} cartItem={cartItem} />
            ))}
          </div>

          <button
            onClick={handleClearCart}
            className="mt-6 text-red-500 hover:text-red-600 font-medium text-sm flex items-center gap-2 hover:underline offset-4 cursor-pointer"
          >
            Clear Shopping Cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3">
          <div className="glass p-8 rounded-3xl sticky top-24 border border-white/40 shadow-xl">
            <h2 className="text-xl font-bold text-slate-800 mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Fee</span>
                <span>$5.00</span>
              </div>
              <div className="h-[1px] bg-slate-200 my-2"></div>
              <div className="flex justify-between text-lg font-bold text-slate-900">
                <span>Total</span>
                <span>${(total + 5).toFixed(2)}</span>
              </div>
            </div>

            <button className="cursor-pointer w-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
