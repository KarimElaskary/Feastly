import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent link navigation
    if (token) {
      dispatch(addToCart(product));
    } else {
      navigate("/signin", { state: { from: location.pathname } });
    }
  };

  return (
    <div className="group relative bg-white/60 backdrop-blur-md rounded-3xl p-4 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 border border-white/50 h-full w-80 flex flex-col">
      <Link to={`/product/${product.id}`} className="flex flex-col h-full">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-2xl h-[220px] mb-4">
          <img
            src={product.imagesUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Badge Example - could be dynamic */}
          <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
            ${product.price}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow">
          <h1 className="text-xl font-bold text-slate-800 mb-2 truncate group-hover:text-primary transition-colors">
            {product.name}
          </h1>
          <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-grow">
            Delicious and freshly made just for you.
          </p>

          {/* Action */}
          <div className="mt-auto">
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-primary text-slate-700 hover:text-white py-3 rounded-xl font-semibold transition-all duration-300 group/btn"
            >
              <FaCartPlus className="text-lg transition-transform group-hover/btn:scale-110" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
