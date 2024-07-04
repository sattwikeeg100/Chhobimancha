import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import MovieCard from "../../components/movieCard";

const MyFavourites = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div className="justify-center items-center px-10 py-5 bg-background1">
            <h1 className="text-5xl font-semibold py-8 text-primary_text">My Favourite Movies</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10 bg-background1">
                {movies.map((movie, index) => (
                    <MovieCard
                        key={index}
                        movie={movie}
                    />
                ))}
            </div>
        </div>
    );
};

export default MyFavourites;
