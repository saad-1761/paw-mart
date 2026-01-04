import React, { useEffect, useMemo, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const API_BASE = "https://paw-mart-server-roan.vercel.app";

// ✅ small, reusable card for suggestions (theme compatible)
const SuggestionCard = ({ item }) => {
  const isFree = Number(item?.Price || 0) === 0;

  return (
    <Link
      to={`/pet-supplies/${item?._id}`}
      className="group block rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:shadow-lg transition"
    >
      <div className="relative">
        <img
          src={item?.image}
          alt={item?.name}
          className="h-40 w-full object-cover group-hover:scale-[1.02] transition-transform"
        />
        <span
          className={`absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-full
          ${
            isFree
              ? "bg-green-600 text-white"
              : "bg-indigo-600 text-white dark:bg-yellow-400 dark:text-gray-900"
          }`}
        >
          {isFree ? "Free" : `৳ ${item?.Price}`}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-900 dark:text-gray-100 line-clamp-1">
          {item?.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {item?.category} • 📍 {item?.location || "Unknown"}
        </p>
      </div>
    </Link>
  );
};

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [allListings, setAllListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ fetch current product + all listings (for suggestions)
  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [prodRes, listRes] = await Promise.all([
          fetch(`${API_BASE}/listings/${id}`),
          fetch(`${API_BASE}/listings`),
        ]);

        if (!prodRes.ok) throw new Error("Failed to fetch product details");
        const prodData = await prodRes.json();

        const listData = listRes.ok ? await listRes.json() : [];

        if (!mounted) return;
        setProduct(prodData);
        setAllListings(Array.isArray(listData) ? listData : []);
      } catch (err) {
        console.error(err);
        if (!mounted) return;
        setProduct(null);
        setAllListings([]);
      } finally {
        mounted && setLoading(false);
      }
    };

    fetchData();
    return () => {
      mounted = false;
    };
  }, [id]);

  const handleOrder = () => {
    if (!product?._id) return;
    navigate(`/order/${product._id}`, { state: product });
  };

  const handleGoBack = () => navigate(-1);

  const isSeller =
    user?.email && product?.email && user.email === product.email;
  const isFree = Number(product?.Price || 0) === 0;

  // ✅ suggestions: same category (2-3)
  const sameCategorySuggestions = useMemo(() => {
    if (!product || !allListings.length) return [];
    return allListings
      .filter(
        (x) =>
          x?._id !== product?._id &&
          (x?.category || "") === (product?.category || "")
      )
      .slice(0, 3);
  }, [product, allListings]);

  // ✅ suggestions: same seller (2-3)
  const sameSellerSuggestions = useMemo(() => {
    if (!product || !allListings.length) return [];
    return allListings
      .filter((x) => x?._id !== product?._id && x?.email === product?.email)
      .slice(0, 3);
  }, [product, allListings]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#12121c]">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#12121c]">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 font-semibold text-lg">
            Product not found.
          </p>
          <button
            onClick={() => navigate("/pet-supplies")}
            className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700
              dark:bg-yellow-400 dark:text-gray-900 dark:hover:bg-yellow-500 transition"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-[#12121c]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top actions */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-800
              hover:bg-gray-50 transition dark:bg-white/5 dark:text-gray-100 dark:border-white/10 dark:hover:bg-white/10"
          >
            ← Go Back
          </button>

          <Link
            to="/pet-supplies"
            className="text-sm font-semibold text-indigo-700 hover:underline dark:text-yellow-400"
          >
            View all products
          </Link>
        </div>

        {/* Main Card */}
        <div className="rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md shadow-xl">
          {/* Header strip */}
          <div className="px-6 py-5 border-b border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
                  {product.name}
                </h1>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                  {product.category} • 📍 {product.location || "Unknown"}
                </p>
              </div>

              <div
                className={`px-4 py-2 rounded-2xl font-bold text-lg w-fit
                ${
                  isFree
                    ? "bg-green-600 text-white"
                    : "bg-indigo-600 text-white dark:bg-yellow-400 dark:text-gray-900"
                }`}
              >
                {isFree ? "Free" : `৳ ${product.Price}`}
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-8">
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-white/5">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover aspect-[4/3]"
              />

              {/* Category badge */}
              <span className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full bg-black/60 text-white">
                {product.category}
              </span>
            </div>

            {/* Info */}
            <div className="space-y-5">
              <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Details
                </h2>

                <div className="space-y-2 text-gray-700 dark:text-gray-300">
                  <p>
                    <span className="font-semibold">Owner Email:</span>{" "}
                    <span className="break-all">{product.email}</span>
                  </p>
                  <p>
                    <span className="font-semibold">Posted Date:</span>{" "}
                    {product.date || "N/A"}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Description
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {product.description || "No description provided."}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  disabled={isSeller}
                  onClick={handleOrder}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-sm hover:shadow-md
                    ${
                      isSeller
                        ? "bg-gray-300 text-gray-700 cursor-not-allowed dark:bg-white/10 dark:text-gray-400"
                        : "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-yellow-400 dark:text-gray-900 dark:hover:bg-yellow-500"
                    }`}
                >
                  {isSeller ? "You can't order your own item" : "Order Now"}
                </button>

                <button
                  onClick={() => navigate("/pet-supplies")}
                  className="px-6 py-3 rounded-xl border border-gray-200 text-gray-800 bg-white hover:bg-gray-50 transition
                    dark:bg-white/5 dark:text-gray-100 dark:border-white/10 dark:hover:bg-white/10"
                >
                  Browse More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Same Category */}
          <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-gray-100">
                Similar in this Category
              </h3>
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                {product.category}
              </span>
            </div>

            {sameCategorySuggestions.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">
                No similar products found.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sameCategorySuggestions.map((item) => (
                  <SuggestionCard key={item._id} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Same Seller */}
          <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-extrabold text-gray-900 dark:text-gray-100">
                More from this Seller
              </h3>
              {/* <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                {product.email}
              </span> */}
            </div>

            {sameSellerSuggestions.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">
                No more products from this seller.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sameSellerSuggestions.map((item) => (
                  <SuggestionCard key={item._id} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 rounded-3xl p-6 border border-gray-200 dark:border-white/10 bg-linear-to-r from-indigo-600 to-indigo-500 text-white dark:from-yellow-400 dark:to-yellow-500 dark:text-gray-900 shadow-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-extrabold">
                Ready to explore more?
              </h3>
              <p className="mt-1 text-white/90 dark:text-gray-900/80">
                Browse all pets and supplies — adoption is free, and prices are
                reasonable.
              </p>
            </div>
            <Link
              to="/pet-supplies"
              className="px-6 py-3 rounded-xl font-semibold bg-white text-indigo-700 hover:bg-white/90 transition
                dark:bg-gray-900 dark:text-yellow-400 dark:hover:bg-gray-800"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
