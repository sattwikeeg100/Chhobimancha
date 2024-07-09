import React from "react";
import { FaTrash } from "react-icons/fa";

const UserCard = ({ user, amOwner, onToggleAuthorizeAdmin, onDeleteClick }) => {
    return (
        <div className="bg-white rounded shadow p-4 flex flex-col items-center">
            <img
                src={user.image ? user.image : "/avatar.jpg"}
                alt={user.name}
                className="w-full h-64 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-bold mb-2 text-center">{user.name}</h2>
            <p className="text-gray-700 mb-2 text-center">{user.email}</p>
            {amOwner && (
                <div className="flex flex-row w-full justify-between mt-4">
                    {user.isAdmin ? (
                        <button
                            className="bg-yellow-600 text-white p-2 rounded cursor-pointer"
                            onClick={() =>
                                onToggleAuthorizeAdmin(user._id, user.isAdmin)
                            }>
                            Remove admin authorization
                        </button>
                    ) : (
                        <button
                            className="bg-blue-500 text-white p-2 rounded cursor-pointer"
                            onClick={() =>
                                onToggleAuthorizeAdmin(user._id, user.isAdmin)
                            }>
                            Authorize as admin
                        </button>
                    )}
                    <button
                        className="bg-red-500 text-white p-2 rounded cursor-pointer"
                        onClick={() => onDeleteClick(user._id)}>
                        <FaTrash />
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserCard;
