import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/authSlice";
import whitelogo from '../assets/whitelogo.png';

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

  // handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle form submit
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
      navigate("/"); // redirect to homepage on success
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Logo Section - Hidden on mobile, shown on medium+ screens */}
      <div className="hidden md:flex md:w-1/2 justify-center items-center h-screen">
        <img src="feastly.png" alt="logo" className="w-[50%]" />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center min-h-screen bg-primary text-white py-8">
        <div className="w-full p-6 md:p-10 flex flex-col gap-3 max-w-md overflow-y-auto">
          {/* Mobile Logo - Only shown on mobile */}
          <div className="flex justify-center mb-4 md:hidden">
            <img src={whitelogo} alt="logo" className="w-32" />
          </div>

          <h1 className="text-2xl md:text-3xl text-center font-semibold mb-2">
            Signup to Feastly
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label htmlFor="name" className="text-sm md:text-base">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              className="input text-black p-3 rounded focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter Your Fullname"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email" className="text-sm md:text-base">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              name="email"
              className="input text-black p-3 rounded focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter Your E-mail"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="address" className="text-sm md:text-base">
              Address
            </label>
            <input
              id="address"
              type="text"
              name="address"
              className="input text-black p-3 rounded focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter Your Address"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <label htmlFor="phoneNumber" className="text-sm md:text-base">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="tel"
              name="phoneNumber"
              className="input text-black p-3 rounded focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter Your Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />

            <label htmlFor="password" className="text-sm md:text-base">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="input text-black p-3 rounded focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {error && (
              <p className="text-white text-sm text-center bg-red-500 bg-opacity-20 p-2 rounded">
                {error}
              </p>
            )}

            <div className="flex flex-col md:flex-row gap-3 md:gap-2 justify-center items-center mt-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full md:w-auto border rounded-md bg-white text-primary cursor-pointer px-6 py-2 transition-all flex items-center justify-center gap-2 text-lg md:text-xl disabled:opacity-60 hover:bg-opacity-90"
              >
                {isLoading ? "Signing up..." : "Signup"}
              </button>
              <Link to="/signin" className="underline text-sm hover:text-gray-200">
                Already have account? Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;