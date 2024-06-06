// src/components/UserAdminCard.jsx
import React from "react";
import { FaTrash } from "react-icons/fa";

const UserCard = ({ user, onDeleteClick }) => {
    return (
        <div className="bg-white rounded shadow p-4 flex flex-col items-center">
            <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                //src={user.profilePicture}
                alt={user.name}
                className="w-full h-64 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-bold mb-2 text-center">
                {user.fullName}
            </h2>
            <p className="text-gray-700 mb-2 text-center">{user.email}</p>
            <div className="flex justify-end space-x-2 mt-4">
                <button
                    className="bg-red-500 text-white p-2 rounded"
                    onClick={() => onDeleteClick(user._id)}>
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};

export default UserCard;