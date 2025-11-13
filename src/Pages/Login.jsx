import React, { useContext, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";
import { IoEyeOff } from "react-icons/io5";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";

const Login = () => {
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  const { signInWithEmailAndPasswordFunc, signInWithEmailFunc, setUser } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from || "/";
  const emailRef = useRef(null);
  const [show, setShow] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setUser(null);
    // You can add your authentication logic here
    signInWithEmailAndPasswordFunc(email, password)
      .then((res) => {
        setUser(null);
        if (!res.user.emailVerified) {
          Swal.fire("Email not verified");
          //toast.error("Email not verified");
          return;
        }
        setUser(res.user);
        Swal.fire("Login Successful");
        //toast.success("Login Successful");
        navigate(redirectPath, { replace: true });
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithEmailFunc()
      .then((res) => {
        setUser(res.user);

        Swal.fire("Login Successful");
        //toast.success("Login Successful");
        navigate(redirectPath, { replace: true });
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 ">
      <div className="bg-gray-800 w-full max-w-md shadow-lg rounded-2xl m-2">
        <h2 className="text-gray-100 text-3xl font-bold text-center my-6">
          Welcome Back
        </h2>
        <p className="text-gray-100 text-center mb-8">
          Log in to continue exploring your favorite pet.
        </p>

        <form onSubmit={handleLogin} className="space-y-5 p-6">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-50">
              Email
            </label>
            <input
              type="email"
              name="email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              ref={emailRef}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-1 text-gray-50">
              Password
            </label>
            <input
              type={show ? "text" : "password"}
              name="password"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute right-3 top-10 cursor-pointer z-50"
            >
              {show ? <FaEye></FaEye> : <IoEyeOff></IoEyeOff>}
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all"
          >
            Log In
          </button>
        </form>

        <div className="flex items-center my-2">
          <div className="grow border-t border-gray-300"></div>
          <span className="mx-2 text-gray-500 text-sm">or</span>
          <div className="grow border-t border-gray-300"></div>
        </div>
        <div className="flex flex-col gap-3 mx-6">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-3  bg-white text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-100 transition cursor-pointer"
          >
            <FcGoogle className="text-2xl" /> Continue with Google
          </button>
          <p className="text-gray-400 text-center my-6">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
