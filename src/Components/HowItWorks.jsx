import React from "react";
import { Search, MessageCircle, Home, HeartHandshake } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: (
        <Search className="w-10 h-10 text-indigo-600 dark:text-yellow-400" />
      ),
      title: "Browse Listings",
      desc: "Explore a wide range of adorable pets and essential supplies verified by our trusted community.",
    },
    {
      icon: (
        <MessageCircle className="w-10 h-10 text-indigo-600 dark:text-yellow-400" />
      ),
      title: "Connect with Owners",
      desc: "Contact verified pet owners or shelters securely through PawMart’s messaging system.",
    },
    {
      icon: (
        <HeartHandshake className="w-10 h-10 text-indigo-600 dark:text-yellow-400" />
      ),
      title: "Adopt Responsibly",
      desc: "Review the pet’s details, health info, and background to ensure a perfect match before adoption.",
    },
    {
      icon: <Home className="w-10 h-10 text-indigo-600 dark:text-yellow-400" />,
      title: "Welcome Home!",
      desc: "Bring your new companion home and enjoy the joy, love, and warmth they bring into your life.",
    },
  ];

  return (
    <section className="bg-white dark:bg-[#12121c] py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-indigo-700 dark:text-yellow-300 mb-6">
          How{" "}
          <span className="text-indigo-600 dark:text-yellow-600">PawMart </span>
          Works
        </h2>

        <p className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 text-lg mb-12">
          We make the adoption process simple, safe, and meaningful — so you can
          focus on finding your perfect furry friend.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center items-center gap-10 md:gap-8 mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-[#1e1e2f] flex flex-col items-center text-center p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 w-full h-full "
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
