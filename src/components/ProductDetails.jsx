import React, { useState, useEffect, use } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import { IoIosArrowBack } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://e-commerce9.runasp.net/api/Products/${id}`
        );
        setProduct(response.data.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <Loader />;

  if (!product) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4">
        <h2 className="text-3xl font-bold text-slate-800">Product Not Found</h2>
        <Link
          to="/products"
          className="text-primary hover:underline underline-offset-4 font-semibold"
        >
          Return to Menu
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (token) {
      dispatch(addToCart(product));
    } else {
      navigate("/signin", { state: { from: location.pathname } });
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 lg:py-20 animate-[fadeIn_0.5s_ease-out]">
      <Link
        to="/products"
        className="inline-flex items-center text-slate-500 hover:text-primary transition-colors mb-8 group"
      >
        <IoIosArrowBack className="group-hover:-translate-x-1 transition-transform" />
        <span className="ml-1 font-medium">Back to Menu</span>
      </Link>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 relative group perspective-1000">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-[2.5rem] blur-3xl -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
          <img
            src={product.imagesUrl}
            alt={product.name}
            className="w-full h-auto object-cover rounded-[2.5rem] shadow-2xl shadow-primary/20 transform transition-transform duration-500 hover:scale-[1.02] hover:rotate-1"
          />
        </div>

        {/* Details Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm tracking-widest uppercase mb-4 w-fit">
            {product.brand}
          </span>

          <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            {product.name}
          </h1>

          <p className="text-slate-600 text-lg leading-relaxed mb-8 border-l-4 border-primary/30 pl-6">
            {product.description}
            <br />
            <span className="block mt-4 text-sm text-slate-400 italic">
              Freshly prepared with premium ingredients.
            </span>
          </p>

          <div className="flex items-center gap-8 mb-10">
            <div className="flex flex-col">
              <span className="text-sm text-slate-500 font-medium uppercase tracking-wider">
                Price
              </span>
              <span className="text-4xl font-bold text-primary">
                ${product.price}
              </span>
            </div>
            <div className="flex flex-col">
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary-dark text-white text-lg font-bold py-4 px-10 rounded-2xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <FaCartPlus className="text-2xl" />
            Add to Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
