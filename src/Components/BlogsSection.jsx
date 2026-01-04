import React from "react";
import { ArrowRight } from "lucide-react";

const BlogsSection = () => {
  const blogs = [
    {
      id: 1,
      title: "5 Tips for First-Time Pet Adoption",
      desc: "Simple steps to choose the right pet and prepare your home before adoption.",
      date: "Updated weekly",
    },
    {
      id: 2,
      title: "Essential Supplies Every Pet Owner Needs",
      desc: "A checklist of must-have items for daily care, comfort, and safety.",
      date: "New guide",
    },
    {
      id: 3,
      title: "Healthy Feeding: What to Avoid",
      desc: "Learn which foods are unsafe and how to build healthy eating habits.",
      date: "Popular",
    },
  ];

  return (
    <section className="bg-white dark:bg-[#12121c] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-indigo-700 dark:text-yellow-300 mb-2">
              Blogs & Pet Care Tips
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Helpful guides to adopt responsibly and care for pets properly.
            </p>
          </div>

          <button
            className="btn btn-outline hidden sm:inline-flex"
            onClick={() => alert("Create /blogs route later")}
          >
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((b) => (
            <div
              key={b.id}
              className="bg-gray-50 dark:bg-[#1e1e2f] rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6"
            >
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                {b.date}
              </p>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {b.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-5">
                {b.desc}
              </p>
              <button
                className="btn btn-sm bg-indigo-600 text-white hover:bg-indigo-700
            dark:bg-yellow-400 dark:text-gray-900 dark:hover:bg-yellow-500"
                onClick={() => alert("Open blog details page later")}
              >
                Read More
              </button>
            </div>
          ))}
        </div>

        <div className="sm:hidden mt-8 text-center">
          <button
            className="btn btn-outline"
            onClick={() => alert("Create /blogs route later")}
          >
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;
