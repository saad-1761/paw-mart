import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";

const UpdateListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3000/listings/${id}`);
      const data = await res.json();
      setFormData(data);
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3000/listing/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      Swal.fire("Success!", "Listing updated successfully!", "success");
      navigate("/my-listings");
    } else {
      Swal.fire("Error!", "Failed to update listing.", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg my-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Update Listing
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "category", "Price", "location", "description", "image"].map(
          (field) => (
            <div key={field}>
              <label className="block text-sm font-medium capitalize mb-1">
                {field}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2 focus:ring focus:ring-indigo-200"
                required
              />
            </div>
          )
        )}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateListing;
