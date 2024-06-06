// src/components/TheatreAdminCard.jsx
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const TheatreAdminCard = ({ theatre, onEditClick, onDeleteClick }) => {
    return (
        <div className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-bold mb-2">{theatre.name}</h2>
            <p className="text-gray-700 mb-2">Owner: {theatre.owner}</p>
            <p className="text-gray-700 mb-2">Address: {theatre.address}</p>
            <p className="text-gray-700 mb-2">Contact: {theatre.phone}</p>
            <div className="flex justify-end space-x-2 mt-4">
                <button
                    className="bg-yellow-500 text-white p-2 rounded"
                    onClick={() => onEditClick(theatre)}>
                    <FaEdit />
                </button>
                <button
                    className="bg-red-500 text-white p-2 rounded"
                    onClick={() => onDeleteClick(theatre._id)}>
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};

export default TheatreAdminCard;