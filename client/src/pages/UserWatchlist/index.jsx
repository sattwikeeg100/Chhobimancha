import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieAdminCard from "../../components/movieCard";
import { useNavigate } from "react-router-dom";

const APIURL = import.meta.env.VITE_API_URL;

const UserWatchlists = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate("/");

    const GetUserWatchlists = async () => {
        try {
            const response = await axios.get(`${APIURL}/movies/favourites`);
            setMovies(response.data);
            setFilteredMovies(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(!localStorage.getItem("user")){
            navigate("/");
        }
        GetUserWatchlists();
    }, []);


    if (loading) {
        return <div className="text-5xl">Loading...</div>;
    }

    return (
        <div className="justify-center items-center sm:mx-36">
            <h1 className="text-5xl font-bold my-8">My WatchLists</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {movies.map((movie, index) => (
                    <MovieCard key={index} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default UserWatchlists;