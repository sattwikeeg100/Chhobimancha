import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaHeart } from "react-icons/fa";
import { switchLoginModalOpen } from "../../store/slices/loginModalOpenSlice";
import axiosInstance from "../../config/axiosInstance";
import { updateUser } from "../../store/slices/userSlice";
import { toast } from "sonner";

const MovieCard = ({ movie }) => {
    const navigate = useNavigate();
    const [isFavourite, setIsFavourite] = useState(false);
    const user = useSelector((state) => state.user.userInfo);
    const dispatch = useDispatch();
    const APIURL = import.meta.env.VITE_API_URL;

    const fetchUserFavLists = async (user) => {
        try {
            const userFavList = user.favoriteMovies;
            setIsFavourite(userFavList.includes(movie._id));
        } catch (error) {
            console.error("Error fetching user favlist:", error);
        }
    };

    useEffect(() => {
        if (user) {
            fetchUserFavLists(user);
        }
    }, [user]); // Add user to the dependency array

    const switchToLogin = () => {
        dispatch(switchLoginModalOpen(true));
    };

    const handleAddToFavorites = async () => {
        try {
            const response = await axiosInstance.post(
                `${APIURL}/users/favourites`,
                { movieId: movie._id }
            );
            isFavourite
                ? toast.warning("Removed from favourites")
                : toast.success("Successfully added to favorites");
            dispatch(updateUser());
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    return (
        <div className="max-w-xs rounded overflow-hidden shadow-lg relative bg-gray-800 text-white">
            <div className="relative">
                <img
                    className="w-full h-96 object-cover"
                    src={movie.poster}
                    alt={movie.title}
                />
                <button
                    onClick={user ? handleAddToFavorites : switchToLogin}
                    className="absolute top-2 right-2 bg-yellow-400 text-gray-900 p-2 rounded-full hover:bg-yellow-500">
                    {isFavourite ? <FaHeart color="red" /> : <FaHeart />}
                </button>
            </div>
            <div
                className="flex justify-between cursor-pointer"
                onClick={() => navigate(`/explore/movies/${movie.slug}`)}>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{movie.title}</div>
                    <p className="text-gray-400 text-base">
                        {movie.description}
                    </p>
                </div>
                <div
                    className="flex justify-center items-center m-4"
                    style={{ width: 50, height: 50 }}>
                    <CircularProgressbar
                        value={movie.averageRating}
                        maxValue={5}
                        text={`${movie.averageRating}`}
                        styles={buildStyles({
                            textColor: "white",
                            pathColor: "yellow",
                            trailColor: "gray",
                        })}
                    />
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
