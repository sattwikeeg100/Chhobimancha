// src/components/TheatreModal.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const APIURL = import.meta.env.VITE_API_URL;

const TheatreModal = ({ theatre, onClose }) => {
    const [name, setName] = useState("");
    const [owner, setOwner] = useState("");
    const [address, setAddress] = useState("");
    const [contact, setContact] = useState("");

    useEffect(() => {
        if (theatre) {
            setName(theatre.name);
            setOwner(theatre.owner);
            setAddress(theatre.address);
            setContact(theatre.contact);
        }
    }, [theatre]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (theatre) {
                await axios.put(`${APIURL}/theatres/${theatre._id}`, {
                    name,
                    owner,
                    address,
                    contact,
                });
            } else {
                await axios.post(`${APIURL}/theatres`, {
                    name,
                    owner,
                    address,
                    contact,
                });
            }
            onClose();
        } catch (error) {
            console.error("Error saving theatre:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-lg w-96">
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
                            onChange={(e) => setName(e.target.value)}
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
                            onChange={(e) => setOwner(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Address</label>
                        <input
                            className="w-full px-3 py-2 border rounded"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Contact</label>
                        <input
                            className="w-full px-3 py-2 border rounded"
                            type="text"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
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

export default TheatreModal;