import React, { useState } from "react";
import axiosInstance from "../../../config/axiosInstance.js";
import { toast } from "sonner";

const SignUpModal = ({ isOpen, onClose, onLoginClick }) => {
    if (!isOpen) return null;

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword]=useState();
    const [imageFile, setImageFile] = useState(null);
    const [image, setImage] = useState();
    const [imageUploading, setImageUploading] = useState(false);
    const [error, setError] = useState(false);

    const APIURL = import.meta.env.VITE_API_URL;

    const handleImageFileUpload = async (imageFile) => {
        if (imageFile) {
            setImageUploading(true);
            const formData = new FormData();
            formData.append("file", imageFile);
            try {
                const response = await axiosInstance.post(
                    `${APIURL}/upload/image`,
                    formData
                );
                setImage(response.data.url);
                setImageFile(null);
                setImageUploading(false);
                console.log(response.data.url);
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        } else {
            return;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload = {
            name,
            email,
            image,
            password,
        };
        try {
            const response = await axiosInstance.post(`${APIURL}/users`, payload);
            setError(null);
            toast.success("Registration successful !");
            onLoginClick();
        } catch (error) {
            console.log(error);
            setError(error.response.data.message);
            toast.error("Registration failed !");
        }
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
                            className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            autoComplete="username"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="password"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            autoComplete="password"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Profile Image
                        </label>
                        <div className="flex flex-row gap-3">
                            <input
                                type="file"
                                name="image"
                                onChange={(e) =>
                                    setImageFile(e.target.files[0])
                                }
                                className="w-full text-black px-3 py-2 border rounded"
                            />
                            {image && (
                                <img
                                    className="h-12 w-12 rounded-full"
                                    src={image}
                                />
                            )}
                            {imageUploading ? (
                                <button type="button" className="text-black cursor-not-allowed">
                                    Uploading...
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="text-black"
                                    onClick={() =>
                                        handleImageFileUpload(imageFile)
                                    }>
                                    <u>Upload</u>
                                </button>
                            )}
                        </div>
                    </div>
                    {error && (
                        <div
                            className="alert alert-danger text-red-500"
                            role="alert">
                            {error} !
                        </div>
                    )}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                            onClick={onClose}>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded">
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
