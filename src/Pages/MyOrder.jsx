import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { jsPDF } from "jspdf";

const MyOrder = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setOrders([]);
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3000/my-orders/${encodeURIComponent(user.email)}`
        );
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const downloadOrderPdf = (order, index) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const title = "Order Receipt";
    const lineHeight = 20;
    let y = 40;

    doc.setFontSize(18);
    doc.text(title, 40, y);
    y += lineHeight * 1.5;

    doc.setFontSize(12);
    doc.text(`Order #${index + 1}`, 40, y);
    y += lineHeight;
    doc.text(`Product ID: ${order.productId}`, 40, y);
    y += lineHeight;
    doc.text(`Product Name: ${order.productName}`, 40, y);
    y += lineHeight;
    doc.text(`Seller Email: ${order.sellerEmail || "—"}`, 40, y);
    y += lineHeight;
    doc.text(`Buyer Name: ${order.buyerName}`, 40, y);
    y += lineHeight;
    doc.text(`Buyer Email: ${order.buyerEmail}`, 40, y);
    y += lineHeight;
    doc.text(`Quantity: ${order.quantity}`, 40, y);
    y += lineHeight;
    doc.text(`Price: ${order.price}`, 40, y);
    y += lineHeight;
    doc.text(`Address: ${order.address}`, 40, y);
    y += lineHeight;
    doc.text(`Phone: ${order.phone}`, 40, y);
    y += lineHeight;
    doc.text(`Date: ${order.date}`, 40, y);
    y += lineHeight;
    doc.text(`Notes: ${order.additionalNotes || "—"}`, 40, y);
    y += lineHeight;

    // If image exists and is an URL, you could try loading it (requires cross-origin handling).
    // Save file
    const filename = `order_${order.productId || index + 1}.pdf`;
    doc.save(filename);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-gray-600">Loading your orders...</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-gray-500">You have no orders yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl min-h-[350px] mx-auto my-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold mb-6">
        My Orders ({orders.length})
      </h2>

      {/* LIST - responsive: rows on large, stacked cards on small/medium */}
      <div className="space-y-4">
        {orders.map((o, idx) => (
          <div
            key={o._id || `${o.productId}-${idx}`}
            className="bg-white dark:bg-[#111118] rounded-xl shadow-sm p-4 sm:p-5 flex flex-col lg:flex-row items-start lg:items-center gap-4"
          >
            {/* Left: serial & product */}
            <div className="flex items-center w-full lg:w-1/5">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                {idx + 1}
              </div>
              <div className="ml-3">
                <div className="text-md font-semibold text-gray-800 dark:text-gray-100">
                  {o.productName}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  ID: {o.productId}
                </div>
              </div>
            </div>

            {/* Middle: price, quantity, date, location */}
            <div className="flex flex-col sm:flex-row lg:flex-row items-start sm:items-center justify-between w-full lg:w-3/5 gap-3 sm:gap-6">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                <div>
                  <span className="font-medium">Price:</span>{" "}
                  {o.price === 0 ? "Free" : `${o.price}৳`}
                </div>
                <div>
                  <span className="font-medium">Quantity:</span> {o.quantity}
                </div>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-300">
                <div>
                  <span className="font-medium">Date:</span> {o.date}
                </div>
                <div>
                  <span className="font-medium">Phone:</span> {o.phone}
                </div>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-300">
                <div>
                  <span className="font-medium">Address:</span> {o.address}
                </div>
                <div className="truncate">
                  <span className="font-medium">Seller:</span> {o.sellerEmail}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="shrink-0 w-full lg:w-1/5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 md:justify-start lg:justify-end">
              <button
                onClick={() => downloadOrderPdf(o, idx)}
                className="w-full sm:w-auto px-3 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition"
              >
                Download PDF
              </button>

              <button
                onClick={() => {
                  // example: view product details (optional)
                  if (o.productId)
                    window.open(`/pet-supplies/${o.productId}`, "_blank");
                }}
                className="w-full sm:w-auto px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition"
              >
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrder;
