import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://paw-mart-server-roan.vercel.app/category/${category}`
        );
        if (!response.ok) {
          throw new Error("Category not found");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [category]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (products.length === 0)
    return (
      <p className="text-center mt-10 text-gray-500">
        No products found in this category.
      </p>
    );

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <>
      {" "}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {products.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow rounded-lg p-4 hover:shadow-xl transition dark:bg-gray-800"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="mt-2 font-semibold text-lg">{item.name}</h3>
            <p className="text-sm text-gray-700 dark:text-white">
              {item.description}
            </p>
            <p className="font-bold mt-2">
              {item.Price == "0" ? "Free" : `$ ${item.Price}`}
            </p>
          </div>
        ))}
      </div>
      <button
        onClick={handleGoBack}
        className="btn bg-indigo-600 text-white hover:bg-indigo-700
            dark:bg-yellow-400 dark:text-gray-900 dark:hover:bg-yellow-500 max-w-100 text-center mx-auto block my-10"
      >
        Go Back
      </button>
    </>
  );
};

export default CategoryPage;
