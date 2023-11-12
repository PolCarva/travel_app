import React from "react";
import { Link } from "react-router-dom";
import { ImCompass2 } from "react-icons/im";

const ErrorPage = () => {
  return (
    <div className="h-screen overflow-hidden relative">
      <div className="h-full flex flex-col justify-center items-center text-center relative z-10">
        <h1 className="font-black text-gray-100 text-9xl">404</h1>
        <p className="text-2xl font-bold tracking-tight text-black sm:text-4xl">Uh-oh!</p>
        <p className="mt-4 text-gray-600">We can't find that page.</p>

        <Link
          to="/"
          className="py-4 px-8 mt-5 hover:bg-black-hover transition-colors ease-in-out rounded-xl flex items-center justify-center text-xl font-medium bg-black text-white"
        >
          Go Back Home
        </Link>
      </div>

      <ImCompass2 className="text-gray-10 compassAnimation w-full h-full aspect-square top-0 right-0 scale-90 absolute z-0" />
    </div>
  );
};

export default ErrorPage;
