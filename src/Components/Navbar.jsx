// fourth attempt

import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import logo from "../assets/logo.jpg";
import { AuthContext } from "../Context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

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

  const navItems = useMemo(
    () => [
      { path: "/", label: "Home" },
      { path: "/pet-supplies", label: "Pet & Supplies" },
      { path: "/about", label: "About" },
      { path: "/contact", label: "Contact" },
    ],
    []
  );

  const NavLinks = ({ onClick }) => (
    <>
      {navItems.map((item) => (
        <li key={item.path}>
          <NavLink
            to={item.path}
            onClick={onClick}
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
    </>
  );

  return (
    <div className="fixed top-0 w-full z-20 bg-white dark:bg-gray-900 shadow-md border-b border-gray-300 dark:border-gray-700">
      <div className="navbar w-full px-4 lg:px-8 py-3 lg:py-0">
        {/* LEFT (LG only): logo on left */}
        <div className="navbar-start hidden lg:flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img className="h-8 md:h-10 rounded-full" src={logo} alt="logo" />
            <span className="font-bold text-sm md:text-xl text-gray-900 dark:text-gray-100">
              Paw Mart
            </span>
          </Link>
        </div>

        {/* CENTER (LG): nav links */}
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

        {/* RIGHT (LG): theme + auth */}
        <div className="navbar-end hidden lg:flex items-center gap-4">
          <input
            type="checkbox"
            className="toggle"
            defaultChecked={theme === "dark"}
            onChange={(e) => handleTheme(e.target.checked)}
          />

          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full border-2 border-primary">
                  <img
                    src={user?.photoURL || "https://i.pravatar.cc/100"}
                    alt="profile"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white dark:bg-gray-800 rounded-box w-56"
              >
                <li>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="font-semibold"
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="font-semibold text-red-600 dark:text-red-400"
                  >
                    {loggingOut ? "Signing out..." : "Logout"}
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => navigate("/login")}
                className="btn bg-indigo-600 text-white  hover:bg-indigo-700
            dark:bg-yellow-400 dark:text-gray-900 dark:hover:bg-yellow-500 px-4 py-2 rounded-md"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="btn btn-outline dark:bg-gray-900 dark:text-yellow-300 dark:hover:bg-yellow-100 dark:hover:text-gray-900  px-4 py-2 rounded-md"
              >
                Register
              </button>
            </div>
          )}
        </div>

        {/* ======= MD/SM LAYOUT ======= */}
        {/* We override layout on <lg */}
        <div className="flex lg:hidden w-full items-center justify-between">
          {/* Center logo (md/sm) */}
          <div className="flex-1 flex justify-start">
            <Link to="/" className="flex items-center gap-2">
              <img className="h-8 rounded-full" src={logo} alt="logo" />
              <span className="font-bold text-base text-gray-900 dark:text-gray-100">
                Paw Mart
              </span>
            </Link>
          </div>

          {/* Right controls (md/sm): profile or login/register (md only) + hamburger */}
          <div className="flex items-center gap-2">
            {/* If logged in: show avatar on md/sm */}
            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-9 rounded-full border-2 border-primary">
                    <img
                      src={user?.photoURL || "https://i.pravatar.cc/100"}
                      alt="profile"
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white dark:bg-gray-800 rounded-box w-56"
                >
                  <li>
                    <button
                      onClick={() => navigate("/dashboard")}
                      className="font-semibold"
                    >
                      Profile
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="font-semibold text-red-600 dark:text-red-400"
                    >
                      {loggingOut ? "Signing out..." : "Logout"}
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              // If NOT logged in: show buttons ONLY on md (hide on sm)
              <div className="hidden md:flex gap-2">
                <button
                  onClick={() => navigate("/login")}
                  className="btn bg-indigo-600 text-white hover:bg-indigo-700
            dark:bg-yellow-400 dark:text-gray-900 dark:hover:bg-yellow-500"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="btn btn-outline  dark:bg-gray-900 dark:text-yellow-300 dark:hover:bg-yellow-100 dark:hover:text-gray-900 "
                >
                  Register
                </button>
              </div>
            )}

            {/* Hamburger menu (md/sm) */}
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost"
                aria-label="Open menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-900 dark:text-gray-100"
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
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white dark:bg-gray-800 rounded-box w-64"
              >
                <NavLinks />

                <div className="mt-2 flex justify-start px-2">
                  <input
                    type="checkbox"
                    className="toggle"
                    defaultChecked={theme === "dark"}
                    onChange={(e) => handleTheme(e.target.checked)}
                  />
                </div>

                {/* On SMALL (sm), login/register move into hamburger when not logged in */}
                {!user && (
                  <div className="md:hidden mt-2 px-2 flex gap-2">
                    <button
                      onClick={() => navigate("/login")}
                      className="btn  btn-sm bg-indigo-600 text-white hover:bg-indigo-700
            dark:bg-yellow-400 dark:text-gray-900 dark:hover:bg-yellow-500 flex-1"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => navigate("/register")}
                      className="btn dark:bg-gray-900 dark:text-yellow-300 dark:hover:bg-yellow-100 dark:hover:text-gray-900  btn-sm flex-1"
                    >
                      Register
                    </button>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
