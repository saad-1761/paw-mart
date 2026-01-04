import React from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 px-10 py-12 min-h-[300px]">
      <div className="grid md:grid-cols-5 gap-2">
        <div>
          <h3 className="text-white font-semibold mb-2">PawMart</h3>
          <p className="text-sm max-w-[180px]">
            At PawMart, we believe every pet deserves a loving home. By adopting
            through our trusted community, you’re not just gaining a companion —
            you’re giving a life a second chance. Here’s why people choose
            PawMart.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">Company</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <NavLink to="/about" className="hover:underline">
                About Us
              </NavLink>
            </li>
            {/* <li>Our Mission</li> */}
            <li>
              <NavLink to={`/contact`} className={`hover:underline`}>
                Contact
              </NavLink>
            </li>
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
        © {new Date().getFullYear()} Paw Mart.
        <br className="block md:hidden" /> All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
