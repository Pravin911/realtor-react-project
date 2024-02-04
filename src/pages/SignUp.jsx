import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };


  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>
      <div className="flex justify-center items-center mt-8 mx-6 max-w-6xl">
        <div className="md:w-2/3 lg:w-2/3 mb-12 md:mb-6">
          <img
            src="https://plus.unsplash.com/premium_photo-1679857930663-e7c840a031ec?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8a2V5fGVufDB8fDB8fHww"
            alt="key illustration"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-1/3 lg:w-1/3 ml-6">
          <form>

          <div className="mb-6">
              <input
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                type="text"
                id="name"
                placeholder="Username"
                value={name}
                onChange={onChange}
              />
            </div>

            <div className="mb-6">
              <input
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                type="email"
                id="email"
                placeholder="Email address"
                value={email}
                onChange={onChange}
              />
            </div>

            <div className="relative mb-6">
              <input
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                value={password}
                onChange={onChange}
              />
              {showPassword ? (
                <FaEyeSlash
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <FaEye
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>

            <div className="flex justify-between text-sm">
              <p className="mb-6">
                Have an account?{" "}
                <Link
                  to="/sign-in"
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out"
                >
                  Sign In
                </Link>
              </p>
              <p className="mb-6">
                <Link
                  to="/forgot-password"
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
                >
                  Forgot Password?
                </Link>
              </p>
            </div>

            <div>
              <button
                className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
                type="submit"
              >
                Sign Up
              </button>
            </div>

            <div className="my-4 flex items-center border-t border-gray-300">
              <p className="text-center font-semibold mt-4 w-full">OR</p>
            </div>
                <OAuth/>
          </form>
        </div>
      </div>
    </section>
  );
}
