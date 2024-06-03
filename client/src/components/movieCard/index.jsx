import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaHeart } from "react-icons/fa";

const MovieCard = ({ movie, onAddToFavorites }) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg relative bg-gray-800 text-white">
      <div className="relative">
        <img
          className="w-full h-96 object-cover"
          src="https://images-cdn.ubuy.co.in/63503469d017ab73b23f23fb-sholay-bollywood-movie-poster-metal-tin.jpg"
          //src={movie.image}
          alt={movie.name}
        />
        <button
          onClick={() => onAddToFavorites(movie)}
          className="absolute top-2 right-2 bg-yellow-400 text-gray-900 p-2 rounded-full hover:bg-yellow-500"
        >
          <FaHeart />
        </button>
      </div>
      <div className="flex justify-between">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{movie.name}</div>
          <p className="text-gray-400 text-base">{movie.desc}</p>
        </div>
        <div className="size-24 justify-center items-center m-4">
          <CircularProgressbar
            value={movie.averagerating}
            maxValue={10}
            text={`${movie.averagerating}`}
            styles={buildStyles({
              textColor: "white",
              pathColor: "yellow",
              trailColor: "gray",
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
