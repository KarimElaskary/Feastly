import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const Error = () => {
  return (
    <div className="container mx-auto">
        <Link
          to={"/products"}
          className="flex items-center font-semibold mb-5 hover:underline hover:underline-offset-2"
        >
          <IoIosArrowBack /> Back to products
        </Link>
      <div className="w-full min-h-screen flex items-center justify-center">
        <h1>Page not found!</h1>
      </div>
    </div>
  );
};

export default Error;
