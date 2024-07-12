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

  if (loading)
    return (
      <p className="text-center pt-5 bg-background1  text-primary_text min-h-screen">
        Loading...
      </p>
    );

  return (
    <div className="justify-center items-center px-12 bg-background1 min-h-screen">
      <h1 className="text-5xl font-semibold py-8 text-primary_text">
        My Favourite Movies
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10 bg-background1">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MyFavourites;
