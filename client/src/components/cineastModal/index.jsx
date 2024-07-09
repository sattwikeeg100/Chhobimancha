import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "sonner";
import {
    handleImageFileDelete,
    handleImageFileUpload,
} from "../../utils/fileHandler";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CineastModal = ({ cineast, onClose }) => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [details, setDetails] = useState("");
    const [uploadingImage, setUploadingImage] = useState(false);
    const [deletingImage, setDeletingImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saveRequire, setSaveRequire] = useState(false);

    useEffect(() => {
        if (cineast) {
            setName(cineast.name);
            setImage(cineast.image);
            setDetails(cineast.details);
        }
    }, [cineast]);

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) {
            toast.warning("Upload cineast image before saving!");
            return;
        }
        setLoading(true);
        try {
            if (cineast) {
                await axiosInstance.put(`/cineasts/${cineast._id}`, {
                    name,
                    image,
                    details,
                });
                toast.success("Cineast updated successfully!");
            } else {
                await axiosInstance.post(`/cineasts`, {
                    name,
                    image,
                    details,
                });
                toast.success("Cineast added successfully!");
            }
            setSaveRequire(false);
            onClose();
        } catch (error) {
            console.error("Error saving cineast:", error);
            toast.error("Error saving cineast");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async () => {
        if (cineast) {
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
            <div className="bg-white p-8 lg:w-[40%] md:w-[60%] w-full m-4 rounded shadow-lg">
                <h2 className="text-xl font-bold mb-4">
                    {cineast ? "Edit Cineast" : "Add New Cineast"}
                </h2>
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
                    {/* Image */}
                    <div className="flex flex-row items-center mb-4">
                        <label className="block text-gray-700 mb-1 w-full">
                            Cineast Photo
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
                                        setUploadingImage
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
                    {/* Details */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Details</label>
                        <textarea
                            className="w-full px-3 py-2 border rounded"
                            value={details}
                            onChange={handleInputChange(setDetails)}
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

export default CineastModal;
