import BannerCarousel from "../Components/BannerCarousel";
import { useLoaderData } from "react-router";
import ListingCard from "../Components/ListingCard";
import useListing from "../Hooks/useListing";
import HomeCategories from "./HomeCategories";

const Home = () => {
  const data = useLoaderData();
  const { loading } = useListing();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    <>
      <BannerCarousel></BannerCarousel>

      <div className="text-4xl md:text-6xl font-bold text-center my-8">
        <h2>Latest Products</h2>
      </div>
      <div className="grid grid-cols-1 max-w-7xl mx-auto w-full  md:px-8 lg:px-12 py-4 md:py-8 lg:py-12 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {data.map((product) => (
          <ListingCard key={product._id} product={product} />
        ))}
      </div>
      <HomeCategories></HomeCategories>
    </>
  );
};

export default Home;
