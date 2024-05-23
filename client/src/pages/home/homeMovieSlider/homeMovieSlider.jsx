import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/useFetch";
import MovieCard from "../../../components/newmoviecard/moviecard";

const MovieSlider = ({ movies }) => {
    const [endpoint, setEndpoint] = useState("movie");

    //const { data, loading } = useFetch(`/${endpoint}/top_rated`);
    if (!movies) {
        console.error("No movies to display");
    }
    return (
        <>
            <div className="movieSlider">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie._id}
                            title={movie.name}
                            rating={movie.averagerating}
                            year={movie.year}
                            imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXpWNty4QJ-20i7gHV96S2s1s1m8od-SjwrhYfA3GdfQ&s"
                        />
                    ))}
            </div>
        </>
    );
};

export default MovieSlider;
