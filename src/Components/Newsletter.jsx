import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Later connect to backend (POST /newsletter)
    setEmail("");
    alert("Subscribed! (Connect to backend later)");
  };

  return (
    <section className="bg-gray-50 dark:bg-[#0f0f18] py-16">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="bg-white dark:bg-[#1e1e2f] rounded-2xl shadow-md p-8 md:p-12">
          <h2 className="text-3xl font-extrabold text-indigo-700 dark:text-yellow-300 mb-3">
            Join Our Newsletter
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
            Get new pet listings, care tips, and special deals on supplies —
            straight to your inbox.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input input-bordered w-full bg-white dark:bg-gray-900"
            />
            <button
              type="submit"
              className="btn bg-indigo-500 border-white text-white hover:bg-indigo-700 hover:text-indigo-200 
              dark:bg-yellow-400
              dark:border-gray-900 dark:text-gray-900 dark:hover:bg-black
              dark:hover:text-yellow-300"
            >
              Subscribe
            </button>
          </form>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
