import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/authSlice";
import pizza from "../assets/pizza.jpg"; // Using an existing asset

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(
      register({
        name: formData.name,
        email: formData.email,
        address: formData.address,
        phone: formData.phoneNumber,
        password: formData.password,
      })
    );

    if (result.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Visual Section */}
      <div className="hidden md:flex md:w-1/2 relative overflow-hidden">
        <img
          src={pizza}
          alt="Signup Background"
          className="absolute inset-0 w-full h-full object-cover animate-[scale_20s_ease-in-out_infinite]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/80 to-primary/40 backdrop-blur-[2px] flex flex-col justify-center items-center text-white p-12 text-center">
          <h2 className="text-5xl font-bold mb-6 drop-shadow-lg">
            Join the Feast
          </h2>
          <p className="text-xl font-light max-w-md leading-relaxed">
            Create an account to unlock exclusive deals, track your orders, and
            satisfy your cravings in style.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center min-h-screen bg-slate-50 p-6 relative overflow-hidden">
        {/* Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="w-full max-w-md z-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-slate-800 mb-2">
              Create Account
            </h1>
            <p className="text-slate-500">Sign up to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="group">
              <input
                id="name"
                type="text"
                name="name"
                className="input"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="group">
              <input
                id="email"
                type="email"
                name="email"
                className="input"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="group">
              <input
                id="address"
                type="text"
                name="address"
                className="input"
                placeholder="Delivery Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="group">
              <input
                id="phoneNumber"
                type="tel"
                name="phoneNumber"
                className="input"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="group">
              <input
                id="password"
                type="password"
                name="password"
                className="input"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
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
              className="w-full bg-gradient-to-r from-primary to-primary-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>

            <div className="text-center mt-6">
              <p className="text-slate-500">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-primary font-semibold hover:underline underline-offset-4"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
