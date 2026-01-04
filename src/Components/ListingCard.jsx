import { Link } from "react-router";

const ListingCard = ({ product }) => {
  const { image, name, Price, category, _id, location } = product;

  return (
    <div
      className="
        rounded-2xl p-4 shadow-md transition-all duration-300 ease-in-out
        hover:shadow-xl hover:-translate-y-1

        /* LIGHT MODE */
        bg-linear-to-br from-indigo-50 via-white to-indigo-100
        text-gray-900  border border-indigo-200

        /* DARK MODE */
        dark:bg-linear-to-br dark:from-[#1e1e2f] dark:via-[#25253a] dark:to-[#2f2f4a]
        dark:text-gray-100

        hover:ring-1 hover:ring-indigo-300 dark:hover:ring-yellow-400

      "
    >
      {/* Image */}
      <img
        src={image}
        alt={name}
        className="
          w-full h-48 object-cover rounded-lg mb-4
          border border-gray-200 dark:border-gray-700
        "
      />

      {/* Product Name */}
      <h2 className="text-xl font-extrabold tracking-wide text-indigo-700 dark:text-yellow-300 mb-1">
        {name}
      </h2>

      {/* Category */}
      <p className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">
        <span className="font-semibold text-indigo-600 dark:text-yellow-400">
          Category:
        </span>{" "}
        {category}
      </p>

      {/* Location & Price */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 italic">
          📍 {location}
        </p>

        <p
          className={`text-lg font-bold ${
            Price == 0
              ? "text-green-600 dark:text-green-400"
              : "text-indigo-700 dark:text-yellow-400"
          }`}
        >
          {Price == 0 ? "Free" : `৳ ${Price}`}
        </p>
      </div>

      {/* Button */}
      <Link to={`/pet-supplies/${_id}`}>
        <div
          className="
            w-full text-center font-semibold py-2 rounded-lg transition
            bg-indigo-600 text-white  hover:bg-indigo-700
            dark:bg-yellow-400 dark:text-gray-900 dark:hover:bg-yellow-500
          "
        >
          View Details
        </div>
      </Link>
    </div>
  );
};

export default ListingCard;
