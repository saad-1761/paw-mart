import React from "react";

const FaqSection = () => {
  const faqs = [
    {
      q: "Is pet adoption really free on PawMart?",
      a: "Yes. Pets listed for adoption are free. Our goal is to help pets find safe, loving homes.",
    },
    {
      q: "What items can I buy from PawMart?",
      a: "You can buy pet supplies like food, accessories, grooming items, toys, and care essentials at reasonable prices.",
    },
    {
      q: "How do I contact the pet owner or seller?",
      a: "Open a listing and use the contact option to connect securely with the owner/seller.",
    },
    {
      q: "Are listings verified?",
      a: "We encourage verified listings and community trust. Always review details carefully before adopting or purchasing.",
    },
    {
      q: "Can I list my pet supplies for sale?",
      a: "Yes! You can add listings from your dashboard and manage them anytime.",
    },
  ];

  return (
    <section className="bg-gray-50 dark:bg-[#0f0f18] py-16">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-indigo-700 dark:text-yellow-300 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Quick answers about adoption, shopping, and using PawMart.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((f, idx) => (
            <div
              key={idx}
              className="collapse collapse-arrow bg-white dark:bg-[#1e1e2f] rounded-2xl shadow-md"
            >
              <input type="checkbox" />
              <div className="collapse-title text-lg font-semibold text-gray-800 dark:text-gray-100">
                {f.q}
              </div>
              <div className="collapse-content text-gray-600 dark:text-gray-300">
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
