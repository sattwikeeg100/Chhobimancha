import React from "react";
import hamlet_poster from "../../assets/theatreImages/hamletPoster.jpg";
import { FaLocationDot, FaClock, FaCalendarDay } from "react-icons/fa6";

const ShowDetails = ({ show }) => {
  return (
    <div className="flex flex-col items-start justify-start gap-y-3">
      <div className="  bg-shadow max-w-[40rem]   p-3 gap-y-3 rounded-xl flex flex-col items-center">
        <img
          src={show.poster}
          alt="title"
          className="rounded-xl object-cover max-h-[40rem] w-[40rem]"
        />
        <h2 className="text-2xl text-center leading-6 text-primary_text font-serif font-bold">
          {show.title}
        </h2>
      </div>

      <div className="flex flex-wrap gap-x-10 items-start text-white">
        <div className="flex items-center justify-between self-stretch gap-x-10">
          <div className="flex items-center justify-center gap-x-2 text-lg font-semibold">
            <FaCalendarDay /> {new Date(show.date).toLocaleDateString()}
          </div>
          <div className="flex items-center justify-center gap-x-2 text-lg font-semibold">
            <FaClock />
            {show.time}
          </div>
        </div>

        <div className=" text-lg hover:text-secondary_text font-semibold">
          {/* connect new link */}
          <a
            href={show.theatre.address}
            target="_blank"
            className="flex items-center justify-center gap-x-2"
          >
            <FaLocationDot />
            <p className="underline ">{show.theatre.name}</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
