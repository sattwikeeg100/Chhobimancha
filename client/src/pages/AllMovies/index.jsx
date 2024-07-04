import React, { useEffect, useState } from "react";
import MovieCard from "../../components/movieCard/index.jsx";
import axiosInstance from "../../config/axiosInstance";
import { FaSearch } from "react-icons/fa";
import { MdArrowDownward } from "react-icons/md";
import { toast } from "sonner";
import GoToTop from "../../components/goToTopButton/index.jsx"; // Import the GoToTop component

const APIURL = import.meta.env.VITE_API_URL;
const INITIAL_LOAD_COUNT = 4;
const LOAD_MORE_COUNT = 8;

const AllMovies = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [loading, setLoading] = useState(true);
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
            setMovies(response.data);
            setFilteredMovies(response.data.slice(0, INITIAL_LOAD_COUNT));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
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
            tempMovies = tempMovies.filter(
                (movie) => movie.category === selectedGenre
            );
        }

        if (searchQuery) {
            tempMovies = tempMovies.filter(
                (movie) => movie.title.toLowerCase().includes(searchQuery.toLowerCase())
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

        setFilteredMovies(tempMovies.slice(0, visibleMovies));
    };

    const handleAddToFavorites = async (movieId) => {
        try {
            const response = await axiosInstance.post(
                `${APIURL}/users/favourites`,
                { movieId: movieId }
            );
            toast.success("Successfully added to favorites");
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const handleLoadMore = () => {
        setVisibleMovies(prevVisibleMovies => Math.min(prevVisibleMovies + LOAD_MORE_COUNT, movies.length));
    };

    if (loading) {
        return <div className="text-5xl">Loading...</div>;
    }

    return (
        <div className="justify-center items-center px-10 py-5 bg-background1">
            <h1 className="text-5xl font-semibold py-8 text-primary_text">Movies</h1>
            <div className="absolute right-20 top-32 flex flex-row ">
                    <FaSearch className="text-primary_text mr-3 mt-2 w-6 h-6"/>
                    <input
                        type="text"
                        placeholder="Search for movies....."
                        className="text-primary_text bg-background2 px-4 py-2 rounded"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

            <div className="flex justify-between items-center mb-10">
                <div>
                    <label htmlFor="genre" className="mr-2 text-primary_text">
                        Genre:
                    </label>
                    <select
                        className="text-primary_text bg-background2 "
                        id="genre"
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}>
                        <option value="">All</option>
                        <option value="Action">Action</option>
                        <option value="Romance">Romance</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Horror">Horror</option>
                        {/* Add more genres as needed */}
                    </select>

                    <label htmlFor="sort" className="ml-4 mr-2 text-primary_text">
                        Sort By:
                    </label>
                    <select
                        className="text-primary_text bg-background2"
                        id="sort"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}>
                        <option value="">None</option>
                        <option value="rating">Rating</option>
                        <option value="popularity">Popularity</option>
                        <option value="releaseDate">Release Date</option>
                    </select>

                    <label htmlFor="order" className="ml-4 mr-2 text-primary_text">
                        Order:
                    </label>
                    <select
                        className="text-primary_text bg-background2"
                        id="order"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
                
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mb-10 bg-background1">
                {filteredMovies.map((movie, index) => (
                    <MovieCard
                        key={index}
                        movie={movie}
                        onAddToFavorites={() => handleAddToFavorites(movie._id)}
                    />
                ))}
            </div>

            {filteredMovies.length < movies.length && (
                <div className="flex justify-center mt-8 flex-row">
                    <button
                        onClick={handleLoadMore}
                        className="bg-highlight hover:bg-highlight_hover text-white font-bold py-2 px-4 rounded-md flex flex-row"
                        
                    >
                        Load More
                        <MdArrowDownward className="w-6 h-6 text-white ml-1 font-semibold"/>
                    </button>
                </div>
            )}

            <GoToTop /> {/* Render the GoToTop component at the end of the movies list */}
        </div>
    );
};

export default AllMovies;
