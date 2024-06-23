// src/components/ProfileCard.jsx
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProfileCard = ({ profile, onEditClick, onDeleteClick }) => {
    const getInitials = (name) => {
        const names = name.split(" ");
        const initials = names.map((name) => name[0]).join("");
        return initials.toUpperCase();
    };

    return (
        <div className="bg-white rounded shadow p-4 flex flex-col items-center">
            {profile.image ? (
                <img
                    src={profile.image}
                    alt={profile.name}
                    className="w-32 h-32 object-cover mb-4 rounded-full"
                />
            ) : (
                <div className="w-24 h-24 flex items-center justify-center bg-gray-700 rounded-full text-4xl text-white font-semibold">
                    {getInitials(profile.name)}
                </div>
            )}
            <h2 className="text-xl font-bold mb-2 text-center">
                {profile.name}
            </h2>
            <p className="text-gray-700 mb-2 text-center">{profile.email}</p>
            <div className="flex justify-end space-x-2 mt-4">
                <button
                    className="bg-yellow-500 flex justify-center items-center text-white font-semibold p-2 rounded gap-2"
                    onClick={onEditClick}>
                    Edit Profile <FaEdit />
                </button>
                <button
                    className="bg-red-500 flex justify-center items-center text-white font-semibold p-2 rounded gap-2"
                    onClick={onDeleteClick}>
                    Delete Profile <FaTrash />
                </button>
            </div>
        </div>
    );
};

export default ProfileCard;