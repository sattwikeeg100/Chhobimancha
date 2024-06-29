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
    autoplay:true,
    speed: 1000,
     autoplaySpeed: 1000,
    cssEase: "linear",
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => {
      setOldSlide(current);
      setActiveSlide(next);
    },
    afterChange: current => setActiveSlide2(current)
  };
    const [searchval, setSearchval] = useState("");
    const searchbarHandler = (event) => {
        const query = event.target.value;
        if (event.key === "Enter" && query.length > 0) {
            setSearchval(query);
            navigate(`/search/${query}`);
        }
    };
    return (
        <div id="Home" className=" pb-16 w-screen h-fit flex flex-col items-center bg-black text-white font-semibold font-serif " >

            < header className='h-full w-full my-8'>
                <div className={` w-full h-full`}  >
                    <div className="w-full my-4 h-fit flex justify-center items-center flex-nowrap ">
                        <div className="">
                            <input
                                className=' text-white font-semibold font-serif  p-5 caret-white border-solid border-white border-2 border-r-0 rounded-l-3xl active:border-none w-20vw  lg:w-[50vw] md:w-[30vw] text-xl overflow-x-hidden bg-transparent '
                                type="text"
                                placeholder="Search for a movie or tv show...."
                                onChange={(e) => setSearchval(e.target.value)}
                                onKeyUp={searchbarHandler}
                            />
                            <input className="p-5 border-solid border-white border-2 border-l-0 hover:border-none rounded-r-3xl bg-yellow-500 text-white text-xl" type="button" value="Search" placeholder="Search" />
                        </div>
                    </div>
                    <Slider {...settings} className="mx-10 object-center ">

                        {
                            recentMovies.map((movie, key) => (
                                <Link to="explore/shows/:slug" >
                                <div className="">
                                    <img src={`${movie.image}`} alt="" className="w-[90%] h-[40vw] md:h-[30vw] object-center" />

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
