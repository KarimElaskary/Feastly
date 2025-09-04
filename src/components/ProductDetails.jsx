import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from './Loader';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://e-commerce9.runasp.net/api/Products/${id}`);
        setProduct(response.data.data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div><Loader/></div>;
  }

  if (!product) {
    return <div className="text-center mt-10 text-red-500">Product not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Product Details</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.imagesUrl}
          alt={product.name}
          className="w-full md:w-1/3 object-cover rounded-md shadow-sm"
        />
        <div className="flex-1">
          <p><span className="font-semibold">ID:</span> {product.id}</p>
          <p><span className="font-semibold">Title:</span> {product.name}</p>
          <p><span className="font-semibold">Description:</span> {product.description}</p>
          <p><span className="font-semibold">Category:</span> {product.brand}</p>
          <p><span className="font-semibold">Price:</span> ${product.price}</p>
          {/* <p><span className="font-semibold">Rating:</span> ⭐ {product.rating}</p> */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
