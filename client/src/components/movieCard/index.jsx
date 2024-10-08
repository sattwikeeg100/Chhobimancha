import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa6";
import { BsDot } from "react-icons/bs";
import { FaCrown } from "react-icons/fa";
import { BiSolidCrown } from "react-icons/bi";
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
      const response = await axiosInstance.post(`/users/favourites`, {
        movieId: movie._id,
      });
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
    <div className=" max-w-sm rounded-md overflow-hidden shadow-lg  bg-shadow text-primary_text h-150 p-4">
      <div className="relative">
        <img
          className="w-auto h-auto rounded-lg object-cover "
          src={movie.poster}
          alt={movie.title}
        />
        <button
          onClick={user ? handleAddToFavorites : switchToLogin}
          className="absolute top-2 right-2 bg-background1 text-primary_text p-2 rounded-full hover:text-highlight"
        >
          {isFavourite ? <FaHeart color="red" /> : <FaHeart />}
        </button>

        {movie.isPremium && (
          <div className="absolute top-2 left-2 bg-background1 p-[6px] rounded-full">
            <FaCrown className="text-yellow-300 w-4 h-4" />
          </div>
        )}
      </div>

      <div
        className="flex flex-col cursor-pointer gap-y-2"
        onClick={() => navigate(`/explore/movies/${movie.slug}`)}
      >
        <div className="flex flex-wrap items-center w-full justify-between pt-5 ">
          <div className="font-bold text-xl text-primary_text font-montserrat">
            {movie.title}
          </div>
          <div className="flex justify-center items-center font-semibold font-lato text-primary_text">
            <FaStar className="text-highlight mr-2 " />
            {movie.averageRating.toFixed(1)}/5
          </div>
        </div>
        <div className="flex flex-wrap w-full items-center justify-between self-stretch  gap-y-2  pb-5">
          <div className="flex items-center justify-center gap-x-0 text-sm md:text-base font-semibold">
            <BsDot className="font-semibold w-5 h-5 mt-1" />
            {moment(movie.releaseDate).year()}
          </div>

          <div className="flex items-center justify-center gap-x-1 text-sm md:text-base font-semibold">
            <BsDot className="font-semibold w-5 h-5 mt-1" />
            {movie.genres.join(", ")}
          </div>

          <div className="flex items-center justify-center gap-x-1 text-sm md:text-base font-semibold">
            <BsDot className="font-semibold w-5 h-5 mt-1" />
            {movie.duration} hr
          </div>
        </div>
      </div>
      <button
        className="bg-highlight hover:bg-highlight_hover text-primary_text font-bold  font-ubuntu my-0 py-2 px-4 rounded w-full"
        onClick={() => navigate(`/explore/movies/${movie.slug}`)}
      >
        Watch Now
      </button>
    </div>
  );
};

export default MovieCard;
