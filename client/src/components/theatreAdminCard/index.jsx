// src/components/TheatreAdminCard.jsx
import React from "react";
import { FaEdit, FaTrash, FaUser, FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { AiFillBank } from "react-icons/ai";

const TheatreAdminCard = ({ theatre, onEditClick, onDeleteClick }) => {
  return (
    <div className="bg-shadow rounded shadow p-4 flex flex-wrap flex-col  gap-y-3">
      <div className="flex flex-col gap-y-3">
        <img
          src={theatre.image}
          alt={theatre.name}
          className="w-full object-cover h-72 mb-4 rounded-md"
        />
        <h2 className="flex gap-x-2 items-center text-[0.8rem] sm:text-lg text-primary_text font-bold font-montserrat">
          <AiFillBank className="w-7 h-7" />
          {theatre.name}
        </h2>
        <h2 className="flex gap-x-2 items-center text-[0.8rem] sm:text-lg text-primary_text font-bold font-montserrat">
          <FaUser className="w-6 h-6" /> {theatre.owner}
        </h2>
        <h2 className="flex gap-x-2 items-center text-[0.8rem] sm:text-lg text-primary_text font-bold font-montserrat">
          <FaLocationDot className="w-6 h-6" /> {/* <FaLocationDot /> */}
          <p className="underline flex flex-wrap ">
            <a
              href={theatre.address}
              target="_blank"
              className="flex items-center gap-x-1 hover:text-secondary_text"
            >
              {theatre.addressName}
            </a>
          </p>
        </h2>

        <h2 className="flex gap-x-2 items-center text-[0.8rem] sm:text-lg text-primary_text font-bold font-montserrat">
          <FaPhoneAlt className="w-5 h-5" /> {theatre.phone}
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
