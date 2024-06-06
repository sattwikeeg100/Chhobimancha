import React from "react";
import hamlet_poster from "../../assets/theatreImages/hamletPoster.jpg";

const ShowDetails = () => {
  return (
    <div className="flex flex-col items-start justify-normal">
      <div className=" bg-shadow max-w-[40rem] p-4 rounded-xl flex flex-col items-center ">
        <img
          src={hamlet_poster}
          alt="title"
          className="mb-4 rounded-md object-cover"
        />
        <h2 className="text-lg font-semibold text-center">Hamlet</h2>
      </div>

      <div className="flex flex-col items-start text-white">
        <div>Showtime</div>
        <div>Showdate</div>
        <div>Venue</div>
      </div>
    </div>
  );
};

export default ShowDetails;
