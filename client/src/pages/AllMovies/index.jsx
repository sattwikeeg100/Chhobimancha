import React, { useEffect, useState } from "react";
import MovieCard from "../../components/movieCard";
import axiosInstance from "../../config/axiosInstance";

const APIURL = import.meta.env.VITE_API_URL;

const AllMovies = () => {
    const [user, setUser] = useState(null);
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    const GetAllMovies = async () => {
        try {
            const response = await axiosInstance.get("/movies");
            setMovies(response.data);
            setFilteredMovies(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        GetAllMovies();
    }, []);

    useEffect(() => {
        filterAndSortMovies();
    }, [selectedGenre, sortOption, sortOrder]);

    const filterAndSortMovies = () => {
        let tempMovies = [...movies];

        // Filter by genre
        if (selectedGenre) {
            tempMovies = tempMovies.filter(
                (movie) => movie.category === selectedGenre
            );
        }

        // Sort movies
        switch (sortOption) {
            case "rating":
                tempMovies.sort((a, b) =>
                    sortOrder === "asc"
                        ? a.averagerating - b.averagerating
                        : b.averagerating - a.averagerating
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

    if (loading) {
        return <div className="text-5xl">Loading...</div>;
    }

    const handleAddToFavorites = async (movieId) => {
        try {
            console.log(movieId);
            const response = await axiosInstance.post(
                `${APIURL}/users/favourites`,
                { movieId: movieId }
            );
            alert("Successfully added to favorites");
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <div className="justify-center items-center sm:mx-36">
            <h1 className="text-5xl font-bold my-8">All Movies</h1>

            <div className="mb-4">
                <label htmlFor="genre" className="mr-2">
                    Genre:
                </label>
                <select
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

                <label htmlFor="sort" className="ml-4 mr-2">
                    Sort By:
                </label>
                <select
                    id="sort"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}>
                    <option value="">None</option>
                    <option value="rating">Rating</option>
                    <option value="popularity">Popularity</option>
                    <option value="releaseDate">Release Date</option>
                </select>

                <label htmlFor="order" className="ml-4 mr-2">
                    Order:
                </label>
                <select
                    id="order"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredMovies.map((movie, index) => (
                    <MovieCard
                        key={index}
                        movie={movie}
                        onAddToFavorites={() => handleAddToFavorites(movie._id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default AllMovies;
