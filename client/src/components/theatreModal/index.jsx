// src/components/theatreModal
import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "sonner";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
    handleImageFileDelete,
    handleImageFileUpload,
} from "../../utils/fileHandler";

const TheatreModal = ({ theatre, onClose }) => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [owner, setOwner] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [uploadingImage, setUploadingImage] = useState(false);
    const [deletingImage, setDeletingImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saveRequire, setSaveRequire] = useState(false);

    useEffect(() => {
        if (theatre) {
            setName(theatre.name);
            setImage(theatre.image);
            setOwner(theatre.owner);
            setAddress(theatre.address);
            setPhone(theatre.phone);
        }
    }, [theatre]);

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) {
            toast.warning("Upload theatre image before saving!");
            return;
        }
        setLoading(true);
        try {
            if (theatre) {
                await axiosInstance.put(`/theatres/${theatre._id}`, {
                    name,
                    owner,
                    image,
                    address,
                    phone,
                });
                toast.success("Theatre added successfully!");
            } else {
                await axiosInstance.post(`/theatres`, {
                    name,
                    owner,
                    image,
                    address,
                    phone,
                });
                toast.success("Theatre updated successfully!");
            }
            setSaveRequire(false);
            onClose();
        } catch (error) {
            console.error("Error saving theatre:", error);
            toast.error("Error Updating Theatre!");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async () => {
        if (theatre) {
            if (!image || saveRequire) {
                toast.warning("You need to save the changes before leaving!");
                return;
            }
        } else if (image) {
            try {
                await axiosInstance.delete(
                    `/upload/image/${image.split("/").pop()}`
                );
            } catch (error) {
                console.error("Error deleting uploaded file:", error);
            }
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-lg w-[40%]">
                <h2 className="text-xl font-bold mb-4">
                    {theatre ? "Edit Theatre" : "Add New Theatre"}
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Theatre Name
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded"
                            type="text"
                            value={name}
                            onChange={handleInputChange(setName)}
                        />
                    </div>
                    {/* Image */}
                    <div className="flex flex-row items-center mb-4">
                        <label className="block text-gray-700 mb-1 w-full">
                            Theatre Stage Image
                        </label>
                        <div className="flex items-center">
                            {uploadingImage ? (
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
                                        setUploadingImage,
                                    );
                                }}
                            />
                            {image && (
                                <div className="w-fit flex items-center ml-2">
                                    <img
                                        src={image}
                                        className="h-14 w-14 rounded-full"
                                    />
                                    {deletingImage ? (
                                        <AiOutlineLoading3Quarters className="animate-spin" />
                                    ) : (
                                        <MdDeleteForever
                                            size={46}
                                            className="cursor-pointer"
                                            onClick={() => {
                                                setSaveRequire(false);
                                                handleImageFileDelete(
                                                    image,
                                                    setImage,
                                                    setDeletingImage
                                                );
                                            }}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Address */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Address</label>
                        <input
                            className="w-full px-3 py-2 border rounded"
                            type="text"
                            value={address}
                            onChange={handleInputChange(setAddress)}
                        />
                    </div>
                    {/* Owner */}
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Owner Name
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded"
                            type="text"
                            value={owner}
                            onChange={handleInputChange(setOwner)}
                        />
                    </div>
                    {/* Contact */}
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Contact Number
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded"
                            type="text"
                            value={phone}
                            onChange={handleInputChange(setPhone)}
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                            onClick={() => handleCancel()}
                            type="button">
                            Cancel
                        </button>
                        {loading ? (
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded cursor-not-allowed"
                                type="submit">
                                Saving...
                            </button>
                        ) : (
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded"
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

export default TheatreModal;
