import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const Order = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const product = location.state; // comes from navigate() in ListingDetails
  const [formData, setFormData] = useState({
    productId: product?._id || "",
    productName: product?.name || "",
    buyerName: user?.displayName || "",
    buyerEmail: user?.email || "",
    quantity: product?.category?.toLowerCase() === "pet" ? 1 : "",
    price: product?.Price || 0,
    address: "",
    phone: "",
    date: new Date().toISOString().split("T")[0],
    additionalNotes: "",
  });

  useEffect(() => {
    // Auto-calculate price when quantity changes
    if (product && formData.quantity) {
      setFormData((prev) => ({
        ...prev,
        price: product.Price * Number(prev.quantity),
      }));
    }
  }, [formData.quantity, product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      ...formData,
      sellerEmail: product?.email || "",
    };

    try {
      const res = await fetch(
        "https://paw-mart-server-roan.vercel.app/orders",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        }
      );

      if (!res.ok) throw new Error("Failed to place order");
      Swal.fire("Success!", "Listing updated successfully!", "success");
      //   toast.success("✅ Your order has been received!");
      setTimeout(() => navigate("/my-orders"), 2000);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to submit order");
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-red-500 text-lg">
        Product details missing.
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-[#121223] p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-[#1e1e2f] rounded-2xl shadow-lg p-6 sm:p-10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-indigo-700 dark:text-yellow-300 mb-6">
          Place Your Order
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
                Product ID
              </label>
              <input
                type="text"
                name="productId"
                value={formData.productId}
                disabled
                className="w-full bg-gray-100 dark:bg-gray-700 rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                disabled
                className="w-full bg-gray-100 dark:bg-gray-700 rounded-md px-3 py-2"
              />
            </div>
          </div>

          {/* Buyer Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
                Buyer Name
              </label>
              <input
                type="text"
                name="buyerName"
                value={formData.buyerName}
                onChange={handleChange}
                required
                className="w-full border rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
                Buyer Email
              </label>
              <input
                type="email"
                name="buyerEmail"
                value={formData.buyerEmail}
                onChange={handleChange}
                required
                className="w-full border rounded-md px-3 py-2"
              />
            </div>
          </div>

          {/* Quantity & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={
                  product?.category?.toLowerCase() === "pets"
                    ? "1"
                    : formData.quantity
                }
                onChange={handleChange}
                disabled={product?.category?.toLowerCase() === "pets"}
                min="1"
                required
                className={`w-full border rounded-md px-3 py-2 ${
                  product?.category?.toLowerCase() === "pets"
                    ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                    : ""
                }`}
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
                Total Price (৳)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                readOnly
                className="w-full bg-gray-100 dark:bg-gray-700 rounded-md px-3 py-2"
              />
            </div>
          </div>

          {/* Address, Phone, Date */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full border rounded-md px-3 py-2 h-20"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                readOnly
                className="w-full bg-gray-100 dark:bg-gray-700 rounded-md px-3 py-2"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
              Additional Notes
            </label>
            <textarea
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 h-20"
              placeholder="Write any additional info..."
            ></textarea>
          </div>

          {/* Submit */}
          <div className="pt-4 text-center">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-white font-semibold rounded-lg transition-all duration-300"
            >
              Confirm Order
            </button>
          </div>
        </form>
      </div>

      <ToastContainer position="bottom-center" autoClose={2000} />
    </div>
  );
};

export default Order;
