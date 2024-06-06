// src/components/AdminShows.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import ShowAdminCard from "../../components/showAdminCard";
import ShowModal from "../../components/showModal";

const APIURL = import.meta.env.VITE_API_URL;

const AdminShows = () => {
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentShow, setCurrentShow] = useState(null);

    const GetAllShows = async () => {
        try {
            const response = await axios.get(`${APIURL}/shows`);
            setShows(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetAllShows();
    }, []);

    const handleAddClick = () => {
        setCurrentShow(null);
        setModalOpen(true);
    };

    const handleEditClick = (show) => {
        setCurrentShow(show);
        setModalOpen(true);
    };

    const handleDeleteClick = async (showId) => {
        try {
            await axios.delete(`${APIURL}/shows/${showId}`);
            GetAllShows();
        } catch (error) {
            console.error("Error deleting show:", error);
        }
    };

    const handleModalClose = () => {
        setModalOpen(false);
        GetAllShows();
    };

    if (loading) {
        return <div className="text-5xl">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Show Management</h1>
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
                onClick={handleAddClick}>
                Add New Show
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {shows.map((show) => (
                    <ShowAdminCard
                        key={show._id}
                        show={show}
                        onEditClick={handleEditClick}
                        onDeleteClick={handleDeleteClick}
                    />
                ))}
            </div>
            {modalOpen && (
                <ShowModal show={currentShow} onClose={handleModalClose} />
            )}
        </div>
    );
};

export default AdminShows;