import React, { useState, useEffect } from "react";
import MovieAdminCard from "../../components/movieAdminCard";
import MovieModal from "../../components/movieModal";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "sonner";
import Preloader from "../../components/PreLoader/PreLoader";
import { FaSearch } from "react-icons/fa";

const AdminMovies = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const GetAllMovies = async () => {
    try {
      const response = await axiosInstance.get(`/movies`);
      setMovies(response.data);
      setFilteredMovies(response.data);
      setLoading(true);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setIsInitialLoad(false);
    }
    // finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    GetAllMovies();
  }, []);

  useEffect(() => {
    searchMovies();
  }, [searchQuery, movies]);

  const searchMovies = () => {
    let tempMovies = [...movies];

    if (searchQuery) {
      tempMovies = tempMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredMovies(tempMovies);
  };

  const handleAddClick = () => {
    setCurrentMovie(null);
    setModalOpen(true);
  };

  const handleEditClick = (movie) => {
    setCurrentMovie(movie);
    setModalOpen(true);
  };

  const handleDeleteClick = async (movie) => {
    if (window.confirm("Are you sure you want to delete the movie?")) {
      try {
        await axiosInstance.delete(
          `/upload/image/${movie.coverImage.split("/").pop()}`
        );
        await axiosInstance.delete(
          `/upload/image/${movie.poster.split("/").pop()}`
        );
        if (movie.video) {
          await axiosInstance.delete(
            `/upload/video/${movie.video.split("/").pop()}`
          );
        }
        await axiosInstance.delete(`/movies/${movie._id}`);
        toast.success("Movie deleted successfully!");
        GetAllMovies();
      } catch (error) {
        console.error("Error deleting movie:", error);
        toast.error("Error deleting movie!");
      }
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    GetAllMovies();
  };

  if (loading) {
    return <Preloader setLoading={setLoading} />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl sm:text-5xl font-bold text-primary_text py-4 font-montserrat">
        Admin Movie Management
      </h1>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-y-3 mb-4">
        <button
          className="bg-highlight hover:bg-highlight_hover text-primary_text font-bold sm:text-xl py-2 px-4 rounded"
          onClick={handleAddClick}
        >
          Add New Movie
        </button>

        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search for movies..."
            className="text-primary_text bg-shadow rounded-lg focus:outline-none focus:border focus:border-highlight py-2 text-xs sm:text-base pl-10 sm:pl-10 mx-1 sm:px-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute left-3 text-primary_text w-4 h-4" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMovies.map((movie) => (
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
