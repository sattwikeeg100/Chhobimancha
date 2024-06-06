// src/components/AdminMovies.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieAdminCard from "../../components/movieAdminCard";
import MovieModal from "../../components/movieModal";

const APIURL = import.meta.env.VITE_API_URL;

const AdminMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentMovie, setCurrentMovie] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const GetAllMovies = async () => {
        try {
            const response = await axios.get(`${APIURL}/movies`);
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

    const handleDeleteClick = async (movieId) => {
        try {
            await axios.delete(`${APIURL}/movies/${movieId}`, {
                headers: `Authorization: Bearer ${user.token}`,
            });
            GetAllMovies();
        } catch (error) {
            console.error("Error deleting movie:", error);
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
