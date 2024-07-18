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
    }
    // finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    const fetchData = async () => {
      await GetAllMovies();
      setTimeout(() => {
        setIsInitialLoad(false); // Set isInitialLoad to false after a minimum duration
      }, 1000); // Adjust the timeout duration as needed (e.g., 1000ms = 1 second)
    };

    fetchData();
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

  if (loading && isInitialLoad) {
    return <Preloader setLoading={setLoading} />;
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-4xl font-semibold text-primary_text py-4 tracking-tighter font-playfair">
        Admin Movie Management
      </h1>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-y-3 mb-4">
        <button
          className="bg-highlight hover:bg-highlight_hover text-primary_text font-medium font-ubuntu sm:text-base py-1 px-3 rounded"
          onClick={handleAddClick}
        >
          Add New Movie
        </button>

        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search for movies..."
            className="text-primary_text bg-shadow rounded-lg focus:outline-none focus:border focus:border-highlight py-1 text-xs sm:text-base pl-10 sm:pl-10 mx-1 sm:px-4"
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
