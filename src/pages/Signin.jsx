import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/authSlice";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate("/"); // ✅ now it will trigger as soon as token updates
    }
  }, [token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="max-h-screen flex">
      <div className="w-1/2 flex justify-center items-center h-screen">
        <img src="feastly.png" alt="logo" className="w-[50%]" />
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center h-screen bg-primary text-white">
        <div className="w-full p-10 flex flex-col gap-3">
          <h1 className="text-3xl text-center">Signin to Feastly</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              className="input text-black p-2 rounded"
              placeholder="Enter Your E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="input text-black p-2 rounded"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-400 text-sm text-center mt-2">{error}</p>}

            <div className="flex gap-2 justify-center items-center mt-3">
              <button
                type="submit"
                disabled={isLoading}
                className="border rounded-md bg-white text-primary cursor-pointer p-2 transition-all flex items-center justify-center gap-2 text-xl disabled:opacity-60"
              >
                {isLoading ? "Signing in..." : "Signin"}
              </button>
              <Link to="/signup" className="underline text-sm">
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
