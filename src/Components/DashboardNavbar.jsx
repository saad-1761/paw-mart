import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import logo from "../assets/logo.jpg";
import { AuthContext } from "../Context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const DashboardNavbar = ({
  onOpenSidebar,
  isSidebarCollapsed,
  onToggleCollapse,
}) => {
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

  // ✅ Public navbar navlinks (shown inside avatar dropdown in dashboard)
  const navItems = useMemo(
    () => [
      { path: "/", label: "Home" },
      { path: "/pet-supplies", label: "Pet Supplies" },
      { path: "/about", label: "About" },
      { path: "/contact", label: "Contact" },
    ],
    []
  );

  return (
    <div className="fixed top-0 w-full z-20 bg-white dark:bg-gray-900 shadow-md border-b border-gray-300 dark:border-gray-700">
      <div className="navbar px-4 lg:px-8 py-3 lg:py-0">
        {/* LEFT: md/sm = vertical 3 dots (sidebar open). lg = collapse button */}
        <div className="navbar-start flex items-center gap-2">
          {/* ✅ md/sm only: vertical three dots */}
          <button
            className="btn btn-ghost lg:hidden"
            onClick={onOpenSidebar}
            title="Open sidebar"
            aria-label="Open sidebar"
          >
            {/* vertical 3 dots */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle cx="12" cy="5" r="2" />
              <circle cx="12" cy="12" r="2" />
              <circle cx="12" cy="19" r="2" />
            </svg>
          </button>

          {/* ✅ lg only: sidebar collapse */}
          <button
            className="btn btn-ghost hidden lg:inline-flex"
            onClick={onToggleCollapse}
            title="Toggle sidebar"
            aria-label="Toggle sidebar"
          >
            {isSidebarCollapsed ? "➤" : "◀"}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 ml-1">
            <img className="h-8 md:h-10 rounded-full" src={logo} alt="logo" />
            <span className="font-bold text-sm md:text-xl text-gray-900 dark:text-gray-100">
              Paw Mart
            </span>
          </Link>
        </div>

        {/* CENTER: Dashboard label */}
        <div className="navbar-center">
          <span className="font-semibold text-gray-700 dark:text-gray-200 hidden md:block">
            Dashboard
          </span>
        </div>

        {/* RIGHT: Profile avatar dropdown */}
        <div className="navbar-end flex items-center gap-3">
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
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white dark:bg-gray-800 rounded-box w-72"
            >
              {/* ✅ First: profile menu */}
              <li>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="font-semibold"
                >
                  Profile
                </button>
              </li>

              <div className="divider my-1" />

              {/* ✅ Navbar links inside avatar dropdown */}
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

              <div className="divider my-1" />

              {/* ✅ Theme toggle */}
              <li className="px-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    Theme
                  </span>
                  <input
                    type="checkbox"
                    className="toggle"
                    defaultChecked={theme === "dark"}
                    onChange={(e) => handleTheme(e.target.checked)}
                  />
                </div>
              </li>

              <div className="divider my-1" />

              {/* ✅ Logout */}
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
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
