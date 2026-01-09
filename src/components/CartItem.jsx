// src/components/CartItem.jsx
import React from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { MdRemoveShoppingCart } from "react-icons/md";
import { removeItem, increase, decrease } from "../features/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();

  return (
    <div className="glass p-4 rounded-2xl flex items-center justify-between gap-4 mb-4 group hover:bg-white/40 transition-colors">
      {/* Left side: image + title + price */}
      <div className="flex gap-4 items-center flex-1">
        <div className="w-20 h-20 rounded-xl overflow-hidden shadow-sm border border-white/50 flex-shrink-0">
          <img
            src={cartItem.imagesUrl}
            alt={cartItem.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-slate-800 leading-tight">
            {cartItem.name}
          </h3>
          <p className="text-sm text-slate-500">
            ${cartItem.price}{" "}
            <span className="text-slate-300">x {cartItem.amount}</span>
          </p>
          <p className="font-bold text-primary text-lg">
            ${(cartItem.price * cartItem.amount).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Right side: controls */}
      <div className="flex items-center gap-4">
        {/* Quantity controls */}
        <div className="flex flex-col items-center bg-white/50 rounded-lg p-1 shadow-inner">
          <button
            onClick={() => dispatch(increase(cartItem.id))}
            className="p-1 hover:text-primary transition-colors disabled:opacity-50"
          >
            <IoIosArrowUp size={16} />
          </button>

          <span className="font-bold text-slate-700 text-sm py-1">
            {cartItem.amount}
          </span>

          <button
            onClick={() => dispatch(decrease(cartItem.id))}
            className="p-1 hover:text-primary transition-colors"
          >
            <IoIosArrowDown size={16} />
          </button>
        </div>

        {/* Remove button */}
        <button
          onClick={() => dispatch(removeItem(cartItem.id))}
          className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm hover:shadow-red-200"
          title="Remove Item"
        >
          <MdRemoveShoppingCart size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
