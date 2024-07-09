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
    const [imageFile, setImageFile] = useState("");
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
        setSaveRequire(true);
    };

    const handleFileInputChange = (setter) => (e) => {
        setter(e.target.files[0]);
        setSaveRequire(true);
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
        if (theatre && saveRequire) {
            toast.warning("You need to save the changes before leaving!");
            return;
        }

        if (!theatre && image) {
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
                    <div className="mb-4">
                        <label className="block text-gray-700">Image</label>
                        <div className="flex flex-row justify-between gap-4">
                            <input
                                className="w-full px-3 py-2 border rounded"
                                type="file"
                                onChange={handleFileInputChange(setImageFile)}
                            />
                            {image && (
                                <>
                                    <img
                                        src={image}
                                        className="h-14 w-14 rounded-full"
                                    />
                                    {deletingImage ? (
                                        <AiOutlineLoading3Quarters className="animate-spin" />
                                    ) : (
                                        <MdDeleteForever
                                            className="cursor-pointer"
                                            onClick={() =>
                                                handleImageFileDelete(
                                                    image,
                                                    setImage,
                                                    setDeletingImage
                                                )
                                            }
                                        />
                                    )}
                                </>
                            )}
                            <button
                                type="button"
                                onClick={() =>
                                    handleImageFileUpload(
                                        image,
                                        setImage,
                                        setImageFile,
                                        setUploadingImage,
                                        imageFile
                                    )
                                }>
                                {uploadingImage ? (
                                    <u className="cursor-not-allowed">
                                        Uploading...
                                    </u>
                                ) : (
                                    <u className="cursor-pointer">Upload</u>
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Address</label>
                        <input
                            className="w-full px-3 py-2 border rounded"
                            type="text"
                            value={address}
                            onChange={handleInputChange(setAddress)}
                        />
                    </div>
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
                    <div className="mb-4">
                        <label className="block text-gray-700">phone</label>
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
