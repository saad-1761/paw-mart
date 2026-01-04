import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import PetsSupplies from "../Pages/PetsSupplies";
import ListingDetails from "../Pages/ListingDetails";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import CategoryPage from "../Pages/CategoryPage";
import Order from "../Pages/Order";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashboardLayout from "../Layout/DashboardLayout";
import Profile from "../Pages/Profile";
import UpdateProfile from "../Pages/UpdateProfile";
import MyOrder from "../Pages/MyOrder";
import MyListing from "../Pages/MyListing";
import AddListing from "../Pages/AddListing";
import UpdateListing from "../Pages/UpdateListing";
import Statistics from "../Pages/Statistics";
import ErrorPage from "../Pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () =>
          fetch("https://paw-mart-server-roan.vercel.app/latest-listings"),
      },
      { path: "pet-supplies", element: <PetsSupplies /> },
      {
        path: "pet-supplies/:id",
        element: <ListingDetails />,
      },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "category/:category", element: <CategoryPage /> },
      {
        path: "order/:id",
        element: (
          <PrivateRoute>
            <Order />
          </PrivateRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  // ✅ Dashboard layout (all private)
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Profile /> },
      { path: "profile", element: <Profile /> },
      { path: "statistics", element: <Statistics /> },
      { path: "update-profile", element: <UpdateProfile /> },
      { path: "my-orders", element: <MyOrder /> },
      { path: "my-listings", element: <MyListing /> },
      { path: "add-listing", element: <AddListing /> },
      { path: "update-listing/:id", element: <UpdateListing /> },
    ],
  },

  // ✅ Error routes
  { path: "/*", element: <ErrorPage /> },
  { path: "/pet-supplies/:/*", element: <ErrorPage /> },
]);
