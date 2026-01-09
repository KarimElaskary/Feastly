import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authSlice";
import burger from "../assets/burger.jpg";

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
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (token && !justLoggedIn) {
      navigate(from, { replace: true });
    }
  }, [token, justLoggedIn, navigate, from]);

  useEffect(() => {
    if (justLoggedIn && token) {
      navigate(from, { replace: true });
    }
  }, [justLoggedIn, token, navigate, from]);

  return (
    <div className="min-h-screen flex font-sans">
      {/* Visual Section */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
        <img
          src={burger}
          alt="Signin Background"
          className="absolute inset-0 w-full h-full object-cover animate-[scale_20s_ease-in-out_infinite] animation-delay-2000"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/80 to-primary/40 backdrop-blur-[2px] flex flex-col justify-center items-center text-white p-12 text-center">
          <h2 className="text-5xl font-bold mb-6 drop-shadow-lg">
            Welcome Back
          </h2>
          <p className="text-xl font-light max-w-md leading-relaxed">
            Sign in to continue your hungry journey. Your favorites are waiting
            for you.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center min-h-screen bg-slate-50 p-6 relative overflow-hidden">
        {/* Decoration */}
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="w-full max-w-md z-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Sign In</h1>
            <p className="text-slate-500">Access your account</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="group">
              <input
                id="email"
                type="email"
                className="input"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="group">
              <input
                id="password"
                type="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg text-center animate-pulse">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            <div className="text-center mt-6">
              <p className="text-slate-500">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-primary font-semibold hover:underline underline-offset-4"
                >
                  Create one here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signin;
