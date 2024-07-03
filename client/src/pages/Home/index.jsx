import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PopularMovies from "./PopularMovies";
import TrendingMovies from "./TrendingMovies";
import LatestMovies from "./LatestMovies";
import { recentMovies } from "./movies";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
    const [oldSlide, setOldSlide] = useState(0);
    const [activeSlide, setActiveSlide] = useState(0);
    const [activeSlide2, setActiveSlide2] = useState(0);

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
        cssEase: "linear",
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (current, next) => {
            setOldSlide(current);
            setActiveSlide(next);
        },
        afterChange: current => setActiveSlide2(current)
    };

    return (
        <div id="Home" className=" pb-16 w-screen h-fit flex flex-col items-center bg-black text-white font-semibold font-serif " >

            < header className='h-full w-full my-8'>
                <div className={` w-full h-full`}  >

                    <Slider {...settings} className="mx-10 object-center ">

                        {
                            recentMovies.map((movie, key) => (
                                <Link to="explore/shows/:slug" >
                                    <div className="">
                                        <img src={`${movie.image}`} alt="" className="w-[99%] h-[50vw] md:h-[30vw] object-center" />

                                    </div>
                                </Link>
                            ))
                        }
                    </Slider>
                </div>
            </header >
            <div className="w-screen h-full flex justify-center items-center">
                <div className=" w-full h-full" >

                    <LatestMovies />
                    <PopularMovies />
                    <TrendingMovies />
                </div>

            </div>

        </div >
    );
};

export default Home;
