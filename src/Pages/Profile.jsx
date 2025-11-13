import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully!");
        setUser(null);
        navigate("/"); // Redirect back to home
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg p-8 rounded-2xl text-center w-full max-w-md">
        {/* Profile Photo */}
        <img
          src={user?.photoURL || "/default-avatar.png"}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto border-4 border-primary dark:border-yellow-400"
        />

        {/* Display Name */}
        <h2 className="text-3xl font-bold mt-4 text-gray-800 dark:text-gray-100">
          {user?.displayName || "No Name Provided"}
        </h2>

        {/* Email */}
        <p className="text-gray-600 dark:text-gray-300 text-lg mt-2">
          {user?.email}
        </p>

        {/* Buttons */}
        <div className="mt-6 space-y-4">
          <button
            onClick={() => navigate("/update-profile")}
            className="w-full py-2 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 transition"
          >
            Update Profile
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-2 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
