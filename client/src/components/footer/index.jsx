// src/components/Footer.jsx

import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoCall, IoMail } from "react-icons/io5";

import { Link } from "react-router-dom";

import logo from "../../assets/theatreImages/hamlet.png";

export const socialHandles = [
  {
    icon: <FaYoutube />,
    path: "https://www.instagram.com/p/C8eqZdDh-on/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    icon: <FaInstagram />,
    path: "https://www.instagram.com/p/C8eqZdDh-on/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    icon: <FaFacebookF />,
    path: "https://www.instagram.com/p/C8eqZdDh-on/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
  {
    icon: <FaXTwitter />,
    path: "https://www.instagram.com/p/C8eqZdDh-on/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
  },
];

const Footer = () => {
  return (
    <footer className="px-10 bg-background2 text-white py-8 mt-0">
      <div className="flex flex-col sm:flex-row items-center gap-y-3 sm:gap-y-0 justify-between self-stretch">
        {/* left side */}
        <div className="flex flex-col items-start justify-center">
          <div className="mb-2 gap-x-2 flex items-center">
            <img
              src={logo}
              alt="chobimancha_logo"
              className="rounded-full w-16"
            />
            <h2>Chobimancha</h2>
          </div>
          <div className="flex items-center justify-center gap-x-2 font-bold  text-base lg:text-lg font-lato">
            <Link
              className="text-highlight hover:text-highlight_hover"
              to="/privacy"
            >
              Privacy
            </Link>
            <p>|</p>
            <Link
              className="text-highlight hover:text-highlight_hover"
              to="/disclaimer"
            >
              Disclaimer
            </Link>
            <p>|</p>
            <Link
              className="text-highlight hover:text-highlight_hover"
              to="/sitemap"
            >
              Sitemap
            </Link>
          </div>
          <div className=" text-sm lg:text-base text-primary-text font-semibold font-open_sans text-center">
            <p>© 2024 Chobimancha. All rights reserved.</p>
          </div>
        </div>

        {/* middle side */}
        <div className="flex flex-col items-center justify-center gap-y-3">
          <div className="flex flex-col xl:flex-row items-center sm:items-start xl:items-center justify-center gap-y-3 xl:gap-y-0 gap-x-3">
            <div className="flex flex-col items-start justify-center">
              <h1 className="text-[1.2rem] lg:text-[1.35rem] font-bold text-center  text-primary-text font-montserrat">
                মঞ্চ যখন উঠবে সেজে, <br />
                দেখবো ছবি খোশমেজাজে
              </h1>
            </div>
          </div>

          {/* social media */}
          <div className="flex items-center justify-center gap-x-7">
            {socialHandles.map((social, i) => (
              <Link
                key={i}
                to={social.path}
                className="p-1 text-xl rounded-full bg-shadow text-highlight hover:text-highlight_hover "
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* right side */}
        <div className="flex flex-col items-start justify-center ">
          <div className="mb-4 grid grid-cols-2 items-center justify-center gap-y-2 font-bold font-montserrat text-base">
            <Link className="text-highlight hover:text-highlight_hover " to="/">
              Home
            </Link>
            <Link
              className="text-highlight hover:text-highlight_hover "
              to="/explore/movies"
            >
              {" "}
              Explore Movies
            </Link>
            <Link
              className="text-highlight hover:text-highlight_hover "
              to="/explore/shows"
            >
              {" "}
              Book a show
            </Link>
            <Link
              className="text-highlight hover:text-highlight_hover "
              to="/subscribe"
            >
              {" "}
              Buy Subscription
            </Link>
          </div>

          {/* control room */}
          <div className="flex items-center justify-center gap-x-3 font-lato ">
            <IoCall className=" text-highlight  p-1 text-2xl bg-shadow rounded-full" />
            <h1 className="text-base font-semibold">+91 74393 22718</h1>
          </div>
          <div className="flex items-center justify-center gap-x-3 font-lato ">
            <IoMail className=" text-highlight  p-1 text-2xl bg-shadow rounded-full" />
            <h1 className="text-base font-semibold">
              chobimanchahelpline@gmail.com
            </h1>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
