import React, { useState, useEffect, use } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Loader from './Loader'
import { IoIosArrowBack } from 'react-icons/io'
import { FaCartPlus } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import { addToCart } from '../features/cartSlice'

const ProductDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://e-commerce9.runasp.net/api/Products/${id}`
        )
        setProduct(response.data.data)
      } catch (error) {
        console.error('Failed to fetch product:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    )
  }

  if (!product) {
    return (
      <div className='text-center mt-10 text-primary'>Product not found.</div>
    )
  }

  return (
    <div className='max-w-4xl mx-auto mt-10 p-6 text-primary'>
      <Link to={'/products'} className='flex items-center font-semibold mb-5 hover:underline hover:underline-offset-2'>
        <IoIosArrowBack /> Back to products
      </Link>
      <h1 className='text-4xl font-bold text-center mb-5'>Product Details</h1>
      <div className='flex-1 flex flex-col gap-6 items-center'>
        <img
          src={product.imagesUrl}
          alt={product.name}
          className='w-[300px] md:w-[500px] object-cover'
        />
      <h1 className='text-3xl font-bold mb-5 text-center'>{product.name}</h1>
        <div className='flex-1 w-full p-2 border rounded-lg'>
          <p>
            <span className='font-semibold'>ID:</span> {product.id}
          </p>
          <p>
            <span className='font-semibold'>Description:</span>{' '}
            {product.description}
          </p>
          <p>
            <span className='font-semibold'>Category:</span> {product.brand}
          </p>
          <p>
            <span className='font-semibold'>Price:</span> ${product.price}
          </p>
          {/* <p><span className="font-semibold">Rating:</span> ⭐ {product.rating}</p> */}
        </div>
        <button onClick={() => {
          dispatch(addToCart(product))
        }} className='w-full border rounded-md hover:bg-primary hover:text-white cursor-pointer p-2 transition-all flex items-center justify-center gap-2 text-xl'>
          <FaCartPlus /> Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductDetails
