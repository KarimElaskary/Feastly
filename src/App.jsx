import Header from "./components/Header";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ProductDetails from "./components/ProductDetails";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
};

// Separated component so `useLocation` can be used inside the Router
const MainApp = () => {
  const location = useLocation();
  // Hide header on signin/signup for cleaner UX
  const hideHeaderPaths = ["/signin", "/signup"];
  const shouldHideLayout = hideHeaderPaths.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {!shouldHideLayout && <Header />}

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/products" element={<Products />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route path="/product/:id" element={<ProductDetails />} />

          {/* Public Routes */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          {/* 404 Page */}
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </main>

      {!shouldHideLayout}
    </div>
  );
};
export default App;
