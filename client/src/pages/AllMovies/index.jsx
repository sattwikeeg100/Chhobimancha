import React from "react";
import { movies } from "./movieDataDummy";
import MovieCard from "../../components/movieCard";

const AllMovies = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">All Movies</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {movies.map((movie, index) => (
                    <MovieCard key={index} movie={movie} />
                ))}
            </div>
        </div>
    );
};

export default AllMovies;