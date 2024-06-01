import React from "react";

const MovieCard = ({ movie }) => {
    return (
        <div className="max-w-xs rounded overflow-hidden shadow-lg">
            <img className="w-full" src={movie.image} alt={movie.title} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{movie.title}</div>
                <p className="text-gray-700 text-base">{movie.desc}</p>
            </div>
        </div>
    );
};

export default MovieCard;