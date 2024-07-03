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
        <div className="transition-transform duration-300 ease-in-out transform hover:scale-110 max-w-s rounded overflow-hidden shadow-lg relative bg-background2 text-white">
          <div className="relative border-2 border-white ">
            <img
              className="w-full h-80 object-cover "
              src={movie.poster}
              alt={movie.title}
            />
            <button
              onClick={user ? handleAddToFavorites : switchToLogin}
              className="absolute top-2 right-2 bg-background1 text-yellow-500 p-2 rounded-full hover:text-highlight"
            >
              {isFavourite ? <FaHeart color="red" /> : <FaHeart />}
            </button>
          </div>
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => navigate(`/explore/movies/${movie.slug}`)}
          >
            <div className="px-6 py-4 flex flex-col">
                <div className="flex flex-row mb-5">
                    <div className="font-bold text-xl text-primary_text">{movie.title}</div>
                    <div
                    className="flex justify-center items-center absolute right-3 top-100"
                    style={{ width: 25 , height: 25 }}
                    >
                    <CircularProgressbar
                        value={movie.averageRating}
                        className="w-100 h-100 "
                        maxValue={5}
                        text={`${movie.averageRating}`}
                        styles={buildStyles({
                        textSize:"45px",
                        textColor: "white",
                        pathColor: "red",
                        trailColor: "gray",
                        })}
                    />
                    </div>
            </div>
              <p className="text-secondary_text font-semibold">
                {movie.description}
              </p>
            </div>
            
          </div>
        </div>
      );
};

export default MovieCard;
