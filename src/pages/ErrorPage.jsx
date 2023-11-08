import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="grid h-screen px-4 bg-white place-content-center">
      <div className="text-center">
        <h1 className="font-black text-gray-10 text-9xl">404</h1>

        <p className="text-2xl font-bold tracking-tight text-black sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-50">We can't find that page.</p>

        <Link
          to="/"
          className="py-4 mt-5 hover:bg-black-hover transition-colors ease-in-out rounded-xl flex-1 flex items-center justify-center text-xl gap-2 font-medium bg-black text-white"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
