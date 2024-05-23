import React, { useState, useEffect } from "react";
import "./style.scss";
import HeroBanner from "./heroBanner/HeroBanner";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
import axios from "axios";
import MovieSlider from "./homeMovieSlider/homeMovieSlider";

const APIURL = import.meta.env.VITE_API_URL;

const Home = () => {
    const [movies, setMovies] = useState([]);

    const GetAllMovies = async () => {
        try {
            const response = await axios.get(`${APIURL}/movies`);
            setMovies(response.data);
            console.log(response);
        } catch (error) {
            console.error("Error fetching movies data", error);
        }
    };

    useEffect(() => {
        GetAllMovies();
    }, []);

    // Filtering logic for top-rated and popular movies
    const topRatedMovies = movies.filter((movie) => movie.averagerating >= 3); 
    const popularMovies = movies.filter((movie) => movie.numberOfReviews >= 0); 

    console.log(movies);

    return (
        <div className="homePage">
            <HeroBanner />
            <h1 className="homeTitle">Popular Movies</h1>
            <MovieSlider movies={topRatedMovies} />
            <h1 className="homeTitle">Top Rated</h1>
            <MovieSlider movies={popularMovies} />
        </div>
    );
};

export default Home;
