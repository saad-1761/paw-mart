/*eslint-disable no-unused-vars */
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
  const redirectPath = "/";
  const emailRef = useRef(null);

  const [show, setShow] = useState(false);

  // ✅ client-side validation states
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");

  // ✅ track password for live rules helper
  const [passwordValue, setPasswordValue] = useState("");

  // ✅ simple email check (your requirement: must contain @)
  const isEmailValid = (email) => email.includes("@");

  const passwordRules = (password) => ({
    length: password.length >= 6,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  });

  // ✅ password rule: upper + lower + number + special + min 6
  const validatePassword = (password) => {
    const rules = passwordRules(password);

    if (!rules.length) return "Password must be at least 6 characters long.";
    if (!rules.upper || !rules.lower || !rules.number || !rules.special) {
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
        // ✅ keep your redirect support
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

  // ✅ small helper for rule rows (same visual system as Register)
  const Rule = ({ ok, children }) => (
    <div
      className={`flex items-center gap-2 rounded-lg px-2 py-1 ${
        ok
          ? "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-300"
          : "bg-gray-50 text-gray-600 dark:bg-white/5 dark:text-gray-400"
      }`}
    >
      <span className="text-xs font-bold">{ok ? "✔" : "•"}</span>
      <span className="text-sm">{children}</span>
    </div>
  );

  const rulesStatus = passwordRules(passwordValue);

  return (
    <div className="min-h-screen flex items-center justify-center px-3 py-10 bg-gradient-to-b from-indigo-50 via-white to-indigo-100 dark:from-[#0b0b12] dark:via-[#12121c] dark:to-[#0b0b12]">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ✅ Left: brand panel (unique look) */}
        <div className="hidden lg:flex flex-col justify-between rounded-3xl p-10 border border-indigo-100 bg-white/60 backdrop-blur-md shadow-xl dark:border-white/10 dark:bg-white/5">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-indigo-600 text-white dark:bg-yellow-400 dark:text-gray-900 font-semibold w-fit">
              🐾 PawMart
            </div>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-gray-900 dark:text-gray-100">
              Welcome back! Continue your PawMart journey.
            </h1>

            <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
              Adopt pets for free, shop supplies at reasonable prices, and
              manage everything from your dashboard.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="rounded-2xl p-4 bg-white shadow-sm border border-gray-200 dark:bg-white/5 dark:border-white/10">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Secure Access
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Verified Login
              </p>
            </div>
            <div className="rounded-2xl p-4 bg-white shadow-sm border border-gray-200 dark:bg-white/5 dark:border-white/10">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Easy Manage
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Listings & Orders
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-500 mt-8">
            Tip: Use a strong password and keep your account secure.
          </p>
        </div>

        {/* ✅ Right: form card */}
        <div className="rounded-3xl shadow-xl border border-gray-200 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-white/5 overflow-hidden">
          {/* Header strip */}
          <div className="px-7 py-6 border-b border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5">
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">
              Welcome Back
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Log in to continue exploring your favorite pet.
            </p>
          </div>

          <form onSubmit={handleLogin} className="p-7 space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                ref={emailRef}
                placeholder="you@example.com"
                className={`w-full px-4 py-3 rounded-xl bg-white text-gray-900 border
                  dark:bg-[#12121c] dark:text-gray-100
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-yellow-400
                  ${
                    emailError
                      ? "border-red-500"
                      : "border-gray-200 dark:border-white/10"
                  }
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
              <label className="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">
                Password
              </label>
              <input
                type={show ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-xl bg-white text-gray-900 border
                  dark:bg-[#12121c] dark:text-gray-100
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-yellow-400
                  ${
                    passError
                      ? "border-red-500"
                      : "border-gray-200 dark:border-white/10"
                  }
                `}
                required
                onChange={(e) => {
                  const v = e.target.value;
                  setPasswordValue(v);
                  if (!v) setPassError("");
                  else setPassError(validatePassword(v));
                }}
              />

              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-9 p-2 rounded-lg text-gray-700 hover:bg-gray-100
                  dark:text-gray-200 dark:hover:bg-white/10"
                aria-label="Toggle password visibility"
              >
                {show ? <FaEye /> : <IoEyeOff />}
              </button>

              {passError && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {passError}
                </p>
              )}

              {/* ✅ live rules helper (same as register) */}
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Rule ok={rulesStatus.length}>At least 6 characters</Rule>
                <Rule ok={rulesStatus.upper}>One uppercase (A-Z)</Rule>
                <Rule ok={rulesStatus.lower}>One lowercase (a-z)</Rule>
                <Rule ok={rulesStatus.number}>One number (0-9)</Rule>
                <Rule ok={rulesStatus.special}>One special (!@#$…)</Rule>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="
                w-full py-3 rounded-xl font-semibold transition-all
                bg-indigo-600 text-white hover:bg-indigo-700
                dark:bg-yellow-400 dark:text-gray-900 dark:hover:bg-yellow-500
                shadow-sm hover:shadow-md
              "
            >
              Log In
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="grow border-t border-gray-200 dark:border-white/10" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                or
              </span>
              <div className="grow border-t border-gray-200 dark:border-white/10" />
            </div>

            {/* Google */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex w-full items-center justify-center gap-3 rounded-xl py-3 font-semibold transition
                bg-white text-gray-900 border border-gray-200 hover:bg-gray-50
                dark:bg-white/5 dark:text-gray-100 dark:border-white/10 dark:hover:bg-white/10"
            >
              <FcGoogle className="text-2xl" />
              Continue with Google
            </button>

            {/* Footer link */}
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-indigo-700 hover:underline dark:text-yellow-400"
              >
                Register
              </Link>
            </p>
          </form>

          {/* Mobile-only brand hint */}
          <div className="lg:hidden px-7 pb-7">
            <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-4">
              <p className="text-sm text-gray-700 dark:text-gray-300 font-semibold">
                🐾 PawMart
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Adopt pets for free and shop supplies at reasonable prices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
