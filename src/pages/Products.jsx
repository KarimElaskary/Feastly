import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/productsSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

const Products = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const categories = ['All', 'Pizza', 'Seafood', 'Burger'];
console.log("selectedCategory" , selectedCategory)
  // Fetch products on mount or when status is idle
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.brand.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  }, [products, selectedCategory]);

  // Handler for clicking filter buttons
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="p-4">
  
      <div className="flex gap-3 mb-6 justify-center">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 border rounded 
              ${
                selectedCategory === category
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-primary border-gray-300 hover:bg-primary hover:text-white'
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Loading and Error */}
      {status === 'loading' && <Loader />}
      {status === 'failed' && <p className="text-red-600 text-center">{error}</p>}

      {/* Products Grid */}
      {status === 'succeeded' && (
        filteredProducts.length > 0 ? (
          <div className="flex flex-wrap gap-6 justify-center">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center">No products found in this category.</p>
        )
      )}
    </div>
  );
};

export default Products;
