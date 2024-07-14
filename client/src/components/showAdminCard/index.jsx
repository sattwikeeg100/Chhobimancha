import React, { useState } from "react";
import { FaEdit, FaTrash, FaClock } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa6";
import { MdLanguage } from "react-icons/md";

const ShowAdminCard = ({ show, onEditClick, onDeleteClick }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const renderDescription = () => {
    const words = show.description.split(" ");
    if (words.length <= 40 || showFullDescription) {
      return show.description;
    }
    const truncated = words.slice(0, 40).join(" ");
    return `${truncated}...`;
  };

  return (
    <div className="bg-shadow rounded shadow p-4 flex flex-col items-center gap-y-3">
      <img
        src={show.poster}
        alt={show.title}
        className="w-96 h-96 mb-4 rounded-md object-cover"
      />
      <h2 className="text-3xl text-primary_text font-bold font-montserrat">
        {show.title}
      </h2>
      <p className="text-secondary_text font-medium text-lg">
        {renderDescription()}{" "}
        {show.description.split(" ").length > 40 && (
          <span
            className="text-primary_text cursor-pointer"
            onClick={toggleDescription}
          >
            {showFullDescription ? "Show less" : "Read more..."}
          </span>
        )}
      </p>

      <div className="flex items-center justify-between w-full  text-primary_text">
        <p className=" font-medium text-center text-xl flex flex-row items-center gap-x-2">
          <FaCalendar className="w-5 h-5" />
          {new Date(show.date).toLocaleDateString()}
        </p>

        <p className="font-medium text-center text-xl flex flex-row items-center gap-x-2">
          <FaClock className="w-5 h-5" />
          <div>{show.time}</div>
        </p>

        <p className="font-medium text-center text-xl flex flex-row items-center gap-x-2">
          <MdLanguage className="w-6 h-6" />
          <div>{show.language}</div>
        </p>
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        <button
          className="bg-highlight hover:bg-highlight_hover text-white p-2 rounded"
          onClick={() => onEditClick(show)}
        >
          <FaEdit />
        </button>
        <button
          className="bg-primary_text hover:bg-red-800 text-highlight hover:text-primary_text p-2 rounded"
          onClick={() => onDeleteClick(show._id)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default ShowAdminCard;
