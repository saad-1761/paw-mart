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

    // reset errors
    setNameError("");
    setPhotoError("");
    setEmailError("");
    setPassError("");

    // ✅ client-side validation
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

    // ✅ your original flow (unchanged)
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

  return (
    <div className="flex justify-center items-center min-h-screen px-2 bg-gray-50 dark:bg-[#12121c]">
      <div className="bg-white dark:bg-[#1e1e2f] w-full my-5 max-w-md p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-gray-900 dark:text-gray-100 text-3xl font-bold text-center mb-4">
          Create Account
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
          Join the PawMart community today!
        </p>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-100">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              className={`w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-900
                dark:bg-gray-800 dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-blue-500
                border ${nameError ? "border-red-500" : "border-transparent"}
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
            <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-100">
              Photo (optional)
            </label>
            <input
              type="text"
              name="photoUrl"
              placeholder="https://example.com/photo.jpg"
              className={`w-full px-4 py-3 rounded-lg bg-gray-100 text-gray-900
                dark:bg-gray-800 dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-blue-500
                border ${photoError ? "border-red-500" : "border-transparent"}
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
            <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-100">
              Email
            </label>
            <input
              type="email"
              name="email"
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
                setPasswordValue(v);
                if (!v) setPassError("");
                else setPassError(validatePassword(v));
              }}
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute right-3 top-10 cursor-pointer z-50 text-gray-700 dark:text-gray-200"
            >
              {show ? <FaEye /> : <IoEyeOff />}
            </span>

            {passError && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {passError}
              </p>
            )}

            {/* ✅ Live rules helper */}
            <div className="mt-2 space-y-1 text-sm">
              <p
                className={`flex items-center gap-2 ${
                  rulesStatus.length
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                <span>{rulesStatus.length ? "✔" : "•"}</span>
                At least 6 characters
              </p>

              <p
                className={`flex items-center gap-2 ${
                  rulesStatus.upper
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                <span>{rulesStatus.upper ? "✔" : "•"}</span>
                One uppercase letter (A-Z)
              </p>

              <p
                className={`flex items-center gap-2 ${
                  rulesStatus.lower
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                <span>{rulesStatus.lower ? "✔" : "•"}</span>
                One lowercase letter (a-z)
              </p>

              <p
                className={`flex items-center gap-2 ${
                  rulesStatus.number
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                <span>{rulesStatus.number ? "✔" : "•"}</span>
                One number (0-9)
              </p>

              <p
                className={`flex items-center gap-2 ${
                  rulesStatus.special
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                <span>{rulesStatus.special ? "✔" : "•"}</span>
                One special character (!@#$…)
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all"
          >
            Register
          </button>
        </form>

        <p className="text-gray-500 dark:text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-700 dark:text-yellow-400 hover:underline"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}
