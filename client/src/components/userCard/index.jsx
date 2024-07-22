import React from "react";
import { FaTrash } from "react-icons/fa";

const UserCard = ({ user, amOwner, onToggleAuthorizeAdmin, onDeleteClick }) => {
  return (
    <div className="bg-shadow rounded shadow p-5 flex flex-col items-center">
      <img
        src={user.image ? user.image : "/avatar.jpg"}
        alt={user.name}
        className="w-72 h-72 object-cover mb-4 rounded"
      />
      <h2 className="text-xl text-primary_text font-bold mb-2 text-center font-montserrat">
        {user.name}
      </h2>
      <p className="text-secondary_text font-medium font-ubuntu text-lg mb-2">
        {user.email}
      </p>
      {amOwner && (
        <div className="flex flex-row w-full justify-center mt-4 space-x-4">
          {user.isAdmin ? (
            <button
              className="bg-highlight hover:bg-highlight_hover text-primary_text p-2 rounded cursor-pointer text-sm sm:text-base font-ubuntu"
              onClick={() => onToggleAuthorizeAdmin(user._id, user.isAdmin)}
            >
              Remove admin authorization
            </button>
          ) : (
            <button
              className="border border-highlight text-highlight hover:bg-highlight hover:text-primary_text p-2 rounded cursor-pointer text-sm sm:text-base font-ubuntu"
              onClick={() => onToggleAuthorizeAdmin(user._id, user.isAdmin)}
            >
              Authorize as admin
            </button>
          )}
          <button
            className="bg-primary_text hover:bg-red-800 text-highlight hover:text-primary_text py-1 px-2 rounded"
            onClick={() => onDeleteClick(user._id)}
          >
            <FaTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserCard;
