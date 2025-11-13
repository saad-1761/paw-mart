import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/logo.jpg";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => setTheme(checked ? "dark" : "light");

  const handleLogout = () => {
    setLoggingOut(true);
    signOut(auth)
      .then(() => {
        Swal.fire("Signed Out!", "Successfully.", "success");
        setUser(null);
        navigate("/login");
      })
      .catch((e) => toast.error(e.message))
      .finally(() => setLoggingOut(false));
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/pet-supplies", label: "Pets & Supplies" },
    ...(user ? [{ path: "/my-listings", label: "My Listing" }] : []),
    ...(user ? [{ path: "/my-orders", label: "My Orders" }] : []),
    ...(user ? [{ path: "/add-listing", label: "Add Listing" }] : []),
  ];

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md border-b border-gray-300 dark:border-gray-700">
      <div className="navbar py-3 lg:py-0 px-4 lg:px-8">
        {/* Hamburger on left */}
        <div className="navbar-start flex items-center gap-2">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-900 dark:text-gray-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white dark:bg-gray-800 rounded-box w-52"
            >
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary dark:text-yellow-400 font-semibold"
                        : "text-gray-900 dark:text-gray-100 font-semibold"
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}

              <div className="mt-2 flex justify-start">
                <input
                  type="checkbox"
                  className="toggle"
                  defaultChecked={theme === "dark"}
                  onChange={(e) => handleTheme(e.target.checked)}
                />
              </div>

              {user && (
                <li className="mt-2">
                  <button
                    className="w-full text-red-600 dark:text-red-400 font-semibold"
                    onClick={handleLogout}
                  >
                    {loggingOut ? "Signing out..." : "Sign Out"}
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 ml-2">
            <img className="h-8 md:h-10 rounded-full" src={logo} alt="logo" />
            <span className="font-bold text-sm md:text-xl text-gray-900 dark:text-gray-100">
              Paw Mart
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary dark:text-yellow-400 font-semibold underline"
                      : "text-gray-900 dark:text-gray-100 font-semibold"
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Right side: desktop toggle + profile */}
        <div className="navbar-end flex items-center gap-4">
          {/* Desktop toggle */}
          <div className="hidden lg:block">
            <input
              type="checkbox"
              className="toggle"
              defaultChecked={theme === "dark"}
              onChange={(e) => handleTheme(e.target.checked)}
            />
          </div>

          {user ? (
            <div className="flex items-center gap-2">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                <img
                  src={user.photoURL}
                  alt="profile"
                  className="w-10 h-10 rounded-full border-2 border-primary"
                />
                <span className="hidden md:block text-gray-900 dark:text-gray-100 font-semibold">
                  {user.displayName || "User"}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="btn btn-error text-white px-4 py-2 rounded-md hidden md:block"
              >
                {loggingOut ? "Signing out..." : "Sign Out"}
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => navigate("/login")}
                className="btn btn-primary text-white px-4 py-2 rounded-md"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="btn btn-outline text-gray-900 dark:text-gray-100 px-4 py-2 rounded-md"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
