import React from "react";
import hamlet_poster from "../../assets/theatreImages/hamletPoster.jpg";

const ShowDetails = ({ show }) => {
    return (
        <div className="flex flex-col items-start justify-normal">
            <div className=" bg-shadow max-w-[40rem] p-4 rounded-xl flex flex-col items-center ">
                <img
                    src={show.poster}
                    alt="title"
                    className="mb-4 rounded-md object-cover"
                />
                <h2 className="text-lg font-semibold text-center">
                    {show.title}
                </h2>
            </div>

            <div className="flex flex-col items-start text-white">
                <div>{new Date(show.date).toLocaleDateString()}</div>
                <div>{show.time}</div>
                <div>{show.theatre.name}</div>
                <div>{show.theatre.address}</div>
            </div>
        </div>
    );
};

export default ShowDetails;
