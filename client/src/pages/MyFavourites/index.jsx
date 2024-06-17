import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import MovieCard from "../../components/movieCard";

const MyFavourites = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const APIURL = import.meta.env.VITE_API_URL;

    const GetAllFavouriteMovies = async () => {
        try {
            const response = await axiosInstance.get("/users/favourites");
            setMovies(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetAllFavouriteMovies();
    }, []);

    if (loading) {
        return <div className="text-5xl">Loading...</div>;
    }

    const handleAddToFavorites = async (movieId) => {
        try {
            const response = await axiosInstance.post(`/users/favourites`, {
                movieId: movieId,
            });
            alert("Successfully added to favorites");
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <div className="justify-center items-center sm:mx-36">
            <h1 className="text-5xl font-bold my-8">My Favourite Movies</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {movies.map((movie, index) => (
                    <MovieCard
                        key={index}
                        movie={movie}
                        onAddToFavorites={() => handleAddToFavorites(movie._id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default MyFavourites;
