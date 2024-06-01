import React from "react";

const ShowCard = ({ show }) => {
    return (
        <div className="bg-white p-4 rounded-md shadow-md">
            <img
                src={show.image}
                alt={show.showtitle}
                className="w-full h-auto mb-4 rounded-md"
            />
            <h2 className="text-lg font-semibold">{show.showtitle}</h2>
            <p className="text-gray-600">{show.showdesc}</p>
            {/* You can add more show information here */}
        </div>
    );
};

export default ShowCard;
