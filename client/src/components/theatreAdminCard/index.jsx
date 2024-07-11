// src/components/TheatreAdminCard.jsx
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const TheatreAdminCard = ({ theatre, onEditClick, onDeleteClick }) => {
  return (
    <div className="bg-shadow rounded shadow p-4 flex flex-wrap flex-col  gap-y-3">
      <div className="flex flex-col gap-y-3">
        <img
          src={theatre.image}
          alt={theatre.name}
          className="w-full object-cover h-72 mb-4 rounded-md"
        />
        <h2 className="text-[0.8rem] sm:text-xl text-primary_text font-bold font-montserrat">
          <strong className="underline text-primary_text">Name</strong>:{" "}
          {theatre.name}
        </h2>
        <h2 className="text-[0.8rem] sm:text-xl text-primary_text font-bold font-montserrat">
          <strong className="underline text-primary_text">Owner</strong>:{" "}
          {theatre.owner}
        </h2>
        <h2 className="text-[0.8rem] sm:text-xl text-primary_text font-bold font-montserrat flex gap-x-2">
          <strong className="underline text-primary_text">Address</strong>:{" "}
          <a
            href={theatre.address}
            target="_blank"
            className="flex items-center gap-x-1"
          >
            {/* <FaLocationDot /> */}
            <p className="underline flex flex-wrap">{theatre.addressName}</p>
          </a>
        </h2>

        <h2 className="text-[0.8rem] sm:text-xl text-primary_text font-bold font-montserrat">
          <strong className="underline text-primary_text">Contact</strong>:{" "}
          {theatre.phone}
        </h2>
      </div>
      <div className="flex justify-start space-x-2 mt-4">
        <button
          className="bg-highlight hover:bg-highlight_hover text-white p-2 rounded"
          onClick={() => onEditClick(theatre)}
        >
          <FaEdit />
        </button>
        <button
          className="bg-primary_text hover:bg-red-800 text-highlight hover:text-primary_text p-2 rounded"
          onClick={() => onDeleteClick(theatre)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default TheatreAdminCard;
