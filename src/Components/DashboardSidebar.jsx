import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const DashboardSidebar = ({ collapsed, mobileOpen, onCloseMobile }) => {
  const { setUser } = useContext(AuthContext);
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  const menus = [
    { label: "👤 Profile", path: "/dashboard" },
    { label: "📊 Statistics", path: "/dashboard/statistics" },
    { label: "🛍️ My Orders", path: "/dashboard/my-orders" },
    { label: "📋 My Listings", path: "/dashboard/my-listings" },
    { label: "➕ Add Listing", path: "/dashboard/add-listing" },
  ];

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

  const linkClass = ({ isActive }) =>
    isActive
      ? "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-yellow-400 dark:text-gray-900 dark:hover:bg-yellow-500 font-semibold"
      : "text-gray-900 dark:text-gray-100 font-semibold";

  return (
    <>
      {/* ✅ LG sidebar */}
      <aside
        className={`hidden lg:flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-all duration-200 ${
          collapsed ? "w-20" : "w-40"
        }`}
      >
        <div className="p-4">
          <h2 className="font-bold text-gray-900 dark:text-gray-100">
            {collapsed ? "DB" : "Menu"}
          </h2>
        </div>

        <ul className="menu p-2 gap-1">
          {menus.map((m) => (
            <li key={m.path}>
              <NavLink to={m.path} className={linkClass}>
                {collapsed ? m.label.split(" ", 1) : m.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="mt-auto p-3">
          <button
            onClick={handleLogout}
            className="btn btn-error w-full text-white"
          >
            {loggingOut ? "Signing out..." : collapsed ? "🚫" : "Logout"}
          </button>
        </div>
      </aside>

      {/* ✅ Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* ✅ Mobile drawer */}
      <aside
        className={`fixed top-[72px] left-0 z-50 h-[calc(100vh-72px)] w-40 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-200 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex items-center justify-between">
          <span className="font-bold text-gray-900 dark:text-gray-100">
            Menu
          </span>
          <button className="btn btn-ghost btn-sm" onClick={onCloseMobile}>
            ✕
          </button>
        </div>

        <ul className="menu p-2 gap-1 w-full">
          {menus.map((m) => (
            <li key={m.path}>
              <NavLink
                to={m.path}
                className={linkClass}
                onClick={onCloseMobile}
              >
                {m.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="mt-auto p-3">
          <button
            onClick={() => {
              onCloseMobile();
              handleLogout();
            }}
            className="btn btn-error w-full text-white"
          >
            {loggingOut ? "Signing out..." : "Logout"}
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
