import React from "react";
import { useNavigate } from "react-router";
import petImg from "../assets/Pets.jpg";
import foodImg from "../assets/Food.png";
import accessoriesImg from "../assets/Accessories.png";
import careImg from "../assets/Care.jpg";
const categories = [
  { name: "Pets", image: petImg },
  { name: "Pet Food", image: foodImg },
  { name: "Accessories", image: accessoriesImg },
  { name: "Pet Care", image: careImg },
];

const HomeCategories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <>
      <div className="text-4xl md:text-6xl font-bold text-center my-8">
        <h2>Our Categories</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-8 max-w-7xl mx-auto">
        {categories.map((cat, i) => (
          <div
            key={i}
            onClick={() => handleCategoryClick(cat.name)}
            className="cursor-pointer bg-white shadow-lg rounded-lg hover:scale-105 transition-transform p-2 text-center"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="rounded-lg w-full h-32 object-contain"
            />
            <p className="mt-2 font-semibold">{cat.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomeCategories;
