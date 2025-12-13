import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authSlice";
import whitelogo from "../assets/whitelogo.png";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const { token, isLoading, error, justLoggedIn } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dispatching login with:", { email, password });
    dispatch(login({ email, password }));
  };

  // Redirect if already logged in (when user manually navigates to /signin)
  useEffect(() => {
    if (token && !justLoggedIn) {
      console.log("Already logged in, redirecting to", from);
      navigate(from, { replace: true });
    }
  }, [token, justLoggedIn, navigate]);

  // Redirect after successful login
  useEffect(() => {
    if (justLoggedIn && token) {
      console.log("Just logged in successfully, navigating to", from);
      navigate(from, { replace: true });
    }
  }, [justLoggedIn, token, navigate]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Logo Section - Hidden on mobile, shown on medium+ screens */}
      <div className="hidden md:flex md:w-1/2 justify-center items-center h-screen">
        <img src="feastly.png" alt="logo" className="w-[50%]" />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center min-h-screen bg-primary text-white">
        <div className="w-full p-6 md:p-10 flex flex-col gap-3 max-w-md">
          {/* Mobile Logo - Only shown on mobile */}
          <div className="flex justify-center mb-4 md:hidden">
            <img src={whitelogo} alt="logo" className="w-32" />
          </div>

          <h1 className="text-2xl md:text-3xl text-center font-semibold">
            Signin to Feastly
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-4">
            <label htmlFor="email" className="text-sm md:text-base">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              className="input text-black p-3 rounded focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter Your E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password" className="text-sm md:text-base">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="input text-black p-3 rounded focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <p className="text-white text-sm text-center mt-2 bg-red-500 bg-opacity-20 p-2 rounded">
                {error}
              </p>
            )}

            <div className="flex flex-col md:flex-row gap-3 md:gap-2 justify-center items-center mt-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full md:w-auto border rounded-md bg-white text-primary cursor-pointer px-6 py-2 transition-all flex items-center justify-center gap-2 text-lg md:text-xl disabled:opacity-60 hover:bg-opacity-90"
              >
                {isLoading ? "Signing in..." : "Signin"}
              </button>
              <Link
                to="/signup"
                className="underline text-sm hover:text-gray-200"
              >
                Or create an account here!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
