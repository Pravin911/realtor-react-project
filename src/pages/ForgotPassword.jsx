import { useState } from "react";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import { toast } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  function onChange(e) {
    setEmail(e.target.value);
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success('Email has been sent');
    } catch (error) {
      console.error('Error sending password reset email:', error.message);
      toast.error('Could not reset password');
    }
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl text-center mt-6 font-bold">Forgot Password</h1>
      <div className="flex flex-col md:flex-row items-center justify-center mt-8 mx-6 max-w-6xl">
        <div className="md:w-2/3 lg:w-2/3 mb-12 md:mb-0">
          <img
            src="https://img.freepik.com/premium-vector/data-security-flat-style-design-vector-illustration-stock-illustration_357500-150.jpg?w=900"
            alt="key illustration"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-1/3 lg:w-1/3 ml-6">
          <form onSubmit={onSubmit}>
            <div className="mb-6">
              <input
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out focus:outline-none focus:ring focus:border-blue-300"
                type="email"
                id="email"
                placeholder="Email address"
                value={email}
                onChange={onChange}
              />
            </div>

            <div className="flex justify-between text-sm">
              <p className="mb-6">
                Don't have an account?{" "}
                <Link
                  to="/sign-up"
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out"
                >
                  Sign Up
                </Link>
              </p>
              <p className="mb-6">
                <Link
                  to="/sign-in"
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out"
                >
                  Sign in instead
                </Link>
              </p>
            </div>

            <div>
              <button
                className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800"
                type="submit"
              >
                Send reset password
              </button>
            </div>

            <div className="my-4 flex items-center border-t border-gray-300">
              <p className="text-center font-semibold mt-4 w-full text-white">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
}
