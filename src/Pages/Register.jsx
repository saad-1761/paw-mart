import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaGithub } from "react-icons/fa";
import { auth } from "../Firebase/firebase.config";
import { sendEmailVerification, signOut, updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { IoEyeOff } from "react-icons/io5";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router";

export default function Register() {
  const [show, setShow] = useState(false);
  const { createUserWithEmailAndPasswordFunc, setUser } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const displayName = e.target.name.value;
    const photoURL = e.target.photoUrl.value;

    const regExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regExp.test(password)) {
      toast.error(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    // createUserWithEmailAndPassword(auth, email, password)
    createUserWithEmailAndPasswordFunc(email, password)
      .then((res) => {
        const user = res.user;
        setUser(null);
        // ✅ Update profile
        return updateProfile(user, { displayName, photoURL }).then(() => user);
      })
      .then(() => {
        // ✅ Send email verification using current user
        return sendEmailVerification(auth.currentUser);
      })
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
    <div className="flex justify-center items-center min-h-screen  bg-gray-900">
      <div className="bg-gray-800 text-white w-full my-5 max-w-md p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-4">Create Account</h2>
        <p className="text-gray-400 text-center mb-8">
          Join the GameHub community today!
        </p>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              // value={formData.name}
              // onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Photo</label>
            <input
              type="text"
              name="photoUrl"
              // value={formData.photoUrl}
              // onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              // value={formData.email}
              // onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type={show ? "text" : "password"}
              name="password"
              // value={formData.password}
              // onChange={handleChange}
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
            Register
          </button>
        </form>

        <p className="text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}
