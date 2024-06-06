// src/components/AdminCineasts.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import CineastAdminCard from "../../components/cineastAdminCard";
import CineastModal from "../../components/cineastModal.js";

const APIURL = import.meta.env.VITE_API_URL;

const AdminCineasts = () => {
    const [cineasts, setCineasts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentCineast, setCurrentCineast] = useState(null);

    const GetAllCineasts = async () => {
        try {
            const response = await axios.get(`${APIURL}/cineasts`);
            setCineasts(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetAllCineasts();
    }, []);

    const handleAddClick = () => {
        setCurrentCineast(null);
        setModalOpen(true);
    };

    const handleEditClick = (cineast) => {
        setCurrentCineast(cineast);
        setModalOpen(true);
    };

    const handleDeleteClick = async (cineastId) => {
        try {
            await axios.delete(`${APIURL}/cineasts/${cineastId}`);
            GetAllCineasts();
        } catch (error) {
            console.error("Error deleting cineast:", error);
        }
    };

    const handleModalClose = () => {
        setModalOpen(false);
        GetAllCineasts();
    };

    if (loading) {
        return <div className="text-5xl">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
                Admin Cineast Management
            </h1>
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
                onClick={handleAddClick}>
                Add New Cineast
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cineasts.map((cineast) => (
                    <CineastAdminCard
                        key={cineast._id}
                        cineast={cineast}
                        onEditClick={handleEditClick}
                        onDeleteClick={handleDeleteClick}
                    />
                ))}
            </div>
            {modalOpen && (
                <CineastModal
                    cineast={currentCineast}
                    onClose={handleModalClose}
                />
            )}
        </div>
    );
};

export default AdminCineasts;