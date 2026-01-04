import React, { useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";

const Stars = ({ value }) => {
  const rounded = Math.round(value);
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rounded
              ? "text-yellow-500 fill-yellow-500"
              : "text-gray-300 dark:text-gray-600"
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
        {value.toFixed(1)}
      </span>
    </div>
  );
};

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const res = await fetch("/reviews.json");
        const data = await res.json();

        // sort latest first
        const sorted = [...data].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setReviews(sorted);
      } catch (e) {
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  const topReviews = useMemo(() => reviews.slice(0, 6), [reviews]);

  return (
    <section className="bg-white dark:bg-[#12121c] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-indigo-700 dark:text-yellow-300 mb-4">
            What People Say About{" "}
            <span className="text-indigo-600 dark:text-yellow-600">
              PawMart
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 text-lg mb-12">
            Real feedback from our community — adoption is free, and supplies
            are affordable for everyone.
          </p>
        </div>

        {loading ? (
          <div className="text-center text-gray-600 dark:text-gray-300">
            Loading reviews...
          </div>
        ) : topReviews.length === 0 ? (
          <div className="text-center text-gray-600 dark:text-gray-300">
            No reviews found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topReviews.map((r) => (
              <div
                key={r.id}
                className="bg-gray-50 dark:bg-[#1e1e2f] rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={r.user_photoURL}
                    alt={r.userName}
                    className="w-12 h-12 rounded-full border-2 border-indigo-600 dark:border-yellow-400 object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-100">
                      {r.userName}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(r.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <Stars value={Number(r.ratings || 0)} />

                <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                  “{r.review}”
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
