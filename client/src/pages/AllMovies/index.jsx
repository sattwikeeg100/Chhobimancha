import React, { useEffect, useState } from "react";
import MovieCard from "../../components/movieCard/index.jsx";
import axiosInstance from "../../config/axiosInstance";
import { FaSearch } from "react-icons/fa";
import { MdArrowDownward } from "react-icons/md";
import { toast } from "sonner";
import GoToTop from "../../components/goToTopButton/index.jsx";
import SkeletonAllMovies from "../../components/Skeletons/skeletonAllMovies/index.jsx";

const INITIAL_LOAD_COUNT = 8;
const LOAD_MORE_COUNT = 8;

const genreOptions = [
  { value: "Drama", label: "Drama" },
  { value: "Thriller", label: "Thriller" },
  { value: "Romance", label: "Romance" },
  { value: "Comedy", label: "Comedy" },
  { value: "Action", label: "Action" },
  { value: "Crime", label: "Crime" },
  { value: "Horror", label: "Horror" },
  { value: "History", label: "History" },
  { value: "Documentary", label: "Documentary" },
  { value: "Science-Fiction", label: "Science Fiction" },
  { value: "Other", label: "Other" },
];

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [localLoading, setLocalLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [isZoomed, setIsZoomed] = useState(false);
  const [visibleMovies, setVisibleMovies] = useState(INITIAL_LOAD_COUNT);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const GetAllMovies = async () => {
    try {
      const response = await axiosInstance.get("/movies");
      setTimeout(() => {
        setMovies(response.data);
        setFilteredMovies(response.data.slice(0, INITIAL_LOAD_COUNT));
        setLocalLoading(false);
      }, 700);
    } catch (error) {
      console.error(error);
      setLocalLoading(false);
    }
  };

  useEffect(() => {
    GetAllMovies();
  }, []);

  useEffect(() => {
    filterAndSortMovies();
  }, [selectedGenre, sortOption, sortOrder, searchQuery, visibleMovies]);

  const filterAndSortMovies = () => {
    let tempMovies = [...movies];

    if (selectedGenre) {
      tempMovies = tempMovies.filter((movie) =>
        movie.genres.includes(selectedGenre)
      );
    }

    if (searchQuery) {
      tempMovies = tempMovies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortOption) {
      case "rating":
        tempMovies.sort((a, b) =>
          sortOrder === "asc"
            ? a.averageRating - b.averageRating
            : b.averageRating - a.averageRating
        );
        break;
      case "popularity":
        tempMovies.sort((a, b) =>
          sortOrder === "asc"
            ? a.numberOfReviews - b.numberOfReviews
            : b.numberOfReviews - a.numberOfReviews
        );
        break;
      case "releaseDate":
        tempMovies.sort((a, b) =>
          sortOrder === "asc"
            ? new Date(a.year) - new Date(b.year)
            : new Date(b.year) - new Date(a.year)
        );
        break;
      default:
        break;
    }

    setFilteredMovies(tempMovies);
  };

  const handleAddToFavorites = async (movieId) => {
    try {
      const response = await axiosInstance.post(`/users/favourites`, {
        movieId: movieId,
      });
      toast.success("Successfully added to favorites");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleLoadMore = () => {
    setVisibleMovies((prevVisibleMovies) =>
      Math.min(prevVisibleMovies + LOAD_MORE_COUNT, filteredMovies.length)
    );
  };

  if (localLoading) {
    return <SkeletonAllMovies />;
  }

  return (
    <div className="justify-center items-center px-10 bg-background1 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-5xl font-bold text-white py-4 font-montserrat">
          Movies
        </h1>
        <div className="flex items-center justify-center gap-x-4">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search for movies..."
              className="text-primary_text bg-shadow rounded-lg focus:outline-none focus:border focus:border-highlight py-2 text-xs sm:text-base pl-10 sm:pl-10 mx-1 sm:px-4 "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-3 text-primary_text w-4 h-4" />
          </div>
        </div>
      </div>
      <div className="flex md:flex-row mb-10 gap-4 flex-col ">
        <div>
          <label
            htmlFor="genre"
            className="mr-2 text-primary_text font-semibold font-roboto"
          >
            Genre :
          </label>
          <select
            className="text-primary_text bg-background2 p-1 rounded-md mr-4 font-ubuntu"
            id="genre"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">All</option>
            {genreOptions.map((genreOption, key) => (
              <option key={key} value={genreOption.value}>
                {genreOption.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="sort"
            className="md:ml-4 mr-2 text-primary_text font-semibold font-roboto"
          >
            Sort By:
          </label>
          <select
            className="text-primary_text bg-background2 p-1 rounded-md mr-4 font-ubuntu"
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">None</option>
            <option value="rating">Rating</option>
            <option value="popularity">Popularity</option>
            <option value="releaseDate">Release Date</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="order"
            className="md:ml-4 md:mr-2 mr-4 text-primary_text font-semibold font-roboto"
          >
            Order:
          </label>
          <select
            className="text-primary_text bg-background2 md:p-1 px-3 py-1 rounded-md mr-4 font-ubuntu"
            id="order"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      {filteredMovies.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10 bg-background1">
            {filteredMovies.slice(0, visibleMovies).map((movie, index) => (
              <MovieCard
                key={index}
                movie={movie}
                onAddToFavorites={() => handleAddToFavorites(movie._id)}
              />
            ))}
          </div>
          {filteredMovies.length > visibleMovies && (
            <div className="flex justify-center mt-8 flex-row">
              <button
                onClick={handleLoadMore}
                className="bg-highlight hover:bg-highlight_hover text-white font-bold py-2 px-4 rounded-md flex flex-row"
              >
                Load More
                <MdArrowDownward className="w-6 h-6 text-white ml-1 font-semibold" />
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="mt-40 pt-10 text-white text-center my-4 justify-center items-center">
          Sorry, we don't have movies matching your criteria right now.
        </p>
      )}
      <GoToTop />
    </div>
  );
};

export default AllMovies;
