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
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-2xl text-center w-full max-w-md">
        {/* Profile Photo */}
        <img
          src={user?.photoURL}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto border-4 border-primary"
        />

        {/* Display Name */}
        <h2 className="text-3xl font-bold mt-4 text-gray-800">
          {user?.displayName || "No Name Provided"}
        </h2>

        {/* Email */}
        <p className="text-gray-600 text-lg mt-2">{user?.email}</p>

        {/* Buttons */}
        <div className="mt-6 space-y-4">
          <button
            onClick={() => navigate("/update-profile")}
            className="btn btn-primary w-full font-semibold"
          >
            Update Profile
          </button>

          <button
            onClick={handleLogout}
            className="btn btn-error w-full font-semibold text-white"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
