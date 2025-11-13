import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const MyListings = () => {
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this listing!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:3000/listing/${id}`, {
            method: "DELETE",
          });
          if (!res.ok) throw new Error("Delete failed");
          setListings(listings.filter((l) => l._id !== id));
          Swal.fire("Deleted!", "Your listing has been deleted.", "success");
        } catch (err) {
          Swal.fire("Error!", "Failed to delete listing.", "error");
        }
      }
    });
  };

  const handleUpdate = (id) => {
    navigate(`/update-listing/${id}`);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[300px] text-lg">
        Loading your listings...
      </div>
    );

  if (listings.length === 0)
    return (
      <div className="min-h-[350px] flex justify-center items-center text-lg text-gray-500">
        You have no listings yet.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <h2 className="text-2xl font-semibold text-center mb-6">
        My Listings ({listings.length})
      </h2>

      {/* Row layout for large screens, card layout for small */}
      <div className="space-y-4">
        {listings.map((item, index) => (
          <div
            key={item._id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white shadow-md hover:shadow-lg rounded-lg p-4 transition-all"
          >
            {/* Left: Product Info */}
            <div className="flex items-center space-x-4 w-full sm:w-3/4">
              <span className="text-sm text-gray-500 font-medium">
                #{index + 1}
              </span>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
              )}
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600">
                  💰 {item.Price === 0 ? "Free" : `${item.Price}৳`} | 📅{" "}
                  {item.date}
                </p>
                <p className="text-xs text-gray-500">📍 {item.location}</p>
              </div>
            </div>

            {/* Right: Buttons */}
            <div className="flex gap-3 mt-3 sm:mt-0 sm:w-1/4 justify-end">
              <button
                onClick={() => handleUpdate(item._id)}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListings;
