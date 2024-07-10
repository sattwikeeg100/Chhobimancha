import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import axiosInstance from "../../config/axiosInstance";
import HomeCardSlider from "./homeCardSlider";
import SkeletonLoaderHome from './Skeletons/SkeletonLoaderHome';
import "react-loading-skeleton/dist/skeleton.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './custom-slick.css'; 

const NextArrow = ({ className, style, onClick }) => {
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "black", width: "60px", height: "60px", borderRadius: "50%", fontSize: "30px" }}
            onClick={onClick}
        />
    );
};

const PrevArrow = ({ className, style, onClick }) => {
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "black", width: "60px", height: "60px", borderRadius: "50%", fontSize: "30px" }}
            onClick={onClick}
        />
    );
};

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [oldSlide, setOldSlide] = useState(0);
    const [activeSlide, setActiveSlide] = useState(0);
    const [activeSlide2, setActiveSlide2] = useState(0);
    const [recentMovies, setRecentMovies] = useState([]);
    const [latestMovies, setLatestMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [shows, setShows] = useState([]);
    const [moviesLoading, setMoviesLoading] = useState(true);
    const [showsLoading, setShowsLoading] = useState(true);




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
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        beforeChange: (current, next) => {
            setOldSlide(current);
            setActiveSlide(next);
        },
        afterChange: (current) => setActiveSlide2(current),
    };

    useEffect(() => {
        GetAllMovies();
        GetAllShows();
        console.log()
    }, []);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);
    if (loading) {
        return <SkeletonLoaderHome />;
    }


    return (
        <div
            id="Home"
            className=" pb-16 w-screen h-fit flex flex-col items-center bg-black text-white font-semibold font-serif ">
            <header className="h-full w-[95%] my-8">
                <div className={` w-full h-full`}>
                    <Slider {...settings} className="mx-9 object-center ">
                        {recentMovies.map(movie => (
                            <Link to={`explore/movies/${movie.slug}`}>
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
