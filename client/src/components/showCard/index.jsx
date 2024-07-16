import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLocationDot, FaClock, FaCalendarDay } from "react-icons/fa6";
import { IoLanguage } from "react-icons/io5";
import { MdLanguage } from "react-icons/md";

import { BsDot } from "react-icons/bs";

const ShowCard = ({ show }) => {
  const navigate = useNavigate();
  console.log(show);
  return (
    <section className="bg-shadow p-4 rounded-md shadow-md ">
      <div className="flex flex-col gap-y-3 text-primary_text ">
        <img
          src={show.poster}
          alt={show.title}
          className="w-full h-72 mb-4 rounded-md"
        />
        <h2 className="text-lg  font-semibold">{show.title}</h2>
        {/* <p className="text-gray-600">{show.description}</p> */}
        <div className="flex flex-wrap items-center justify-start self-stretch gap-x-10 gap-y-2 md:gap-x-7 xl:gap-x-5 sm:gap-x-2">
          <div className="flex items-center justify-center gap-x-2 text-sm md:text-base font-semibold">
            <FaCalendarDay /> {new Date(show.date).toLocaleDateString("en-GB")}
          </div>
          <div className="flex items-center justify-center gap-x-2 text-sm md:text-base font-semibold">
            <FaClock />
            {show.time}
          </div>
          <div className="flex items-center justify-center gap-x-2 text-sm md:text-base font-semibold">
            <MdLanguage className="w-5 h-5" />
            {show.language}
          </div>
        </div>

        <div className=" flex items-center gap-x-2  text-base  font-semibold">
          {/* connect new link */}

          <FaLocationDot />
          <p className="underline hover:text-secondary_text">
            <a href={show.theatre.address} target="_blank" className="">
              {show.theatre.name}
            </a>
          </p>
        </div>
      </div>
      <button
        className="bg-highlight hover:bg-highlight_hover text-primary_text font-bold font-ubuntu my-4 py-2 px-4 rounded w-full"
        onClick={() => navigate(`/explore/shows/${show.slug}`)}
      >
        Book Now
      </button>
    </section>
  );
};

export default ShowCard;
