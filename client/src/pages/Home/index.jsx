import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axiosInstance from "../../config/axiosInstance";
import HomeCardSlider from "./homeCardSlider";

const Home = () => {
    const [oldSlide, setOldSlide] = useState(0);
    const [activeSlide, setActiveSlide] = useState(0);
    const [activeSlide2, setActiveSlide2] = useState(0);
    const [recentMovies, setRecentMovies] = useState([]);
    const [latestMovies, setLatestMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [shows, setShows] = useState([]);
    const [moviesLoading, setMoviesLoading] = useState(true);
    const [showsLoading, setShowsLoading] = useState(true);

    useEffect(() => {
        GetAllMovies();
        GetAllShows();
    }, []);

    const GetAllMovies = async () => {
        try {
            const response = await axiosInstance.get("/movies");
            const movies = response.data;
            const recent = movies.slice(Math.max(movies.length - 4, 0));
            const latest = movies
                .sort(
                    (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
                )
                .slice(0, 8);
            const popular = movies
                .sort((a, b) => b.numberOfReviews - a.numberOfReviews)
                .slice(0, 8);
            setRecentMovies(recent);
            setLatestMovies(latest);
            setPopularMovies(popular);
        } catch (error) {
            console.error(error);
        } finally {
            setMoviesLoading(false);
        }
    };

    const GetAllShows = async () => {
        try {
            const response = await axiosInstance.get("/shows");
            const shows = response.data;

            const currentDate = new Date();

            const upcomingShows = shows
                .map((show) => {
                    const [hours, minutes] = show.time.split(":");
                    const [year, month, day] = show.date
                        .split("T")[0]
                        .split("-");
                    const showDateTime = new Date(
                        year,
                        month - 1,
                        day,
                        hours,
                        minutes
                    );
                    return { ...show, showDateTime };
                })
                .filter((show) => show.showDateTime >= currentDate);

            const sortedUpcomingShows = upcomingShows.sort(
                (a, b) => a.showDateTime - b.showDateTime
            );

            const nearestFourShows = sortedUpcomingShows.slice(0, 4);

            setShows(nearestFourShows);
        } catch (error) {
            console.error(error);
        } finally {
            setShowsLoading(false);
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current, next) => {
            setOldSlide(current);
            setActiveSlide(next);
        },
        afterChange: (current) => setActiveSlide2(current),
    };

    return (
        <div
            id="Home"
            className=" pb-16 w-screen h-fit flex flex-col items-center bg-black text-white font-semibold font-serif ">
            <header className="h-full w-full my-8">
                <div className={` w-full h-full`}>
                    <Slider {...settings} className="mx-10 object-center ">
                        {recentMovies.map((movie, key) => (
                            <Link to={`explore/movies/${movie.slug}`} key={key}>
                                <div className="">
                                    <img
                                        src={`${movie.coverImage}`}
                                        alt=""
                                        className="w-[99%] h-[50vw] md:h-[30vw] object-center"
                                    />
                                </div>
                            </Link>
                        ))}
                    </Slider>
                </div>
            </header>
            <div className="w-screen h-full flex justify-center items-center">
                <div className=" w-full h-full">
                    <HomeCardSlider
                        elements={latestMovies}
                        title="Latest Movies"
                        what="movies"
                    />
                    <HomeCardSlider
                        elements={popularMovies}
                        title="Popular Movies"
                        what="movies"
                    />
                    <HomeCardSlider
                        elements={shows.slice(0, 4)}
                        title="Upcoming Shows"
                        what="shows"
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
