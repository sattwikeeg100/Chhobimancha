// src/components/MovieAdminCard.jsx
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const MovieAdminCard = ({ movie, onEditClick, onDeleteClick }) => {
  const [showFullDescription, setMovieFullDescription] = useState(false);

  const toggleDescription = () => {
    setMovieFullDescription(!showFullDescription);
  };

  const renderDescription = () => {
    const words = movie.description.split(" ");
    if (words.length <= 40 || showFullDescription) {
      return movie.description;
    }
    const truncated = words.slice(0, 40).join(" ");
    return `${truncated}...`;
  };

  return (
    <div className="bg-shadow rounded shadow p-4 flex flex-col items-center gap-y-3">
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-auto h-auto mb-4 rounded-md object-cover"
      />
      <h2 className="text-2xl text-primary_text font-bold font-montserrat text-center">
        {movie.title}
      </h2>

      <div className="flex flex-col items-center justify-center gap-y-2">
        <p className="text-secondary_text font-medium font-lato text-lg ">
          {renderDescription()}{" "}
          {movie.description.split(" ").length > 40 && (
            <span
              className="text-primary_text cursor-pointer"
              onClick={toggleDescription}
            >
              {showFullDescription ? "Show less" : "Read more..."}
            </span>
          )}
        </p>
        <p className="text-primary_text font-semibold text-lg font-lato">
          {movie.genres.join(", ")}
        </p>
      </div>
      <div className="flex justify-end space-x-4 mt-2">
        <button
          className="bg-highlight hover:bg-highlight_hover text-primary_text p-2 rounded"
          onClick={() => onEditClick(movie)}
        >
          <FaEdit />
        </button>
        <button
          className="bg-primary_text hover:bg-red-800 text-highlight hover:text-primary_text p-2 rounded"
          onClick={() => onDeleteClick(movie)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default MovieAdminCard;
