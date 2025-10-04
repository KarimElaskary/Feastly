import React from "react";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ProductDetails from "./components/ProductDetails";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";

const App = () => {
  const { token } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <div className="min-h-screen">
        {token && <Header />}

        <Routes>
          {/* Public routes */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Products />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<h1>404 - Not Found</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
