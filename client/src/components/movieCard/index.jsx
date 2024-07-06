// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import moment from "moment";
// import { useDispatch, useSelector } from "react-redux";
// import { FaStar } from "react-icons/fa6";
// import { BsDot } from "react-icons/bs";
// import "react-circular-progressbar/dist/styles.css";
// import { FaHeart } from "react-icons/fa";
// import { switchLoginModalOpen } from "../../store/slices/loginModalOpenSlice";
// import axiosInstance from "../../config/axiosInstance";
// import { updateUser } from "../../store/slices/userSlice";
// import { toast } from "sonner";

// const MovieCard = ({ movie , className }) => {
//   const navigate = useNavigate();
//   const [isFavourite, setIsFavourite] = useState(false);
//   const user = useSelector((state) => state.user.userInfo);
//   const dispatch = useDispatch();
//   const APIURL = import.meta.env.VITE_API_URL;

//   const fetchUserFavLists = async (user) => {
//     try {
//       const userFavList = user.favoriteMovies;
//       setIsFavourite(userFavList.includes(movie._id));
//     } catch (error) {
//       console.error("Error fetching user favlist:", error);
//     }
//   };

//   useEffect(() => {
//     if (user) {
//       fetchUserFavLists(user);
//     }
//   }, [user]); // Add user to the dependency array

//   const switchToLogin = () => {
//     dispatch(switchLoginModalOpen(true));
//   };

//   const handleAddToFavorites = async () => {
//     try {
//       const response = await axiosInstance.post(`${APIURL}/users/favourites`, {
//         movieId: movie._id,
//       });
//       isFavourite
//         ? toast.warning("Removed from favourites")
//         : toast.success("Successfully added to favorites");
//       dispatch(updateUser());
//     } catch (error) {
//       console.error(error);
//       toast.error(error.message);
//     }
//   };

//   return (
//       <div className={` max-w-sm rounded-md overflow-hidden shadow-lg relative bg-shadow text-white h-150 p-4 ${className} `}>
//           <div className="relative">
//               <img
//                   className="w-80 h-80 object-cover "
//                   src={movie.poster}
//                   alt={movie.title}
//               />
//               <button
//                   onClick={user ? handleAddToFavorites : switchToLogin}
//                   className="absolute top-2 right-2 bg-background1 text-white p-2 rounded-full hover:text-highlight">
//                   {isFavourite ? <FaHeart color="red" /> : <FaHeart />}
//               </button>
//           </div>
//           <div
//               className="flex justify-between cursor-pointer"
//               onClick={() => navigate(`/explore/movies/${movie.slug}`)}>
//               <div className="mx-2 py-4 flex flex-col">
//                   <div className="flex flex-row mb-5">
//                       <div className="font-bold text-xl text-primary_text font-montserrat">
//                           {movie.title}
//                       </div>
//                       <div className="flex justify-center items-center absolute right-7 top-104 font-semibold font-lato text-primary_text">
//                           <FaStar className="text-highlight mr-2 " />
//                           {movie.averageRating}/5
//                       </div>
//                   </div>
//                   <div className="text-primary_text font-semibold font-lato flex flex-row justify-between gap-x-10">
//                       <div className="flex flex-row gap-x-2">
//                           {/* <BsDot className="font-semibold w-5 h-5 mt-1"/> */}
//                           {moment(movie.releaseDate).year()}
//                       </div>

//                       <div className="flex flex-row gap-x-1">
//                           <BsDot className="font-semibold w-5 h-5 mt-1" />
//                           {movie.genres.join(", ")}
//                       </div>

//                       <div className="flex flex-row gap-x-1">
//                           <BsDot className="font-semibold w-5 h-5 mt-1" />
//                           {movie.duration} hr
//                       </div>
//                   </div>
//               </div>
//           </div>
//           <button
//               className="bg-highlight hover:bg-highlight_hover text-white font-bold  font-ubuntu my-4 py-2 px-4 rounded w-full"
//               onClick={() => navigate(`/explore/movies/${movie.slug}`)}>
//               Watch Now
//           </button>
//       </div>
//   );
// };

// export default MovieCard;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { FaStar, FaHeart, FaClock } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import axiosInstance from "../../config/axiosInstance";
import { switchLoginModalOpen } from "../../store/slices/loginModalOpenSlice";
import { updateUser } from "../../store/slices/userSlice";
import { toast } from "sonner";

const MovieCard = ({ movie, className }) => {
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
  }, [user]);

  const switchToLogin = () => {
    dispatch(switchLoginModalOpen(true));
  };

  const handleAddToFavorites = async () => {
    try {
      const response = await axiosInstance.post(`${APIURL}/users/favourites`, {
        movieId: movie._id,
      });
      isFavourite
        ? toast.warning("Removed from favorites")
        : toast.success("Successfully added to favorites");
      dispatch(updateUser());
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className={`max-w-sm rounded-md overflow-hidden shadow-lg relative bg-shadow text-white p-4 ${className}`}>
      <div className="relative">
        <img
          className="w-full h-36 md:h-80 object-cover"
          src={movie.poster}
          alt={movie.title}
        />
        <button
          onClick={user ? handleAddToFavorites : switchToLogin}
          className="absolute top-2 right-2 bg-background1 text-white p-2 rounded-full hover:text-highlight"
        >
          {isFavourite ? <FaHeart color="red" /> : <FaHeart />}
        </button>
      </div>
      <div
        className="flex justify-between cursor-pointer"
        onClick={() => navigate(`/explore/movies/${movie.slug}`)}
      >
        <div className="mx-2 py-4 flex flex-col flex-grow tracking-wide md:tracking-widest text-sm flex-wrap md:flex-nowrap">
          <div className="flex flex-col md:flex-row mb-2 md:order-1">
            <div className="font-semibold md:font-bold text-sm md:text-lg text-primary_text font-montserrat md:mr-2">
              {movie.title}
            </div>
            <div className="flex justify-center items-center md:ml-auto font-semibold font-lato text-primary_text">
              <FaStar className="text-highlight mr-1" />
              {movie.averageRating}/5
            </div>
          </div>
          <div className="text-primary_text font-semibold font-lato flex flex-col md:flex-row justify-between items-center mb-2 md:order-3">
            <div className="flex flex-row items-center gap-x-1">
              <FaClock />
              {movie.duration} hr
            </div>
            <div className="flex flex-row items-center gap-x-1 md:ml-4 text-primary_text font-semibold font-lato">
              <BsDot className="font-semibold w-3 h-3" />
              {moment(movie.releaseDate).year()}
            </div>
          </div>
          <div className="text-primary_text font-semibold font-lato flex flex-col md:flex-row justify-between items-center mb-2 md:order-4">
            <div className="flex flex-row items-center gap-x-1">
              <BsDot className="font-semibold w-3 h-3" />
              {movie.genres.join(", ")}
            </div>
          </div>
        </div>
      </div>
      <button
        className="bg-highlight hover:bg-highlight_hover text-white font-bold font-ubuntu my-2 py-2 px-3 rounded w-full"
        onClick={() => navigate(`/explore/movies/${movie.slug}`)}
      >
        Watch Now
      </button>
    </div>
  );
};

export default MovieCard;
