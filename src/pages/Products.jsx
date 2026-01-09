import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productsSlice";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

const Products = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const categories = ["All", "Pizza", "Seafood", "Burger"];

  // Fetch products on mount or when status is idle
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (products && Array.isArray(products)) {
      if (selectedCategory === "All") {
        setFilteredProducts(products);
      } else {
        const filtered = products.filter(
          (product) =>
            product.brand.toLowerCase() === selectedCategory.toLowerCase()
        );
        setFilteredProducts(filtered);
      }
    }
  }, [products, selectedCategory]);

  return (
    <div className="min-h-screen bg-transparent py-12 px-4 md:px-8">
      {/* Header Section */}
      <div className="text-center mb-12 animate-[fadeIn_0.5s_ease-out]">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
          Our{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Menu
          </span>
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
          Explore our curated selection of mouth-watering dishes, crafted with
          passion and the finest ingredients.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center mb-12 overflow-x-auto pb-4 md:pb-0 hide-scrollbar animate-[slideUp_0.5s_ease-out_both] delay-[100ms]">
        <div className="bg-white/50 backdrop-blur-md p-1.5 rounded-full shadow-sm border border-white/40 flex gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full cursor-pointer text-sm font-semibold transition-all duration-300 relative overflow-hidden ${
                selectedCategory === category
                  ? "bg-primary text-white shadow-md shadow-primary/20 scale-105"
                  : "text-slate-600 hover:text-primary hover:bg-white/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto">
        {status === "loading" && (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        )}

        {status === "failed" && (
          <div className="text-center py-20">
            <div className="text-red-500 text-6xl mb-4 text-center mx-auto">
              ⚠️
            </div>
            <p className="text-slate-800 text-xl font-bold mb-2">
              Oops! Something went wrong.
            </p>
            <p className="text-slate-500">{error}</p>
          </div>
        )}

        {status === "succeeded" && (
          <>
            {filteredProducts && filteredProducts.length > 0 ? (
              <div className="flex flex-wrap gap-8 justify-center animate-[fadeIn_0.5s_ease-out] delay-[200ms]">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 animate-[fadeIn_0.5s_ease-out]">
                <div className="text-6xl mb-4">🍽️</div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  No items found
                </h3>
                <p className="text-slate-500">
                  Try selecting a different category.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
