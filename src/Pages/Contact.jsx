import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen  py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 md:p-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
          Contact Us
        </h1>

        <p className="text-center text-gray-700 dark:text-gray-300 text-lg mb-8">
          Have questions, feedback, or need support? We’re here to help.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              📧 Email: <span className="font-medium">support@pawmart.com</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              📞 Phone: <span className="font-medium">+880 1234 567 890</span>
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              📍 Address: PawMart HQ, Dhaka, Bangladesh
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              Our support team is available to assist you with adoption queries,
              orders, and general questions.
            </p>
          </div>

          {/* Contact Form */}
          <form className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input input-bordered w-full bg-white dark:bg-gray-800"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full bg-white dark:bg-gray-800"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-300">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="textarea textarea-bordered w-full bg-white dark:bg-gray-800"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn  w-full bg-indigo-600 text-white hover:bg-indigo-700
            dark:bg-yellow-400 dark:text-gray-900 dark:hover:bg-yellow-500"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
