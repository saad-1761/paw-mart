import React, { useContext, useState } from "react";
import logo from "../assets/logo.jpg";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";
import { toast } from "react-toastify";
// import useGames from "../Hooks/useGames";
const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loggingOut, setLoggingOut] = useState(false);
  // const { loading } = useGames();
  // setUser(null);
  const navigate = useNavigate();
  // console.log(user);

  const handleLogout = () => {
    setLoggingOut(true);
    signOut(auth)
      .then(() => {
        toast.success("Signed out!");
        setUser(null);
        navigate("/login");
      })
      .catch((e) => {
        toast.error(e.message);
      })
      .finally(() => {
        setLoggingOut(false);
      });
  };

  return (
    <div className=" bg-white shadow-md border-b-[0.5px] border-gray-300 ">
      <div className="navbar bg-base-100 shadow-sm py-3 lg:py-0">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-xl font-semibold text-primary"
                      : "text-black text-xl"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/pet-supplies"
                  className={({ isActive }) =>
                    isActive
                      ? "text-xl font-semibold text-primary"
                      : "text-black text-xl font-semibold"
                  }
                >
                  Pets & Supplies
                </NavLink>
              </li>

              {user && (
                <li>
                  <NavLink
                    to="/my-listings"
                    className={({ isActive }) =>
                      isActive
                        ? "text-xl font-semibold text-primary"
                        : "text-black text-xl font-semibold"
                    }
                  >
                    My Listing
                  </NavLink>
                </li>
              )}
              {user && (
                <li>
                  <NavLink
                    to="/my-orders"
                    className={({ isActive }) =>
                      isActive
                        ? "text-xl font-semibold text-primary"
                        : "text-black text-xl font-semibold"
                    }
                  >
                    My Orders
                  </NavLink>
                </li>
              )}
              {user && (
                <li>
                  <NavLink
                    to="/add-listing"
                    className={({ isActive }) =>
                      isActive
                        ? "text-xl font-semibold text-primary"
                        : "text-black text-xl font-semibold"
                    }
                  >
                    Add Listing
                  </NavLink>
                </li>
              )}

              {user && (
                <>
                  <li>
                    <a
                      className="text-red-600 text-xl font-semibold"
                      onClick={handleLogout}
                    >
                      {loggingOut ? "Signing out..." : "Sign Out"}
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* // Logo and Title for big screen */}
          <Link to="/" className=" text-xl p-1 md:p-5">
            <div className="flex items-center gap-2">
              <img className="h-8 md:h-10 rounded-full" src={logo} alt="logo" />
              <span className="font-bold text-sm md:text-xl text-black ">
                Paw Mart
              </span>
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-xl text-primary font-semibold underline "
                    : "text-black text-xl font-semibold"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pet-supplies"
                className={({ isActive }) =>
                  isActive
                    ? "text-xl text-primary font-semibold underline"
                    : "text-black text-xl font-semibold"
                }
              >
                Pets & Supplies
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink
                  to="/my-listings"
                  className={({ isActive }) =>
                    isActive
                      ? "text-xl text-primary font-semibold underline "
                      : "text-black text-xl font-semibold"
                  }
                >
                  My Listing
                </NavLink>
              </li>
            )}
            {user && (
              <li>
                <NavLink
                  to="/my-orders"
                  className={({ isActive }) =>
                    isActive
                      ? "text-xl text-primary font-semibold underline "
                      : "text-black text-xl font-semibold"
                  }
                >
                  My Orders
                </NavLink>
              </li>
            )}
            {user && (
              <li>
                <NavLink
                  to="/add-listing"
                  className={({ isActive }) =>
                    isActive
                      ? "text-xl text-primary font-semibold underline "
                      : "text-black text-xl font-semibold"
                  }
                >
                  Add Listing
                </NavLink>
              </li>
            )}
          </ul>
        </div>
        {user ? (
          <div className="navbar-end space-x-2 cursor-pointer  ">
            <div className="flex gap-2" onClick={() => navigate("/profile")}>
              {" "}
              <img
                src={user.photoURL}
                className=" w-10 h-10 rounded-full"
                alt=""
              />
              <h1 className="text-4xl font-bold">{user.displayName}</h1>
            </div>

            <button
              onClick={handleLogout}
              className="hidden md:block btn btn-error text-white px-4 py-2 rounded-md"
            >
              {loggingOut ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Sign Out"
              )}
            </button>
          </div>
        ) : (
          <div className="navbar-end space-x-2">
            <button
              onClick={() => navigate("/login")}
              className="btn btn-neutral text-sm md:text-2xl text-white font-large p-2.5 rounded-md "
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="btn btn-neutral btn-outline text-sm md:text-2xl text-black font-large p-2.5 rounded-md hover:text-white "
            >
              Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
