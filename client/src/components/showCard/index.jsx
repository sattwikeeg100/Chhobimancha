import React from "react";
import { useNavigate } from "react-router-dom";

const ShowCard = ({ show }) => {
    const navigate = useNavigate();
    return (
        <div className="bg-white p-4 rounded-md shadow-md">
            <img
                src={show.poster}
                alt={show.title}
                className="w-full h-72 mb-4 rounded-md"
            />
            <h2 className="text-lg font-semibold">{show.title}</h2>
            <p className="text-gray-600">{show.description}</p>
            <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold my-4 py-2 px-4 rounded w-full"
                onClick={() => navigate(`/explore/shows/${show.slug}`)}>
                Book Now
            </button>
        </div>
    );
};

export default ShowCard;
