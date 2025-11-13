import React, { useEffect, useState } from "react";
import useListing from "../Hooks/useListing";
import ListingCard from "../Components/ListingCard";

import ErrorProductPage from "./ErrorProductPage";

const PetsSupplies = () => {
  const { listings, loading } = useListing();
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const term = search.trim().toLowerCase();
  const searchedCategory = term
    ? listings.filter((listing) => listing.name.toLowerCase().includes(term))
    : listings;

  useEffect(() => {
    if (search) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setIsSearching(false);
    }
  }, [search]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="max-w-7xl mx-auto w-full  md:px-8 lg:px-12 py-4 md:py-8 lg:py-12">
          <h2 className="text-4xl md:text-6xl font-bold text-center my-8">
            Our Pet collection
          </h2>
          <p className="text-md font-semibold text-center mb-8 text-gray-400">
            Explore all pets on the market cared by us. We share happiness for
            Millions.
          </p>
        </div>

        <div className="flex justify-between py-5 items-center max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <h1 className="text-3xl font-semibold">
            All Products{" "}
            <span className="text-sm text-gray-500">
              ({searchedCategory.length}) Products Found.
            </span>
          </h1>
          <label className="input">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="Search Category"
            />
            {isSearching && (
              <span className="loading loading-spinner loading-sm absolute right-3 top-1/2 -translate-y-1/2"></span>
            )}
          </label>
        </div>
        {isSearching ? (
          <div className="flex justify-center items-center h-screen">
            <span className="loading loading-dots loading-xl"></span>
          </div>
        ) : searchedCategory.length === 0 ? (
          <ErrorProductPage search={search}></ErrorProductPage>
        ) : (
          <div className="grid grid-cols-1 max-w-7xl mx-auto w-full  md:px-8 lg:px-12 py-4 md:py-8 lg:py-12 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {searchedCategory.map((product) => (
              <ListingCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PetsSupplies;
