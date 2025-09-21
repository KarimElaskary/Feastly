import React from 'react'
import Header from './components/Header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Cart from './pages/Cart'
import UserProfile from './components/UserProfile'
import ProductDetails from './components/ProductDetails'
import ProtectedRoute from './components/ProtectedRoute'
import { useUserCart } from './hooks/useUserCart'

const App = () => {
  // Initialize user cart management
  useUserCart()

  return (
    <BrowserRouter>
      <div className='min-h-screen'>
        <Header />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Products' element={<Products />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='*' element={<h1>404</h1>} />
          <Route
            path='user'
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route path='/product/:id' element={<ProductDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
