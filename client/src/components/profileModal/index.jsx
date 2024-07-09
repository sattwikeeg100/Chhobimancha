// src/components/ProfileModal.jsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/slices/userSlice";
import { toast } from "sonner";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
    handleImageFileDelete,
    handleImageFileUpload,
} from "../../utils/fileHandler";

const ProfileModal = ({ profile, onClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState(null);
    const [imageUploading, setImageUploading] = useState(false);
    const [imageDeleting, setImageDeleting] = useState(false);
    const [saveRequire, setSaveRequire] = useState(false);
    const [loading, setLoading] = useState(false);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image && profile.image) {
            toast.warning("Upload profile image before saving!");
            return;
        }
        setLoading(true);
        try {
            const profileData = { name, email, image };
            dispatch(updateUser(profileData));
            toast.success("Profile updated successfully!");
            setSaveRequire(false);
            onClose();
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Error updating profile!");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        if (!image && profile.image) {
            toast.warning("Upload profile image before leaving!");
            return;
        }
        if (saveRequire) {
            toast.warning("You need to save the changes before leaving!");
            return;
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-background2 text-primary_text p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-montserrat font-bold mb-4">
                    Edit Profile
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-secondary_text mb-1">
                            Name
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded bg-background1 text-primary_text"
                            type="text"
                            value={name}
                            onChange={handleInputChange(setName)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-secondary_text mb-1">
                            Email
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded bg-background1 text-primary_text"
                            type="email"
                            value={email}
                            onChange={handleInputChange(setEmail)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-secondary_text mb-1">
                            Profile Image
                        </label>
                        <div className="flex items-center space-x-3">
                            {imageUploading ? (
                                <label className="bg-red-500 text-white px-3 py-2 rounded cursor-pointer">
                                    Uploading image...
                                </label>
                            ) : (
                                <label
                                    className="bg-red-500 text-white px-3 py-2 rounded cursor-pointer"
                                    htmlFor="imageUpload">
                                    Upload image
                                </label>
                            )}
                            <input
                                id="imageUpload"
                                type="file"
                                className="hidden"
                                onChange={(e) => {
                                    setSaveRequire(true);
                                    handleImageFileUpload(
                                        e.target.files[0],
                                        image,
                                        setImage,
                                        setImageUploading
                                    );
                                }}
                            />
                        </div>
                        {image && (
                            <div className="mt-4 relative w-fit">
                                <img
                                    src={image}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full"
                                />
                                {imageDeleting ? (
                                    <AiOutlineLoading3Quarters className="animate-spin" />
                                ) : (
                                    <MdDeleteForever
                                        size={32}
                                        onClick={() =>
                                            handleImageFileDelete(
                                                image,
                                                setImage,
                                                setImageDeleting
                                            )
                                        }
                                        className="absolute top-0 right-0 text-highlight p-1 rounded-full cursor-pointer"
                                    />
                                )}
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="bg-gray-500 text-primary_text py-2 px-4 rounded mr-2"
                            onClick={() => handleCancel()}
                            type="button">
                            Cancel
                        </button>
                        {loading ? (
                            <button className="bg-highlight_hover cursor-not-allowed text-primary_text py-2 px-4 rounded">
                                Saving...
                            </button>
                        ) : (
                            <button
                                className="bg-highlight hover:bg-highlight_hover text-primary_text py-2 px-4 rounded"
                                type="submit">
                                Save
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileModal;
