import React from "react";

const ShowCard = ({ show }) => {
    return (
        <div className="bg-white p-4 rounded-md shadow-md">
            <img
                src="https://i.pinimg.com/736x/15/a6/8d/15a68d316c41d11fb73b2926680dde00.jpg"
                //src={show.image}
                alt={show.showtitle}
                className="w-full h-72 mb-4 rounded-md"
            />
            <h2 className="text-lg font-semibold">{show.showtitle}</h2>
            <p className="text-gray-600">{show.showdesc}</p>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold my-4 py-2 px-4 rounded w-full">
                Book Now
            </button>
        </div>
    );
};

export default ShowCard;
