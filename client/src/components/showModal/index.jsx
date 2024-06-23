// src/components/ShowModal.jsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "sonner";

const APIURL = import.meta.env.VITE_API_URL;

const ShowModal = ({ show, onClose }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [poster, setPoster] = useState(null);
    const [language, setLanguage] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [ticketPrice, setTicketPrice] = useState("");
    const [totalSeats, setTotalSeats] = useState("");
    const [posterFile, setPosterFile] = useState(null);
    const [theatres, setTheatres] = useState([]);
    const [selectedTheatre, setSelectedTheatre] = useState("");

    useEffect(() => {
        if (show) {
            setTitle(show.title);
            setDescription(show.description);
            setLanguage(show.language);
            setDate(show.date);
            setTime(show.time);
            setTicketPrice(show.ticketPrice);
            setTotalSeats(show.totalSeats);
            setSelectedTheatre(show.theatre || "");
        }
        fetchTheatres();
    }, [show]);

    const fetchTheatres = async () => {
        try {
            const response = await axiosInstance.get(`${APIURL}/theatres`);
            setTheatres(response.data);
        } catch (error) {
            console.error("Error fetching theatres:", error);
        }
    };

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleFileInputChange = (setter) => (e) => {
        setter(e.target.files[0]);
    };

    const handleImageFileUpload = async (urlSetter, fileSetter, file) => {
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            try {
                const response = await axiosInstance.post(
                    `${APIURL}/upload/image`,
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );
                urlSetter(response.data.url);
                fileSetter(null);
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        } else {
            return;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const showData = {
                title,
                description,
                poster,
                language,
                date,
                time,
                ticketPrice,
                totalSeats,
                theatre: selectedTheatre,
            };

            if (show) {
                await axiosInstance.put(
                    `${APIURL}/shows/${show._id}`,
                    showData
                );
                toast.success("Show updated successfully!");
            } else {
                await axiosInstance.post(`${APIURL}/shows`, showData);
                toast.success("Show added successfully!");
            }
            onClose();
        } catch (error) {
            console.error("Error saving show:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-lg w-[60%] h-[95%] max-h-screen overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">
                    {show ? "Edit Show" : "Add New Show"}
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* Title */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Title</label>
                        <input
                            className="w-full px-3 py-2 border rounded"
                            type="text"
                            value={title}
                            onChange={handleInputChange(setTitle)}
                        />
                    </div>
                    {/* Description */}
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Description
                        </label>
                        <textarea
                            className="w-full px-3 py-2 border rounded"
                            value={description}
                            onChange={handleInputChange(setDescription)}
                        />
                    </div>
                    {/* Poster */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Poster</label>
                        <div className="flex flex-row gap-3">
                            <input
                                className="w-full px-3 py-2 border rounded"
                                type="file"
                                onChange={handleFileInputChange(setPosterFile)}
                            />
                            {poster && (
                                <img
                                    src={poster}
                                    className="w-14 h-14 rounded-full"
                                />
                            )}
                            <button
                                type="button"
                                onClick={() =>
                                    handleImageFileUpload(
                                        setPoster,
                                        setPosterFile,
                                        posterFile
                                    )
                                }>
                                <u>Upload</u>
                            </button>
                        </div>
                    </div>
                    {/* Language */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Language</label>
                        <input
                            className="w-full px-3 py-2 border rounded"
                            type="text"
                            value={language}
                            onChange={handleInputChange(setLanguage)}
                        />
                    </div>
                    {/* Date */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Date</label>
                        <input
                            className="w-full px-3 py-2 border rounded"
                            type="date"
                            value={date}
                            onChange={handleInputChange(setDate)}
                        />
                    </div>
                    {/* Time */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Time</label>
                        <input
                            className="w-full px-3 py-2 border rounded"
                            type="time"
                            value={time}
                            onChange={handleInputChange(setTime)}
                        />
                    </div>
                    {/* Ticket Price */}
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Ticket Price
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded"
                            type="number"
                            value={ticketPrice}
                            onChange={handleInputChange(setTicketPrice)}
                        />
                    </div>
                    {/* Total Seats */}
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Total Seats
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded"
                            type="number"
                            value={totalSeats}
                            onChange={handleInputChange(setTotalSeats)}
                        />
                    </div>
                    {/* Theatre */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Theatre</label>
                        <select
                            className="w-full px-3 py-2 border rounded"
                            value={selectedTheatre}
                            onChange={handleInputChange(setSelectedTheatre)}>
                            <option value="">Select a theatre</option>
                            {theatres.map((theatre) => (
                                <option key={theatre._id} value={theatre._id}>
                                    {theatre.name}
                                </option>
                            ))}
                        </select>
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

export default ShowModal;