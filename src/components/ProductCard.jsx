// src/components/ProductCard.js

import React from "react";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice"; // adjust path if needed


const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="flex flex-col w-[300px] p-5 bg-primary rounded-2xl text-white hover:bg-white hover:text-primary transition-colors duration-300 border-2 border-primary">
      <Link to={`/product/${product.id}`}>
        <img src={product.thumbnail} alt={product.title} />
        <h1>{product.title}</h1>
        <p>Price: ${product.price}</p>
      </Link>
      <button 
        onClick={() => {
          dispatch(addToCart(product))
        }} 
        className="flex gap-2 items-center p-3 rounded cursor-pointer w-fit"
      >
        <span><FaCartPlus /></span> Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
