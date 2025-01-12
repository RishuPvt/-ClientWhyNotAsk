import React from "react";
import { Link } from "react-router-dom";
const Login: React.FC = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full flex flex-col md:flex-row h-screen">
      {/* Sign Up Section */}
      <div
        className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-gray-100 rounded-t-lg md:rounded-l-lg md:rounded-t-none h-full relative"
        style={{
          backgroundImage:
            "url(https://www.vhv.rs/file/max/35/355017_graphic-design-png.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold text-indigo-600 mb-12 text-center">
            #WhyNotAsk
          </h1>
          <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-4">
            Welcome!
          </h2>
          <p className="text-gray-800 text-center font-extrabold mb-6">
            Join us today and explore new possibilities.
          </p>
          <p className="text-gray-800 text-center font-extrabold mb-6 italic">
            "Don't be afraid to ask. Don't assume you know the answer."
          </p>
          <div className="flex justify-center">
            <Link
              to="signup"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Login Section */}
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center h-full relative">
        <div className="p-6 w-full md:w-[80%] lg:w-[60%] flex flex-col justify-center mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-4">
            Welcome Back
          </h2>
          <p className="text-base text-gray-500 text-center mb-6">
            Please enter your credentials to log in to your account.
          </p>
          <form className="flex flex-col justify-center">
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex items-center justify-between">
              <Link to="/home">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
