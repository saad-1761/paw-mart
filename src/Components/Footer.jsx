import React from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 px-10 py-12 min-h-[300px]">
      <div className="grid md:grid-cols-5 gap-2">
        <div>
          <h3 className="text-white font-semibold mb-2">PawMart</h3>
          <p className="text-sm max-w-[150px]">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam
            similique commodi sapiente dolores repellendus neque dolorem quaerat
            fugiat veritatis ea?
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Company</h4>
          <ul className="space-y-1 text-sm">
            <li>About Us</li>
            <li>Our Mission</li>
            <li>Contact Sales</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Services</h4>
          <ul className="space-y-1 text-sm">
            <li>Product & Services</li>
            <li>Customer Stories</li>
            <li>Download Apps</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Information</h4>
          <ul className="space-y-1 text-sm">
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>Join Us</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Social Links</h4>
          <ul className="space-y-1 text-sm  ">
            <li className="flex gap-2 items-center">
              <FaFacebook></FaFacebook> <p>Paw-Mart</p>
            </li>
            <li className="flex gap-2 items-center">
              <FaInstagram></FaInstagram>Paw-Mart
            </li>
            <li className="flex gap-2 items-center">
              <FaLinkedin></FaLinkedin>Paw-Mart{" "}
            </li>
            <li className="flex gap-2 items-center">
              <FaEnvelope></FaEnvelope> support@ph.com
            </li>
          </ul>
        </div>
      </div>
      <div className="text-left md:text-center text-gray-500 text-sm mt-8">
        © 2025 Paw Mart.
        <br className="block md:hidden" /> All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
