// src/components/MovieAdminCard.jsx
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const MovieAdminCard = ({ movie, onEditClick, onDeleteClick }) => {
    return (
        <div className="bg-white rounded shadow p-4 flex flex-col items-center">
            <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-64 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-bold mb-2 text-center">
                {movie.title}
            </h2>
            <p className="text-gray-700 mb-2 text-center">{movie.desc}</p>
            <p className="text-gray-700 mb-2 font-semibold text-center">
                {movie.genre}
            </p>
            <div className="flex justify-end space-x-2 mt-4">
                <button
                    className="bg-yellow-500 text-white p-2 rounded"
                    onClick={() => onEditClick(movie)}>
                    <FaEdit />
                </button>
                <button
                    className="bg-red-500 text-white p-2 rounded"
                    onClick={() => onDeleteClick(movie._id)}>
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};

export default MovieAdminCard;