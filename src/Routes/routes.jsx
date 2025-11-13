import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import MyOrder from "../Pages/MyOrder";
import MyListing from "../Pages/MyListing";
import PetsSupplies from "../Pages/PetsSupplies";
import Home from "../Pages/Home";
import AddListing from "../Pages/AddListing";
import Profile from "../Pages/Profile";
import UpdateProfile from "../Pages/UpdateProfile";
import ErrorPage from "../Pages/ErrorPage";
import ListingDetails from "../Pages/ListingDetails";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import CategoryPage from "../Pages/CategoryPage";
import Order from "../Pages/order";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
        loader: () => fetch("http://localhost:3000/latest-listings"),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/my-orders",
        element: (
          <PrivateRoute>
            <MyOrder></MyOrder>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-listings",
        element: (
          <PrivateRoute>
            <MyListing></MyListing>
          </PrivateRoute>
        ),
      },
      {
        path: "/add-listing",
        element: (
          <PrivateRoute>
            <AddListing></AddListing>
          </PrivateRoute>
        ),
      },
      {
        path: "/pet-supplies",
        element: <PetsSupplies></PetsSupplies>,
      },
      {
        path: "/pet-supplies/:id",
        element: (
          <PrivateRoute>
            <ListingDetails />
          </PrivateRoute>
        ),
      },

      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "/update-profile",
        element: (
          <PrivateRoute>
            <UpdateProfile></UpdateProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/category/:category",
        element: <CategoryPage></CategoryPage>,
      },
      {
        path: "/order/:id",
        element: (
          <PrivateRoute>
            <Order></Order>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/*",
    element: <ErrorPage></ErrorPage>,
  },
  {
    path: "/pet-supplies/:*",
    element: <ErrorPage></ErrorPage>,
  },
]);
