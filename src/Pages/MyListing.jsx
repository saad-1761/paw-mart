import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

const MyListings = () => {
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchUserListings = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/my-listings/${user.email}`
        );
        if (!res.ok) throw new Error("Failed to fetch listings");

        const data = await res.json();
        setListings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserListings();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px] text-lg">
        Loading your listings...
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="min-h-[350px] flex justify-center items-center text-lg text-gray-500">
        You have no listings yet.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <h2 className="text-2xl font-semibold text-center mb-6">
        My Listings ({listings.length})
      </h2>

      {/* Responsive grid layout for cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((item, index) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-lg p-5 flex flex-col justify-between hover:shadow-lg transition"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-500 font-medium">
                #{index + 1}
              </span>
              <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                {item.category}
              </span>
            </div>

            {/* Image */}
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
            )}

            {/* Product Info */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.name}
              </h3>

              <div className="flex justify-between text-sm text-gray-700 mb-2">
                <span>💰 {item.Price === 0 ? "Free" : `${item.Price}৳`}</span>
                <span>📅 {item.date}</span>
              </div>
              <p className="text-xs text-gray-500">📍 {item.location}</p>
            </div>

            {/* Update Button */}
            <div className="mt-4">
              <button className="w-full bg-indigo-600 text-white font-medium py-2 rounded hover:bg-indigo-700 transition">
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListings;
