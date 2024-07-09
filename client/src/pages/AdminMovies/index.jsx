// src/components/AdminMovies.jsx
import React, { useState, useEffect } from "react";
import MovieAdminCard from "../../components/movieAdminCard";
import MovieModal from "../../components/movieModal";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "sonner";

const AdminMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentMovie, setCurrentMovie] = useState(null);

    const GetAllMovies = async () => {
        try {
            const response = await axiosInstance.get(`/movies`);
            setMovies(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetAllMovies();
    }, []);

    const handleAddClick = () => {
        setCurrentMovie(null);
        setModalOpen(true);
    };

    const handleEditClick = (movie) => {
        setCurrentMovie(movie);
        setModalOpen(true);
    };

    const handleDeleteClick = async (movie) => {
        window.confirm("Are you sure you want to delete the movie?");

        try {
            await axiosInstance.delete(
                `/upload/image/${movie.coverImage.split("/").pop()}`
            );
            await axiosInstance.delete(
                `/upload/image/${movie.poster.split("/").pop()}`
            );
            if (movie.video) {
                await axiosInstance.delete(
                    `/upload/video/${movie.video.split("/").pop()}`
                );
            }
            await axiosInstance.delete(`/movies/${movie._id}`);
            toast.success("Movie deleted successfully!");
            GetAllMovies();
        } catch (error) {
            console.error("Error deleting movie:", error);
            toast.error("Error deleting movie!");
        }
    };

    const handleModalClose = () => {
        setModalOpen(false);
        GetAllMovies();
    };

    if (loading) {
        return <div className="text-5xl">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Movie Management</h1>
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
                onClick={handleAddClick}>
                Add New Movie
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {movies.map((movie) => (
                    <MovieAdminCard
                        key={movie._id}
                        movie={movie}
                        onEditClick={handleEditClick}
                        onDeleteClick={handleDeleteClick}
                    />
                ))}
            </div>
            {modalOpen && (
                <MovieModal movie={currentMovie} onClose={handleModalClose} />
            )}
        </div>
    );
};

export default AdminMovies;
