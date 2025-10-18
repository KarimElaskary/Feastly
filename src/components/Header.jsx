import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser } from 'react-icons/fa';
import feastly from '../assets/feastly.png';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts, fetchProducts } from '../features/productsSlice';
import { logout } from '../features/authSlice';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get cart and auth states
  const { amount } = useSelector((state) => state.cart);
  const { token, user } = useSelector((state) => state.auth);

  // ✅ Handle product search
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

  // ✅ Logout function
  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin');
  };

  return (
    <div className='bg-white shadow-md sticky top-0 z-50'>
      <div className='md:container mx-auto'>
        <div className='flex items-center justify-between h-20 px-5 relative'>
          {/* Logo */}
          <Link to='/'>
            <img src={feastly} alt='Feastly' className='w-[80px]' />
          </Link>

          {/* ✅ Desktop Menu */}
          <div className='hidden md:flex gap-5 items-center text-primary'>
            <Link
              to='/products'
              className='text-xl hover:underline hover:underline-offset-4 rounded-lg p-2 transition-all'
            >
              Products
            </Link>

            {/* Search input only on /products */}
            {location.pathname === '/products' && (
              <div className='text-primary relative p-2 border rounded'>
                <input
                  type='text'
                  placeholder='What are you looking for?'
                  className='rounded border-0 outline-0 w-[250px]'
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                />
                <FaSearch className='absolute top-3 right-2' />
              </div>
            )}

            {/* Cart */}
            <div className='relative'>
              <Link to='/cart'>
                <FaShoppingCart className='text-3xl' />
                <span className='absolute -top-2 -right-2 bg-white border border-primary text-primary text-xs w-5 h-5 flex items-center justify-center rounded-full'>
                  {amount}
                </span>
              </Link>
            </div>

            {/* ✅ Auth Section */}
            {token ? (
              <div className='flex items-center gap-3'>
                <FaUser className='text-2xl' />
                <span className='text-lg'>{user?.name || 'User'}</span>
                <button
                  onClick={handleLogout}
                  className='border px-3 py-1 cursor-pointer rounded-md hover:bg-primary hover:text-white transition-all'
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to='/signin'
                className='border px-3 py-1 rounded-md hover:bg-primary hover:text-white transition-all'
              >
                Sign in
              </Link>
            )}
          </div>

          {/* ✅ Mobile Layout */}
          <div className='flex items-center gap-3 md:hidden text-primary flex-1 justify-end'>
            {location.pathname === '/products' ? (
              <div className='flex-1 relative border rounded p-1'>
                <input
                  type='text'
                  placeholder='Search...'
                  className='outline-0 w-full pr-8 text-sm'
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                />
                <FaSearch className='absolute top-2 right-2 text-primary' />
              </div>
            ) : (
              <Link
                to='/products'
                className='text-xl hover:underline hover:underline-offset-4 rounded-lg p-2 transition-all'
              >
                Products
              </Link>
            )}

            <Link to='/cart' className='relative'>
              <FaShoppingCart className='text-2xl' />
              <span className='absolute -top-2 -right-2 bg-white border border-primary text-primary text-xs w-5 h-5 flex items-center justify-center rounded-full'>
                {amount}
              </span>
            </Link>

            {/* ✅ Auth Mobile */}
            {token ? (
              <button onClick={handleLogout} className='text-sm underline'>
                Logout
              </button>
            ) : (
              <Link to='/signin' className='text-sm underline'>
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
