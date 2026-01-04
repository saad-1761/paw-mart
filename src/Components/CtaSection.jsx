import React from "react";
import { useNavigate } from "react-router-dom";

const CtaSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white dark:bg-[#12121c] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="bg-indigo-700 dark:bg-yellow-500 rounded-2xl shadow-md p-10 md:p-14 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white dark:text-gray-900 mb-4">
            Ready to Adopt or Shop?
          </h2>
          <p className="max-w-3xl mx-auto text-indigo-100 dark:text-gray-900/80 text-lg mb-8">
            Adopt pets for free and get pet supplies at reasonable prices — all
            in one secure, user-friendly platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              className="btn text-indigo-700 hover:bg-indigo-900 hover:text-gray-100 dark:bg-gray-900 dark:text-yellow-300 dark:hover:bg-yellow-100 dark:hover:text-gray-900 border-0"
              onClick={() => navigate("/pet-supplies")}
            >
              Browse Listings
            </button>
            <button
              className="btn btn-outline border-white text-white hover:bg-white hover:text-indigo-700 dark:border-gray-900 dark:text-gray-900 dark:hover:bg-gray-900 dark:hover:text-yellow-300"
              onClick={() => navigate("/register")}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
