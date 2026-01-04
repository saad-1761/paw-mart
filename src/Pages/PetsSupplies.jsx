import React, { useEffect, useMemo, useRef, useState } from "react";
import useListing from "../Hooks/useListing";
import ListingCard from "../Components/ListingCard";
import ErrorProductPage from "./ErrorProductPage";

const PAGE_SIZE = 6;
const CATEGORIES = ["All", "Pets", "Pet Food", "Pet Care", "Accessories"];

const getPrice = (item) => {
  const n = Number(item?.Price ?? 0);
  return Number.isFinite(n) ? n : 0;
};

const PetsSupplies = () => {
  const { listings, loading } = useListing();

  // Search
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All"); // ✅ new

  // Sort
  const [sortPrice, setSortPrice] = useState("none"); // none | asc | desc

  // Pagination
  const [page, setPage] = useState(1);
  const topRef = useRef(null);

  // Spinner effect for search
  useEffect(() => {
    if (search) {
      setIsSearching(true);
      const t = setTimeout(() => setIsSearching(false), 350);
      return () => clearTimeout(t);
    } else {
      setIsSearching(false);
    }
  }, [search]);

  // ✅ Build locations list from listings
  const locations = useMemo(() => {
    const set = new Set();
    listings.forEach((item) => {
      if (item?.location) set.add(item.location);
    });
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [listings]);

  // ✅ Filter (category + location + search)
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();

    return listings.filter((item) => {
      // category filter
      if (selectedCategory !== "All" && item.category !== selectedCategory) {
        return false;
      }

      // location filter
      if (selectedLocation !== "All" && item.location !== selectedLocation) {
        return false;
      }

      // search by name
      if (term) {
        const name = (item.name || "").toLowerCase();
        if (!name.includes(term)) return false;
      }

      return true;
    });
  }, [listings, search, selectedCategory, selectedLocation]);

  // ✅ Sort only when user selects
  const finalList = useMemo(() => {
    if (sortPrice === "none") return filtered;

    const copy = [...filtered];
    if (sortPrice === "asc") copy.sort((a, b) => getPrice(a) - getPrice(b));
    if (sortPrice === "desc") copy.sort((a, b) => getPrice(b) - getPrice(a));
    return copy;
  }, [filtered, sortPrice]);

  // ✅ Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [search, selectedCategory, selectedLocation, sortPrice]);

  // ✅ Pagination
  const totalItems = finalList.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const paginated = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return finalList.slice(start, start + PAGE_SIZE);
  }, [finalList, safePage]);

  // ✅ Scroll to top on page changes + filter changes
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [safePage, search, selectedCategory, selectedLocation, sortPrice]);

  const goToPage = (p) => setPage(Math.max(1, Math.min(totalPages, p)));

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSelectedLocation("All");
    setSortPrice("none");
    setPage(1);
  };

  const hasActiveFilters =
    search.trim() ||
    selectedCategory !== "All" ||
    selectedLocation !== "All" ||
    sortPrice !== "none";

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  return (
    <div ref={topRef} className=" min-h-screen">
      <div className="max-w-7xl mx-auto w-full md:px-8 lg:px-12 py-4 md:py-8 lg:py-12 px-4">
        <h2 className="text-4xl md:text-6xl font-bold text-center my-8 text-gray-900 dark:text-gray-100">
          Our Pet Collection
        </h2>
        <p className="text-md font-semibold text-center mb-8 text-gray-500 dark:text-gray-400">
          Adopt pets for free and shop supplies at reasonable prices.
        </p>

        {/* ✅ All products header + count */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100">
            All Products{" "}
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({totalItems}) Found
            </span>
          </h1>

          {/* ✅ Responsive controls */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:items-center">
            {/* Search */}
            <label className="input input-bordered flex items-center gap-2 bg-white dark:bg-[#1e1e2f] w-full sm:w-auto">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Search Products"
                className="grow"
              />
              {isSearching && (
                <span className="loading loading-spinner loading-sm"></span>
              )}
            </label>

            {/* Location filter */}
            <select
              className="select select-bordered bg-white dark:bg-[#1e1e2f] w-full sm:w-auto"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              title="Filter by location"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  Location: {loc}
                </option>
              ))}
            </select>

            {/* Sort by price */}
            <select
              className="select select-bordered bg-white dark:bg-[#1e1e2f] w-full sm:w-auto"
              value={sortPrice}
              onChange={(e) => setSortPrice(e.target.value)}
              title="Sort by price"
            >
              <option value="none">Sort: Default</option>
              <option value="asc">Price: Low → High</option>
              <option value="desc">Price: High → Low</option>
            </select>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="btn btn-outline btn-error w-full sm:w-auto"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* ✅ Category buttons BELOW All Products heading */}
        <div className="flex flex-wrap gap-2 md:gap-3 mt-5 justify-center md:justify-start">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`btn btn-sm md:btn-md rounded-full ${
                selectedCategory === cat
                  ? "btn bg-indigo-700 text-white dark:bg-yellow-500 dark:text-gray-900"
                  : "btn-outline text-gray-800 dark:text-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ✅ Listing */}
        {isSearching ? (
          <div className="flex justify-center items-center h-[50vh]">
            <span className="loading loading-dots loading-xl"></span>
          </div>
        ) : totalItems === 0 ? (
          <ErrorProductPage search={search} />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {paginated.map((product) => (
                <ListingCard
                  key={product._id?.$oid || product._id}
                  product={product}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap justify-center items-center gap-2 mt-10 pb-10">
              <button
                className="btn btn-outline"
                disabled={safePage === 1}
                onClick={() => goToPage(safePage - 1)}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }).map((_, i) => {
                const p = i + 1;
                const active = p === safePage;
                return (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    className={`btn ${
                      active
                        ? "bg-indigo-700 text-white dark:bg-yellow-500 dark:text-gray-900"
                        : "btn-outline"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}

              <button
                className="btn btn-outline"
                disabled={safePage === totalPages}
                onClick={() => goToPage(safePage + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PetsSupplies;
