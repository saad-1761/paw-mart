import React from "react";

const About = () => {
  return (
    <div className="min-h-screen  py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
          About PawMart
        </h1>

        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
          <span className="font-semibold">PawMart</span> is a trusted platform
          where pet lovers can find all their favourite pets and pet supplies in
          one place. Our goal is to make pet adoption, shopping, and care
          simple, safe, and accessible for everyone.
        </p>

        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
          At PawMart, pets are offered{" "}
          <span className="font-semibold">free for adoption</span>, because we
          believe every animal deserves a loving home. Alongside adoption, we
          provide a wide range of high-quality pet supplies — including food,
          accessories, and care essentials — all at reasonable and affordable
          prices.
        </p>

        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
          Our platform is designed to be secure and user-friendly, ensuring a
          smooth experience whether you are adopting a pet, browsing supplies,
          or managing your listings. We focus on transparency, safety, and ease
          of use for both buyers and sellers.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Free Adoption
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Pets are always free to adopt, helping them find caring homes.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Affordable Supplies
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Quality pet supplies at reasonable prices for every pet owner.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Secure Platform
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              A safe, reliable, and user-friendly experience for everyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
