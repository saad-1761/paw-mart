// import React, { useContext, useRef, useState } from "react";
// import { FaEye } from "react-icons/fa";

// import { FcGoogle } from "react-icons/fc";
// import { IoEyeOff } from "react-icons/io5";
// import { AuthContext } from "../Context/AuthContext";
// import { toast } from "react-toastify";
// import { Link, useLocation, useNavigate } from "react-router";
// import Swal from "sweetalert2";

// const Login = () => {
//   //   const [email, setEmail] = useState("");
//   //   const [password, setPassword] = useState("");
//   const { signInWithEmailAndPasswordFunc, signInWithEmailFunc, setUser } =
//     useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const redirectPath = location.state?.from || "/";
//   const emailRef = useRef(null);
//   const [show, setShow] = useState(false);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const email = e.target.email.value;
//     const password = e.target.password.value;
//     setUser(null);
//     // You can add your authentication logic here
//     signInWithEmailAndPasswordFunc(email, password)
//       .then((res) => {
//         setUser(null);
//         if (!res.user.emailVerified) {
//           Swal.fire("Email not verified");
//           //toast.error("Email not verified");
//           return;
//         }
//         setUser(res.user);
//         Swal.fire("Login Successful");
//         //toast.success("Login Successful");
//         navigate(redirectPath, { replace: true });
//       })
//       .catch((e) => {
//         console.log(e);
//         Swal.fire("Error:", e.message);
//         //toast.error(e.message);
//       });
//   };

//   const handleGoogleSignIn = () => {
//     signInWithEmailFunc()
//       .then((res) => {
//         setUser(res.user);

//         Swal.fire("Login Successful");
//         //toast.success("Login Successful");
//         navigate(redirectPath, { replace: true });
//       })
//       .catch((e) => {
//         console.log(e);
//         toast.error(e.message);
//       });
//   };

//   return (
//     <div className="flex justify-center items-center  min-h-screen px-2 pb-6">
//       <div className=" bg-base-100 dark:bg-gray-800 w-full max-w-md shadow-lg rounded-2xl m-2">
//         <h2 className="text-gray-800 dark:text-gray-100 text-3xl font-bold text-center my-6">
//           Welcome Back
//         </h2>
//         <p className="text-gray-400 text-center mb-8">
//           Log in to continue exploring your favorite pet.
//         </p>

//         <form onSubmit={handleLogin} className="space-y-5 p-6">
//           <div>
//             <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-100">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               // value={email}
//               // onChange={(e) => setEmail(e.target.value)}
//               ref={emailRef}
//               placeholder="you@example.com"
//               className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div className="relative">
//             <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-100">
//               Password
//             </label>
//             <input
//               type={show ? "text" : "password"}
//               name="password"
//               // value={password}
//               // onChange={(e) => setPassword(e.target.value)}
//               placeholder="••••••••"
//               className="w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//             <span
//               onClick={() => setShow(!show)}
//               className="absolute right-3 top-10 cursor-pointer z-10"
//             >
//               {show ? <FaEye></FaEye> : <IoEyeOff></IoEyeOff>}
//             </span>
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all"
//           >
//             Log In
//           </button>
//         </form>

//         <div className="flex items-center">
//           <div className="grow border-t border-gray-300"></div>
//           <span className="mx-2 text-gray-500 text-sm">or</span>
//           <div className="grow border-t border-gray-300"></div>
//         </div>
//         <div className="flex flex-col gap-3 mx-6">
//           <button
//             onClick={handleGoogleSignIn}
//             className="flex items-center justify-center gap-3  bg-white text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-100 transition cursor-pointer"
//           >
//             <FcGoogle className="text-2xl" /> Continue with Google
//           </button>
//           <p className="text-gray-400 text-center mb-4">
//             Don’t have an account?{" "}
//             <Link to="/register" className="text-blue-700 hover:underline">
//               Register
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

// second attempt

import React, { useContext, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOff } from "react-icons/io5";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";

const Login = () => {
  const { signInWithEmailAndPasswordFunc, signInWithEmailFunc, setUser } =
    useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from || "/";
  const emailRef = useRef(null);

  const [show, setShow] = useState(false);

  // ✅ client-side validation states
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");

  // ✅ simple email check (your requirement: must contain @)
  const isEmailValid = (email) => email.includes("@");

  // ✅ password rule: upper + lower + number + special
  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    if (!hasUpper || !hasLower || !hasNumber || !hasSpecial) {
      return "Password must include: uppercase, lowercase, number, and special character.";
    }
    return "";
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    // ✅ reset errors
    setEmailError("");
    setPassError("");

    // ✅ client-side checks (BEFORE hitting server)
    let hasError = false;

    if (!isEmailValid(email)) {
      setEmailError("Invalid email format");
      hasError = true;
    }

    const passMsg = validatePassword(password);
    if (passMsg) {
      setPassError(passMsg);
      hasError = true;
    }

    if (hasError) return;

    // ✅ existing logic unchanged
    setUser(null);
    signInWithEmailAndPasswordFunc(email, password)
      .then((res) => {
        setUser(null);
        if (!res.user.emailVerified) {
          Swal.fire("Email not verified");
          return;
        }
        setUser(res.user);
        Swal.fire("Login Successful");
        navigate(redirectPath, { replace: true });
      })
      .catch((e) => {
        console.log(e);
        Swal.fire("Error:", e.message);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithEmailFunc()
      .then((res) => {
        setUser(res.user);
        Swal.fire("Login Successful");
        navigate(redirectPath, { replace: true });
      })
      .catch((e) => {
        console.log(e);
        toast.error(e.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-2 pb-6 bg-gray-50 dark:bg-[#12121c]">
      <div className="bg-white dark:bg-[#1e1e2f] w-full max-w-md shadow-lg rounded-2xl m-2 border border-gray-200 dark:border-gray-700">
        <h2 className="text-gray-900 dark:text-gray-100 text-3xl font-bold text-center my-6">
          Welcome Back
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
          Log in to continue exploring your favorite pet.
        </p>

        <form onSubmit={handleLogin} className="space-y-5 p-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-100">
              Email
            </label>
            <input
              type="email"
              name="email"
              ref={emailRef}
              placeholder="you@example.com"
              className={`w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-900
                dark:bg-gray-800 dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-blue-500
                border ${emailError ? "border-red-500" : "border-transparent"}
              `}
              required
              onChange={(e) => {
                const v = e.target.value.trim();
                if (!v) setEmailError("");
                else if (isEmailValid(v)) setEmailError("");
                else setEmailError("Invalid email format");
              }}
            />
            {emailError && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {emailError}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-100">
              Password
            </label>
            <input
              type={show ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              className={`w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-900
                dark:bg-gray-800 dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-blue-500
                border ${passError ? "border-red-500" : "border-transparent"}
              `}
              required
              onChange={(e) => {
                const v = e.target.value;
                if (!v) setPassError("");
                else setPassError(validatePassword(v));
              }}
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute right-3 top-10 cursor-pointer z-10 text-gray-700 dark:text-gray-200"
            >
              {show ? <FaEye /> : <IoEyeOff />}
            </span>

            {passError && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {passError}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all"
          >
            Log In
          </button>
        </form>

        <div className="flex items-center px-6">
          <div className="grow border-t border-gray-300 dark:border-gray-700"></div>
          <span className="mx-2 text-gray-500 dark:text-gray-400 text-sm">
            or
          </span>
          <div className="grow border-t border-gray-300 dark:border-gray-700"></div>
        </div>

        <div className="flex flex-col gap-3 mx-6 mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-3 bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100 py-3 rounded-lg font-semibold
              hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer
              border border-gray-200 dark:border-gray-700"
          >
            <FcGoogle className="text-2xl" /> Continue with Google
          </button>

          <p className="text-gray-500 dark:text-gray-400 text-center mb-4">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-blue-700 dark:text-yellow-400 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
