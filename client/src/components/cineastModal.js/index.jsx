// src/components/CineastModal.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const APIURL = import.meta.env.VITE_API_URL;

const CineastModal = ({ cineast, onClose }) => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [details, setDetails] = useState("");

    useEffect(() => {
        if (cineast) {
            setName(cineast.name);
            setImage(cineast.image);
            setDetails(cineast.details);
        }
    }, [cineast]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (cineast) {
                await axios.put(`${APIURL}/cineasts/${cineast._id}`, {
                    name,
                    image,
                    details,
                });
            } else {
                await axios.post(`${APIURL}/cineasts`, {
                    name,
                    image,
                    details,
                });
            }
            onClose();
        } catch (error) {
            console.error("Error saving cineast:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">
                    {cineast ? "Edit Cineast" : "Add New Cineast"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            className="w-full px-3 py-2 border rounded"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Image URL</label>
                        <input
                            className="w-full px-3 py-2 border rounded"
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Details</label>
                        <textarea
                            className="w-full px-3 py-2 border rounded"
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                        />
                    </div>
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

export default CineastModal;