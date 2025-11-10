import { Link } from "react-router";

const ListingCard = ({ product }) => {
  const { image, name, Price, category, _id, location } = product;
  return (
    <div className="bg-linear-to-r h-95 from-[#74717b] to-[#c6c2cb] text-white p-4 rounded-xl shadow-sm">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-fill rounded-lg mb-3"
      />
      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-lg font-semibold mt-1 text-black">
        Category: {category}
      </p>
      <div className="flex justify-between">
        <p className="text-lg font-semibold mt-1 text-yellow-200">{location}</p>
        <p className="text-black font-bold my-2">
          Price: {Price == 0 ? "Free" : Price}
        </p>
      </div>

      <Link to={`/pet&supplies/${_id}`} className="">
        <div
          className="w-full bg-white
         text-center text-black font-bold  py-2 rounded-sm"
        >
          View Details
        </div>
      </Link>
    </div>
  );
};

export default ListingCard;
