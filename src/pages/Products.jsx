// src/Products.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/productsSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader'

const Products = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  return (
    <div>
      {status === 'loading' && <Loader />}
      {status === 'failed' && <p>Error: {error}</p>}
      <div>
        {status === 'succeeded' && (
          <div className="flex flex-wrap gap-4 justify-center px-5 md:container my-[50px] mx-auto">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
