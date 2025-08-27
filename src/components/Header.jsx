import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import feastly from "../assets/feastly.png";
import { useDispatch, useSelector } from "react-redux"; // ✅ added useSelector
import { searchProducts } from "../features/productsSlice";

const Header = () => {
  const [active, setActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  // ✅ Get cart amount from Redux store
  const cartAmount = useSelector((state) => state.cart.amount);

  useEffect(() => {
    dispatch(searchProducts(searchTerm));
  }, [searchTerm, dispatch]);

  const handleSearchInputChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="md:container mx-auto">
        <div className="flex items-center justify-between h-20 px-5 relative">
          <Link to="/">
            <img src={feastly} alt="Feastly" className="w-[80px]" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-5 items-center text-primary">
            <Link
              to="/products"
              className="hover:bg-primary hover:text-white rounded-lg p-2 transition-all"
            >
              products
            </Link>
            <div className="text-primary relative p-2 border rounded">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="rounded border-0 outline-0 w-[250px]"
                value={searchTerm}
                onChange={handleSearchInputChange}
              />
              <FaSearch className="absolute top-3 right-2" />
            </div>

            {/* ✅ Cart Icon with amount */}
            <div className="relative">
              <Link to="/cart">
                <FaShoppingCart className="text-3xl" />
                <span className="absolute -top-2 -right-2 bg-white border border-primary text-primary text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartAmount}
                </span>
              </Link>
            </div>

            <Link to="/user" className="hidden">
              <FaUser className="text-3xl" />
            </Link>
          </div>

          {/* Mobile Icons */}
          <div className="flex items-center gap-4 md:hidden text-primary">
            <Link to="/user" className="hidden">
              <FaUser className="text-3xl" />
            </Link>
            <Link to="/cart" className="relative">
              <FaShoppingCart className="text-2xl" />
              <span className="absolute -top-2 -right-2 bg-white border border-primary text-primary text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartAmount}
              </span>
            </Link>
            <IoMdMenu
              className="text-3xl cursor-pointer"
              onClick={() => setActive(!active)}
            />
          </div>

          {/* Mobile Dropdown Menu */}
          {active && (
            <div className="absolute top-20 left-0 w-full bg-primary p-5 md:hidden flex flex-col gap-4 text-white">
              <Link to="/" onClick={() => setActive(false)}>
                home
              </Link>
              <Link to="/products" onClick={() => setActive(false)}>
                products
              </Link>
              <div className="relative border rounded p-1">
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className="outline-0 w-full pr-8 placeholder:text-[#ccc] text-[#ccc]"
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                />
                <FaSearch
                  onClick={() => {
                    setActive(false);
                  }}
                  className="absolute top-2 right-2 cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
