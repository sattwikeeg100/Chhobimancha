// src/components/ProfileCard.jsx
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProfileCard = ({ profile, onEditClick, onDeleteClick }) => {
  const getInitials = (name) => {
    const names = name.split(" ");
    const initials = names.map((name) => name[0]).join("");
    return initials.toUpperCase();
  };

  return (
    <div className="bg-shadow text-primary_text rounded-lg shadow-lg p-8 flex flex-col items-center w-full max-w-lg">
      {profile.image ? (
        <img
          src={profile.image}
          alt={profile.name}
          className="w-64 h-64 object-cover mb-4 rounded-full"
        />
      ) : (
        <h2 className="w-64 h-64 flex items-center justify-center bg-gray-700 rounded-full text-4xl text-white font-semibold mb-4">
          {getInitials(profile.name)}
        </h2>
      )}
      <h2 className="text-3xl text-primary_text font-bold mb-2 text-center font-montserrat">
        {profile.name}
      </h2>
      <p className="text-secondary_text font-medium font-ubuntu text-lg mb-2">
        {profile.email}
      </p>
      {profile.isAdmin ? (
        <p className="text-primary_text font-medium font-ubuntu text-lg mb-2">
          Admin
        </p>
      ) : profile.isSubscriber ? (
        <p className="text-_text font-medium font-ubuntu text-lg mb-2">
          Subscriber
        </p>
      ) : (
        <>
          <p className="text-secondary_text mb-4 text-center">Subscriber</p>
          <Link to="/subscribe" className="text-highlight mb-4 text-center">
            Planning to get a subscription? <u>Subscribe Now</u>
          </Link>
        </>
      )}
      <div className="flex space-x-4">
        <button
          className="border border-highlight text-highlight hover:bg-highlight hover:text-primary_text flex items-center font-semibold p-2 rounded gap-2"
          onClick={onEditClick}
        >
          Edit Profile
          <FaEdit />
        </button>
        <button
          className="bg-highlight hover:bg-highlight_hover flex items-center text-primary_text font-semibold p-2 rounded gap-2 cursor-pointer text-md font-roboto"
          onClick={onDeleteClick}
        >
          Delete Account
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
