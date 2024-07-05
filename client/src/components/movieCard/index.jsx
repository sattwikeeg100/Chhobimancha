import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa6";
import { BsDot } from "react-icons/bs";
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
        <div className="transition-transform duration-300 ease-in-out transform hover:scale-110 max-w-s rounded overflow-hidden shadow-lg relative bg-background2 text-white h-150 p-4">
          <div className="relative">
            <img
              className="w-80 h-80 object-cover "
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
                    className="flex justify-center items-center absolute right-3 top-100 font-semibold text-primary_text"
                    >
                    <FaStar className="text-highlight mr-2 "/>
                    {movie.averageRating}/5
                    </div>
            </div>
              <p className="text-primary_text font-semibold flex flex-row">
              {moment(movie.releaseDate).year()}
                
                <BsDot className="font-semibold w-5 h-5 mt-1"/>
                {movie.genres.join(", ")}
              </p>
            </div>

            
            
          </div>
          <button className="bg-highlight hover:bg-highlight_hover text-white font-bold my-4 py-2 px-4 rounded w-full"
          onClick={() => navigate(`/explore/movies/${movie.slug}`)}>
              Watch Now
            </button>
        </div>
      );
};

export default MovieCard;
