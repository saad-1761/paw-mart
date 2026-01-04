import React, { useContext, useMemo, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { auth } from "../Firebase/firebase.config";
import { sendEmailVerification, signOut, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router";

export default function Register() {
  const [show, setShow] = useState(false);
  const { createUserWithEmailAndPasswordFunc, setUser } =
    useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ error states
  const [nameError, setNameError] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");

  // ✅ track password to render live rules
  const [passwordValue, setPasswordValue] = useState("");

  const isEmailValid = (email) => email.includes("@");

  const isValidUrl = (url) => {
    try {
      if (!url) return true; // optional
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const passwordRules = (password) => ({
    length: password.length >= 6,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  });

  const validatePassword = (password) => {
    const rules = passwordRules(password);
    if (!rules.length) return "Password must be at least 6 characters long.";
    if (!rules.upper || !rules.lower || !rules.number || !rules.special) {
      return "Password must include: uppercase, lowercase, number, and special character.";
    }
    return "";
  };

  const rulesStatus = useMemo(
    () => passwordRules(passwordValue),
    [passwordValue]
  );

  const handleRegister = (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value;
    const displayName = e.target.name.value.trim();
    const photoURL = e.target.photoUrl.value.trim();

    setNameError("");
    setPhotoError("");
    setEmailError("");
    setPassError("");

    let hasError = false;

    if (!displayName) {
      setNameError("Full name is required.");
      hasError = true;
    }

    if (!isValidUrl(photoURL)) {
      setPhotoError("Please enter a valid photo URL (or leave it empty).");
      hasError = true;
    }

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

    createUserWithEmailAndPasswordFunc(email, password)
      .then((res) => {
        const user = res.user;
        setUser(null);
        return updateProfile(user, { displayName, photoURL }).then(() => user);
      })
      .then(() => sendEmailVerification(auth.currentUser))
      .then(() => {
        signOut(auth).then(() => {
          toast.success(
            "Registration Successful! Check your email to verify your account."
          );
        });
        setUser(null);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Registration Error:", error);
        toast.error(`Registration Failed: ${error.message}`);
      });
  };

  // ✅ small helper for rule rows
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
              Create your account and start exploring pets & supplies.
            </h1>

            <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
              Adopt pets for free, shop supplies at reasonable prices, and
              manage your listings from a simple dashboard.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="rounded-2xl p-4 bg-white shadow-sm border border-gray-200 dark:bg-white/5 dark:border-white/10">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Secure Signup
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Email Verified
              </p>
            </div>
            <div className="rounded-2xl p-4 bg-white shadow-sm border border-gray-200 dark:bg-white/5 dark:border-white/10">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Dashboard
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Manage Listings
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-500 mt-8">
            By creating an account, you agree to our community guidelines and
            responsible adoption policy.
          </p>
        </div>

        {/* ✅ Right: form card */}
        <div className="rounded-3xl shadow-xl border border-gray-200 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-white/5 overflow-hidden">
          {/* Header strip */}
          <div className="px-7 py-6 border-b border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5">
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">
              Create Account
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Join the PawMart community today!
            </p>
          </div>

          <form onSubmit={handleRegister} className="p-7 space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                className={`w-full px-4 py-3 rounded-xl bg-white text-gray-900 border
                  dark:bg-[#12121c] dark:text-gray-100
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-yellow-400
                  ${
                    nameError
                      ? "border-red-500"
                      : "border-gray-200 dark:border-white/10"
                  }
                `}
                required
                onChange={(e) => {
                  const v = e.target.value.trim();
                  if (!v) setNameError("Full name is required.");
                  else setNameError("");
                }}
              />
              {nameError && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {nameError}
                </p>
              )}
            </div>

            {/* Photo */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">
                Photo URL <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="text"
                name="photoUrl"
                placeholder="https://example.com/photo.jpg"
                className={`w-full px-4 py-3 rounded-xl bg-white text-gray-900 border
                  dark:bg-[#12121c] dark:text-gray-100
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-yellow-400
                  ${
                    photoError
                      ? "border-red-500"
                      : "border-gray-200 dark:border-white/10"
                  }
                `}
                onChange={(e) => {
                  const v = e.target.value.trim();
                  if (!v) setPhotoError("");
                  else if (isValidUrl(v)) setPhotoError("");
                  else
                    setPhotoError(
                      "Please enter a valid photo URL (or leave it empty)."
                    );
                }}
              />
              {photoError && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {photoError}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
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

              {/* ✅ Rules grid */}
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
              Register
            </button>

            {/* Footer link */}
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-semibold text-indigo-700 hover:underline
                  dark:text-yellow-400"
              >
                Log In
              </a>
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
}
