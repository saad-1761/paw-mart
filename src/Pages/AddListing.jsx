import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const AddListing = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    Price: "",
    location: "",
    description: "",
    image: "",
    email: "",
    date: "",
  });

  // Auto-fill date and email on mount
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({
      ...prev,
      email: user?.email || "",
      date: today,
    }));
  }, [user]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      setFormData((prev) => ({
        ...prev,
        category: value,
        Price: value === "Pets" ? "Free" : "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const priceValue =
      formData.category === "Pets" || formData.Price.toLowerCase() === "free"
        ? 0
        : Number(formData.Price);

    if (isNaN(priceValue) || priceValue < 0) {
      alert("⚠️ Please enter a valid number for Price");
      return;
    }

    const listingData = {
      ...formData,
      Price: priceValue,
    };

    try {
      const res = await fetch(
        "https://paw-mart-server-roan.vercel.app/add-listing",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(listingData),
        }
      );

      if (res.ok) {
        alert("✅ Listing added successfully!");
        const today = new Date().toISOString().split("T")[0];
        setFormData({
          name: "",
          category: "",
          Price: "",
          location: "",
          description: "",
          image: "",
          email: user?.email || "",
          date: today,
        });
      } else {
        alert("❌ Failed to add listing");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Error occurred while adding listing");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md my-10">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900 dark:text-gray-100">
        Add New Listing
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block font-medium mb-1 text-gray-900 dark:text-gray-100">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
            placeholder="Enter product name"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1 text-gray-900 dark:text-gray-100">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
          >
            <option value="">Select Category</option>
            <option value="Pets">Pets</option>
            <option value="Pet Food">Pet Food</option>
            <option value="Accessories">Accessories</option>
            <option value="Pet Care">Pet Care</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-1 text-gray-900 dark:text-gray-100">
            Price
          </label>
          <input
            type="text"
            name="Price"
            value={formData.Price}
            onChange={handleChange}
            required
            disabled={formData.category === "Pets"}
            className={`w-full border px-3 py-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 ${
              formData.category === "Pets"
                ? "cursor-not-allowed bg-gray-100 dark:bg-gray-700"
                : ""
            }`}
            placeholder={
              formData.category === "Pets" ? "Free" : "Enter price (e.g., 500)"
            }
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1 text-gray-900 dark:text-gray-100">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
            placeholder="Enter description"
          />
        </div>

        {/* Photo URL */}
        <div>
          <label className="block font-medium mb-1 text-gray-900 dark:text-gray-100">
            Photo URL
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
            placeholder="Enter image URL"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block font-medium mb-1 text-gray-900 dark:text-gray-100">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
            placeholder="Enter location"
          />
        </div>

        {/* Email (readonly) */}
        <div>
          <label className="block font-medium mb-1 text-gray-900 dark:text-gray-100">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Date (readonly) */}
        <div>
          <label className="block font-medium mb-1 text-gray-900 dark:text-gray-100">
            Created At
          </label>
          <input
            type="text"
            name="createdAt"
            value={formData.date}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-linear-to-r from-purple-600 to-indigo-600 dark:from-yellow-500 dark:to-orange-500 text-white font-semibold py-2 rounded hover:opacity-90 transition"
        >
          Post Listing
        </button>
      </form>
    </div>
  );
};

export default AddListing;
