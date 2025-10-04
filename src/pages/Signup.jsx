import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/authSlice";

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
    <div className="max-h-screen flex">
      <div className="w-1/2 flex justify-center items-center h-screen">
        <img src="feastly.png" alt="logo" className="w-[50%]" />
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center h-screen bg-primary text-white">
        <form
          onSubmit={handleSubmit}
          className="w-full p-10 flex flex-col gap-3"
        >
          <h1 className="text-3xl text-center">Signup to Feastly</h1>

          <label>Name</label>
          <input
            type="text"
            name="name"
            className="input"
            placeholder="Enter Your Fullname"
            value={formData.name}
            onChange={handleChange}
          />

          <label>E-mail</label>
          <input
            type="text"
            name="email"
            className="input"
            placeholder="Enter Your E-mail"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Address</label>
          <input
            type="text"
            name="address"
            className="input"
            placeholder="Enter Your address"
            value={formData.address}
            onChange={handleChange}
          />

          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            className="input"
            placeholder="Enter Your Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Enter Your Password"
            value={formData.password}
            onChange={handleChange}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex gap-2 justify-center items-center">
            <button
              type="submit"
              disabled={isLoading}
              className="border rounded-md bg-white text-primary cursor-pointer p-2 transition-all flex items-center justify-center gap-2 text-xl"
            >
              {isLoading ? "Signing up..." : "Signup"}
            </button>
            <Link to="/signin" className="underline">
              Already have account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
