import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/listings/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product details");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-500 text-lg">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-red-500 text-lg">
        Product not found.
      </div>
    );
  }

  const handleOrder = () => {
    navigate(`/order/${product._id}`, { state: product });
  };

  const handleGoBack = () => {
    navigate("/pet-supplies");
  };

  const isSeller = user?.email === product.email;

  return (
    <div className="max-w-6xl mx-auto my-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-[#1e1e2f] rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 md:p-10">
          {/* Product Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="rounded-xl shadow-md w-full max-w-md object-cover aspect-4/3"
            />
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2 text-center md:text-left space-y-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-700 dark:text-yellow-300">
              {product.name}
            </h1>

            <div className="text-gray-700 dark:text-gray-300 text-base sm:text-lg space-y-1">
              <p>
                <span className="font-semibold">Category:</span>{" "}
                {product.category}
              </p>
              <p>
                <span className="font-semibold">Location:</span>{" "}
                {product.location}
              </p>
              <p>
                <span className="font-semibold">Owner Email:</span>{" "}
                {product.email}
              </p>
              <p>
                <span className="font-semibold">Description:</span>{" "}
                {product.description || "No description provided."}
              </p>
            </div>

            <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
              {product.Price === 0 ? "Free" : `৳ ${product.Price}`}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-start mt-4">
              <button
                disabled={isSeller}
                onClick={handleOrder}
                className={`px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
                  isSeller
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 dark:bg-yellow-500 dark:hover:bg-yellow-600"
                }`}
              >
                {isSeller ? "You can't order your own item" : "Order Now"}
              </button>

              {/* ✅ Go Back Button */}
              <button
                onClick={handleGoBack}
                className="px-6 py-3 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-700 transition-all duration-300"
              >
                ← Go Back
              </button>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-center" autoClose={2000} />
    </div>
  );
};

export default ListingDetails;
