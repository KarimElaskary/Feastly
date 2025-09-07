// src/components/ProductCard.js

import React from 'react'
import { Link } from 'react-router-dom'
import { FaCartPlus } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import { addToCart } from '../features/cartSlice' // adjust path if needed

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()

  return (
    <div className='flex flex-col w-[300px] p-5 bg-white rounded-2xl text-primary hover:text-white hover:bg-primary transition-all duration-300 ease-out border-2 border-primary hover:-translate-y-2 hover:-translate-x-2 hover:shadow-xl hover:scale-[1.02]'>
      <Link to={`/product/${product.id}`}>
        <img
          src={product.imagesUrl}
          alt={product.name}
          className='w-[300px] h-[200px]'
        />
        <h1>{product.name}</h1>
        <p>Price: ${product.price}</p>
      </Link>
      <button
        onClick={() => {
          dispatch(addToCart(product))
        }}
        className='flex gap-2 items-center p-3 rounded cursor-pointer w-fit'
      >
        <span>
          <FaCartPlus />
        </span>{' '}
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard
