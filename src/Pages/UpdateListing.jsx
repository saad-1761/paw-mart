import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";

const UpdateListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const categories = ["Pets", "Pet Food", "Accessories", "Pet Care"];

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/listings/${id}`);
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setFormData(data);
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Failed to load listing.", "error");
      }
    };
    fetchData();
  }, [id]);

  // Update state
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Auto-handle Pets category → Free
    if (name === "category" && value === "Pets") {
      setFormData({ ...formData, category: value, Price: 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Validate price before submitting
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.category !== "Pets" && formData.Price <= 0) {
      return Swal.fire(
        "Invalid Price!",
        "Price must be greater than 0.",
        "warning"
      );
    }

    // Update date to current
    const updatedData = {
      ...formData,
      date: new Date().toLocaleDateString("en-GB"), // format: DD/MM/YYYY
    };

    try {
      const res = await fetch(`http://localhost:3000/listing/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        Swal.fire("Success!", "Listing updated successfully!", "success");
        navigate("/my-listings");
      } else {
        Swal.fire("Error!", "Failed to update listing.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Server error occurred.", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg my-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Update Listing
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium capitalize mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-sm font-medium capitalize mb-1">
            Category
          </label>
          <select
            name="category"
            value={formData.category || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 focus:ring focus:ring-indigo-200"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium capitalize mb-1">
            Price
          </label>
          <input
            type="number"
            name="Price"
            value={formData.category === "Pets" ? "Free" : formData.Price || ""}
            onChange={handleChange}
            disabled={formData.category === "Pets"}
            className={`w-full border border-gray-300 rounded p-2 focus:ring focus:ring-indigo-200 ${
              formData.category === "Pets"
                ? "bg-gray-100 cursor-not-allowed"
                : ""
            }`}
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium capitalize mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 focus:ring focus:ring-indigo-200"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium capitalize mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 focus:ring focus:ring-indigo-200"
            rows="3"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium capitalize mb-1">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={formData.image || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 focus:ring focus:ring-indigo-200"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => navigate("/my-listings")}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
          >
            Go Back
          </button>
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateListing;
