// src/components/Footer.jsx

import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 mt-0">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-center mb-4 md:mb-0">
          <a
            href="https://github.com/sattwikeeg100/Showtime360"
            className="mx-2 text-gray-400 hover:text-white"
          >
            Terms
          </a>
          <a
            href="https://github.com/sattwikeeg100/Showtime360"
            className="mx-2 text-gray-400 hover:text-white"
          >
            Privacy Policies
          </a>
          <a
            href="https://github.com/sattwikeeg100/Showtime360"
            className="mx-2 text-gray-400 hover:text-white"
          >
            Contact
          </a>
        </div>
        <div className="flex mb-4 md:mb-0 text-xl">
          <a
            href="https://facebook.com"
            className="mx-2 text-gray-400 hover:text-white"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            className="mx-2 text-gray-400 hover:text-white"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            className="mx-2 text-gray-400 hover:text-white"
          >
            <FaInstagram />
          </a>
          <a
            href="https://youtube.com"
            className="mx-2 text-gray-400 hover:text-white"
          >
            <FaYoutube />
          </a>
        </div>
        <div className="text-center md:text-right">
          <p className="text-gray-400">Contact us: support@showtime360.com</p>
          <p className="text-gray-400">
            © 2024 Showtime360. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
