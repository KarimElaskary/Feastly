// src/components/CartItem.jsx
import React from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { MdRemoveShoppingCart } from "react-icons/md";
import { removeItem, increase, decrease } from "../features/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-primary flex rounded-xl px-5 mt-4 p-3 justify-between">
      {/* Left side: image + title + price */}
      <div className="flex gap-3 items-center">
        <img
          src={cartItem.imagesUrl}
          alt={cartItem.name}
          className="w-16 h-16"
        />
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold">
            {cartItem.name} - <span>${cartItem.price}</span>
          </h1>
          <p className="font-semibold">
            ${(cartItem.price * cartItem.amount).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Right side: controls */}
      <div className="flex items-center gap-5">
        {/* Remove button */}
        <MdRemoveShoppingCart
          className="text-3xl cursor-pointer hover:scale-[120%] transition-all"
          onClick={() => dispatch(removeItem(cartItem.id))}
        />

        {/* Quantity controls */}
        <div className="flex flex-col items-center">
          {/* Increase */}
          <IoIosArrowUp
            className="text-2xl cursor-pointer hover:scale-[120%] transition-all"
            onClick={() => dispatch(increase(cartItem.id))}
          />
          {/* Current amount */}
          <p>{cartItem.amount}</p>
          {/* Decrease */}
          <IoIosArrowDown
            className="text-2xl cursor-pointer hover:scale-[120%] transition-all"
            onClick={() => dispatch(decrease(cartItem.id))}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
