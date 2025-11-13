import { Link } from "react-router";

const ListingCard = ({ product }) => {
  const { image, name, Price, category, _id, location } = product;

  return (
    <div className="bg-gradient-to-br from-[#3a3b5a] via-[#565871] to-[#a8a5b8] text-white p-4 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300 ease-in-out">
      {/* Image Section */}
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover rounded-lg mb-4 border border-gray-300"
      />

      {/* Product Info */}
      <h2 className="text-2xl font-extrabold tracking-wide text-yellow-300 mb-1">
        {name}
      </h2>
      <p className="text-base font-medium mb-2 text-gray-200">
        <span className="text-indigo-200 font-semibold">Category:</span>{" "}
        {category}
      </p>

      {/* Location & Price */}
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm font-semibold text-gray-100 italic">
          📍 {location}
        </p>
        <p
          className={`text-lg font-bold ${
            Price == 0 ? "text-green-300" : "text-yellow-400"
          }`}
        >
          {Price == 0 ? "Free" : `৳ ${Price}`}
        </p>
      </div>

      {/* Button */}
      <Link to={`/pet-supplies/${_id}`}>
        <div className="w-full bg-white/90 text-center text-black font-semibold py-2 rounded-lg hover:bg-white transition duration-300 shadow-sm hover:shadow-md">
          View Details
        </div>
      </Link>
    </div>
  );
};

export default ListingCard;
