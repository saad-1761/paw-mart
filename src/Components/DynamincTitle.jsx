// src/Components/DynamicTitle.jsx
import { useEffect } from "react";
import { useLocation, useParams } from "react-router";

const DynamicTitle = () => {
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    const setTitle = async () => {
      const path = location.pathname;
      let title = "PawMart 🐾";

      if (path === "/") title = "Home | PawMart 🐾";
      else if (path === "/login") title = "Login | PawMart";
      else if (path === "/register") title = "Register | PawMart";
      else if (path === "/my-orders") title = "My Orders | PawMart";
      else if (path === "/my-listings") title = "My Listings | PawMart";
      else if (path === "/add-listing") title = "Add Listing | PawMart";
      else if (path === "/pet-supplies") title = "Pet Supplies | PawMart";
      else if (path === "/profile") title = "My Profile | PawMart";
      else if (path === "/update-profile") title = "Update Profile | PawMart";
      else if (path.startsWith("/category/")) title = "Category | PawMart";
      else if (path.startsWith("/order/")) title = "Order | PawMart";
      else if (path.startsWith("/update-listing/"))
        title = "Update Listing | PawMart";
      else if (path.startsWith("/pet-supplies/")) {
        // Try fetching product name for dynamic title
        try {
          const id = path.split("/pet-supplies/")[1];
          const res = await fetch(
            `https://paw-mart-server-roan.vercel.app/listings/${id}`
          );
          if (res.ok) {
            const data = await res.json();
            title = `${data.name} | PawMart`;
          } else {
            title = "Listing Details | PawMart";
          }
        } catch (error) {
          title = "Listing Details | PawMart";
        }
      } else title = "404 Not Found | PawMart";

      document.title = title;
    };

    setTitle();
  }, [location]);

  return null;
};

export default DynamicTitle;
