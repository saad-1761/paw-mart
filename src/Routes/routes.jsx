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
        element: <MyOrder></MyOrder>,
      },
      {
        path: "/my-listings",
        element: <MyListing></MyListing>,
      },
      {
        path: "/add-listing",
        element: <AddListing></AddListing>,
      },
      {
        path: "/pet&supplies",
        element: <PetsSupplies></PetsSupplies>,
      },
      {
        path: "/pet&supplies/:id",
        element: (
          <PrivateRoute>
            <ListingDetails />
          </PrivateRoute>
        ),
      },

      {
        path: "/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/update-profile",
        element: <UpdateProfile></UpdateProfile>,
      },
      {
        path: "/category/:category",
        element: <CategoryPage></CategoryPage>,
      },
    ],
  },
  {
    path: "/*",
    element: <ErrorPage></ErrorPage>,
  },
  {
    path: "/pet&supplies/*",
    element: <ErrorPage></ErrorPage>,
  },
]);
