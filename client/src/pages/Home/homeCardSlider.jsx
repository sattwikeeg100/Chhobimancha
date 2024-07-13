import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SkeletonMoviecard from '../../components/SkeletonMovieCard/SkeletonMoviecard';

const HomeCardSlider = ({ elements, title, what }) => {
    const [loading, setLoading] = useState(true);
    const [imageLoaded, setImageLoaded] = useState(Array(elements.length).fill(false));
    const handleImageLoad = (index) => {
        setImageLoaded(prevState => {
            const newLoadedState = [...prevState];
            newLoadedState[index] = true;
            console.log(newLoadedState);
            return newLoadedState;
        });
    };
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
        ],
    };

    const visibleElements = elements.slice(0, 7);
    console.log(loading);

    return (
        <div id="" className="m-auto w-[90%]">
            <h3 id="" className="text-2xl text-white font-normal">
                {title}
            </h3>
            <div id='movieCards' className="my-5">
                <Slider {...settings} className="object-center">
                    {loading
                        ? Array.from({ length: 7 }).map((_, key) => (
                            <SkeletonMoviecard key={key} />
                        ))
                        : visibleElements.map((element, key) => (
                            <Link
                                key={key}
                                to={
                                    what === "movies"
                                        ? `explore/movies/${element.slug}`
                                        : `explore/shows/${element.slug}`
                                }
                            >
                                <div className="font-normal min-h-[400px] min-w-[400px]">
                                    <div className="p-2 flex justify-center items-center flex-wrap ">
                                        <div
                                            id="moviePoster"
                                            className="w-full text-center bg-cover ">
                                            {!elements && <SkeletonMoviecard />}
                                            <div>
                                                <img
                                                    src={element.poster}
                                                    alt={element.title}
                                                    onLoad={() => handleImageLoad(key)}
                                                    className={`h-[250px] w-[250px] md:h-[400px] md:w-[400px] bg-contain `}
                                                />
                                                <div className="my-3 text-xl font-open_sans">
                                                    <h3>{element.title}</h3>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                        <div className={` mt-2 rounded-md bg-shadow h-[250px] w-[300px] md:h-[400px] md:w-[400px] !flex !justify-center !items-center !bg-no-repeat relative right-0 ${!elements ? '!block' : '!hidden'} `}>
                            <Link to={`explore/${what === "movies" ? "movies" : "shows"}`} className={`flex-1 flex justify-center items-center  `}>
                                <div className={`bg-background2 h-28 w-[50%] rounded-[30px] flex justify-center items-center flex-wrap text-center ${!elements ? 'block' : 'hidden'}`}>
                                    <span className="text-white font-light font-montserrat text-sm md:text-base ">Explore more {what === "movies" ? "movies" : "shows"}</span>
                                </div>
                            </Link>
                        </div>
                </Slider>
            </div>
        </div>
    );
};

export default HomeCardSlider;
