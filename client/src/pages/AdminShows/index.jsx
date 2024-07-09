// src/components/AdminShows.jsx
import React, { useState, useEffect } from "react";
import ShowAdminCard from "../../components/showAdminCard";
import ShowModal from "../../components/showModal";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "sonner";

const AdminShows = () => {
    const [upcomingShows, setUpcomingShows] = useState([]);
    const [pastShows, setPastShows] = useState([]);
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentShow, setCurrentShow] = useState(null);

    const GetAllShows = async () => {
        try {
            const response = await axiosInstance.get(`/shows`);
            const shows = response.data;
            const currentDate = new Date();

            // Separate shows into upcoming and past
            const upcoming = [];
            const past = [];

            shows.forEach((show) => {
                const [hours, minutes] = show.time.split(":");
                const [year, month, day] = show.date.split("T")[0].split("-");

                const showDateTime = new Date(
                    year,
                    month - 1,
                    day,
                    hours,
                    minutes
                );

                if (showDateTime >= currentDate) {
                    upcoming.push(show);
                } else {
                    past.push(show);
                }
            });
            setUpcomingShows(upcoming);
            setPastShows(past);
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

    const handleDeleteClick = async (show) => {
        window.confirm("Are you sure you want to delete the show?");

        try {
            await axiosInstance.delete(
                `/upload/image/${show.poster.split("/").pop()}`
            );
            await axiosInstance.delete(`/shows/${show._id}`);
            toast.success("Show deleted successfully!");
            GetAllShows();
        } catch (error) {
            console.error("Error deleting show:", error);
            toast.error("Error deleting show!");
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
            <h3 className="text-2xl font-bold mb-4">Upcoming Shows</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcomingShows.map((show) => (
                    <ShowAdminCard
                        key={show._id}
                        show={show}
                        onEditClick={handleEditClick}
                        onDeleteClick={handleDeleteClick}
                    />
                ))}
            </div>
            <h3 className="text-2xl font-bold mb-4">Past Shows</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcomingShows.map((show) => (
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
