import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import feastly from "../assets/feastly.png";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts, fetchProducts } from "../features/productsSlice";
import { logout } from "../features/authSlice";
import { clearCart } from "../features/cartSlice";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { amount } = useSelector((state) => state.cart);
  const { token} = useSelector((state) => state.auth);

  // Handle scroll for glass effect intensity or size change if needed
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchTerm.trim()) {
      dispatch(searchProducts(searchTerm));
    } else {
      dispatch(fetchProducts());
    }
  }, [searchTerm, dispatch]);

  const handleSearchInputChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(logout());
    navigate("/signin");
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass shadow-sm py-2"
          : "bg-white/50 backdrop-blur-md py-4"
      }`}
    >
      <div className="container mx-auto px-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src={feastly}
              alt="Feastly"
              className={`transition-all duration-300 ${
                isScrolled ? "w-16" : "w-20"
              }`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center gap-8 items-center">
            <Link
              to="/products"
              className="text-slate-600 hover:text-primary font-medium hover:bg-primary/10 px-4 py-2 rounded-full transition-all"
            >
              Menu
            </Link>

            {/* Search Bar - refined */}
            {location.pathname === "/products" && (
              <div className="relative group w-[300px]">
                <input
                  type="text"
                  placeholder="Craving something specific?"
                  className="w-full bg-slate-100 border border-transparent focus:bg-white focus:border-primary/50 text-sm rounded-full pl-4 pr-10 py-2 outline-none transition-all shadow-inner focus:shadow-lg"
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                />
                <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
              </div>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Cart */}
            <button
              onClick={() =>
                token
                  ? navigate("/cart")
                  : navigate("/signin", { state: { from: location.pathname } })
              }
              className="relative p-3 rounded-full hover:bg-slate-100 transition-colors group cursor-pointer"
              aria-label="Cart"
            >
              <FaShoppingCart className="text-xl text-slate-600 group-hover:text-primary transition-colors" />
              {amount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md animate-bounce">
                  {amount}
                </span>
              )}
            </button>

            {/* Auth */}
            {token ? (
              <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-slate-500 hover:text-red-500 transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/signin"
                  className="text-slate-600 font-medium hover:text-primary px-4 py-2 transition-colors cursor-pointer"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-full font-medium shadow-lg shadow-primary/30 transition-all hover:scale-105 cursor-pointer"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={() =>
                token
                  ? navigate("/cart")
                  : navigate("/signin", { state: { from: location.pathname } })
              }
              className="relative p-2 cursor-pointer"
            >
              <FaShoppingCart className="text-xl text-slate-700" />
              {amount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {amount}
                </span>
              )}
            </button>
            {/* Mobile Menu logic would nominally go here, keeping simple for now */}
            <Link to="/products" className="text-primary font-medium">
              Menu
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
