// src/components/ProfileModal.jsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/slices/userSlice";
import { toast } from "sonner";
import { TiDeleteOutline } from "react-icons/ti";
import { handleImageFileDelete, handleImageFileUpload } from "../../utils/fileHandler";

const APIURL = import.meta.env.VITE_API_URL;

const ProfileModal = ({ profile, onClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (profile) {
            setName(profile.name);
            setEmail(profile.email);
            setImage(profile.image);
        }
    }, [profile]);

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleFileInputChange = (setter) => (e) => {
        setter(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const profileData = { name, email, image };
            dispatch(updateUser(profileData));
            toast.success("Profile updated successfully!");
            onClose();
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Error updating profile!");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            className="w-full px-3 py-2 border rounded"
                            type="text"
                            value={name}
                            onChange={handleInputChange(setName)}
                        />
                    </div>
                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            className="w-full px-3 py-2 border rounded"
                            type="email"
                            value={email}
                            onChange={handleInputChange(setEmail)}
                        />
                    </div>
                    {/* Image */}
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Profile Image
                        </label>
                        <div className="flex flex-row gap-3">
                            <input
                                className="w-full px-3 py-2 border rounded"
                                type="file"
                                onChange={handleFileInputChange(setImageFile)}
                            />
                            <button
                                type="button"
                                onClick={handleImageFileUpload(setImage, setImageFile, imageFile)}
                                className="bg-blue-500 text-white px-3 py-2 rounded">
                                Upload
                            </button>
                        </div>
                        {image && (
                            <div className="mt-4">
                                <img
                                    src={image}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full"
                                />
                                <button
                                    onClick={handleImageFileDelete(
                                            image.split("/").pop(),
                                            setImage
                                        )
                                    }
                                    className="mt-2 bg-red-500 text-white py-2 px-4 rounded">
                                    <TiDeleteOutline />
                                </button>
                            </div>
                        )}
                    </div>
                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                            onClick={onClose}
                            type="button">
                            Cancel
                        </button>
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded"
                            type="submit">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileModal;
