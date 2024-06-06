import React, { useState } from "react";

const SignUpModal = ({ isOpen, onClose, onLoginClick }) => {
    const [isAdmin, setIsAdmin] = useState(false);

    if (!isOpen) return null;

    const handleIsAdminChange = () => {
        setIsAdmin(!isAdmin);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        formData.append("isAdmin", isAdmin);
        // Handle form submission here, e.g., send formData to the backend
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                            autoComplete="username"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                            autoComplete="password"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Profile Image
                        </label>
                        <input
                            type="file"
                            name="image"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div className="mb-4 flex items-center">
                        <label className="block text-gray-700 mr-2">
                            Register as Admin
                        </label>
                        <input
                            type="checkbox"
                            checked={isAdmin}
                            onChange={handleIsAdminChange}
                            className="form-checkbox h-5 w-5 text-green-500"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                            onClick={onClose}>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded">
                            Sign Up
                        </button>
                    </div>
                    <div className="flex-row w-full text-black items-center">
                        Already a user?{" "}
                        <button
                            type="button"
                            onClick={onLoginClick}
                            className="text-blue-500">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUpModal;