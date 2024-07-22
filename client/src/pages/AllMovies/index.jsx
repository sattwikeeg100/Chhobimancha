import React, { useEffect, useState } from "react";
import MovieCard from "../../components/movieCard/index.jsx";
import axiosInstance from "../../config/axiosInstance";
import { FaSearch } from "react-icons/fa";
import { MdArrowDownward } from "react-icons/md";
import { toast } from "sonner";
import GoToTop from "../../components/goToTopButton/index.jsx";
import SkeletonAllMovies from "../../components/Skeletons/skeletonAllMovies/index.jsx";
import Select from "react-select";

const INITIAL_LOAD_COUNT = 8;
const LOAD_MORE_COUNT = 8;

const genreOptions = [
  { value: "", label: "All" },
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

const sortOptions = [
  { value: "", label: "None" },
  { value: "rating", label: "Rating" },
  { value: "popularity", label: "Popularity" },
  { value: "releaseDate", label: "Release Date" },
];

const orderOptions = [
  { value: "asc", label: "Ascending" },
  { value: "desc", label: "Descending" },
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
  const [totalMovies, setTotalMovies] = useState("");
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
  }, [
    selectedGenre,
    sortOption,
    sortOrder,
    searchQuery,
    visibleMovies,
    totalMovies,
  ]);

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
    setTotalMovies(tempMovies);
    setFilteredMovies(tempMovies.slice(0, visibleMovies));
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
      Math.min(prevVisibleMovies + LOAD_MORE_COUNT, totalMovies.length)
    );
  };

  if (localLoading) {
    return <SkeletonAllMovies />;
  }

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      padding: "0px 6px",
      borderRadius: "0.375rem",
      borderColor: state.isFocused ? "#e1251a" : "#d1d5db",
      backgroundColor: "#232222",
      color: "#ffffff",
      fontSize: "18px",
      boxShadow: state.isFocused ? "0 0 0 1px #e1251a" : null,
      "&:hover": {
        borderColor: "#e1251a",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#232222",
      color: "#ffffff",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#e1251a",
      color: "#ffffff",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#ffffff",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#ffffff",
      ":hover": {
        backgroundColor: "#e1251a",
        color: "#000000",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#e1251a"
        : state.isFocused
        ? "#374151"
        : "#232222",
      color: "#ffffff",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#ffffff",
    }),
  };

  return (
    <div className=" pb-7 px-5 sm:px-10 bg-background1 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-y-3 pb-5 sm:pb-7">
        <h1 className="text-4xl font-semibold text-primary_text pb-4 sm:pt-4 tracking-tighter font-playfair">
          Movies
        </h1>
        {/* <div className="flex items-center justify-center gap-x-4"> */}
        <div className="relative w-full sm:w-fit flex items-center">
          <input
            type="text"
            placeholder="Search for movies..."
            className="w-full text-primary_text bg-shadow rounded-lg focus:outline-none focus:border focus:border-highlight 
            
            text-base sm:text-base 
            pl-10 sm:pl-10  
            py-2
            sm:px-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute left-3 sm:left-4 text-gray-400" />
        </div>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-4">
        <div className="flex items-center flex-row gap-x-2">
          <label className="sm:text-2xl text-xl text-primary_text font-ubuntu">
            Genre:
          </label>
          <Select
            options={genreOptions}
            styles={customStyles}
            placeholder="Filter by Genre"
            value={genreOptions.find(
              (option) => option.value === selectedGenre
            )}
            onChange={(option) => setSelectedGenre(option.value)}
          />
        </div>

        <div className="flex items-center flex-row gap-x-2">
          <label className="sm:text-2xl text-xl text-primary_text font-ubuntu ">
            Sort By:
          </label>
          <Select
            options={sortOptions}
            styles={customStyles}
            placeholder="Sort By"
            className="text-white"
            value={sortOptions.find((option) => option.value === sortOption)}
            onChange={(option) => setSortOption(option.value)}
          />
        </div>

        {/* <div className="flex items-center flex-row gap-x-2">
          <label className="sm:text-base text-xl font-lato text-primary_text  ">
            Order:
          </label>
          <Select
            options={orderOptions}
            styles={customStyles}
            placeholder="Order"
            value={orderOptions.find((option) => option.value === sortOrder)}
            onChange={(option) => setSortOrder(option.value)}
          />
        </div> */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-5">
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            toggleZoom={toggleZoom}
            isZoomed={isZoomed}
            handleAddToFavorites={handleAddToFavorites}
          />
        ))}
      </div>

      {filteredMovies.length < totalMovies.length && (
        <div className="flex justify-center py-8">
          <button
            onClick={handleLoadMore}
            className="text-white bg-highlight hover:bg-opacity-80 py-2 px-4 rounded-lg flex items-center"
          >
            Load More <MdArrowDownward className="ml-2" />
          </button>
        </div>
      )}

      <GoToTop />
    </div>
  );
};

export default AllMovies;
