import React from "react";
import { PawPrint, Heart, ShieldCheck, Users } from "lucide-react";

const About = () => {
  return (
    <section className="bg-gray-50 dark:bg-[#1e1e2f] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-indigo-700 dark:text-yellow-300 mb-6">
          Why Adopt from{" "}
          <span className="text-indigo-600 dark:text-yellow-400">PawMart?</span>
        </h2>

        <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 text-lg mb-12">
          At PawMart, we believe every pet deserves a loving home. By adopting
          through our trusted community, you’re not just gaining a companion —
          you’re giving a life a second chance. Here’s why people choose
          PawMart.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="bg-white dark:bg-[#2a2a3c] rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
            <PawPrint className="mx-auto text-indigo-600 dark:text-yellow-400 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
              Rescue, Don’t Shop
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Every adoption helps reduce the number of stray and homeless
              animals in our communities.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-[#2a2a3c] rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
            <Heart className="mx-auto text-indigo-600 dark:text-yellow-400 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
              Verified & Caring Owners
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              All listings are verified to ensure pets come from safe,
              responsible, and loving environments.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-[#2a2a3c] rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
            <ShieldCheck className="mx-auto text-indigo-600 dark:text-yellow-400 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
              Safe Adoption Process
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Our platform ensures transparent communication and secure adoption
              procedures for every user.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white dark:bg-[#2a2a3c] rounded-2xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
            <Users className="mx-auto text-indigo-600 dark:text-yellow-400 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
              Community of Pet Lovers
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Join a growing community of adopters, rescuers, and pet care
              enthusiasts dedicated to making a difference.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
