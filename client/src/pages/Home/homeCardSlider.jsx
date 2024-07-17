import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SkeletonMoviecard from "../../components/Skeletons/SkeletonMovieCard/SkeletonMoviecard";
import "./custom-slick.css";

const HomeCardSlider = ({ elements, title, what, isLoading }) => {
  //const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(
    Array(elements.length).fill(false)
  );
  const handleImageLoad = (index) => {
    setImageLoaded((prevState) => {
      const newLoadedState = [...prevState];
      newLoadedState[index] = true;
      console.log(newLoadedState);
      return newLoadedState;
    });
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: false,
        },
      },
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
        },
      },
    ],
  };

  const visibleElements = elements.slice(0, 7);
  console.log(elements.length);

  return (
    <div id="" className="m-auto w-[85%] sm:w-[90%]">
      {isLoading ? (
        <div className=" shadow-lg bg-shadow w-[70%] sm:w-[50%] h-10 my-7 rounded-md  "></div>
      ) : (
        <h3
          id=""
          className="text-2xl sm:text-4xl text-primary_text font-semibold font-playfair tracking-tighter py-7"
        >
          {title}
        </h3>
      )}

      <div id="movieCards ">
        <Slider {...settings} className="object-center ">
          {isLoading
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
                  <div className="font-normal min-h-[400px] 2xl:min-h-[450px]">
                    <div className="px-1 flex justify-center items-center flex-wrap ">
                      <div
                        id="moviePoster"
                        className="w-full text-center bg-contain "
                      >
                        {elements.length == 0 ? (
                          <SkeletonMoviecard />
                        ) : (
                          <div className="flex flex-col items-center justify-center">
                            <img
                              src={element.poster}
                              alt={element.title}
                              onLoad={() => handleImageLoad(key)}
                              className={`${
                                what === "movies"
                                  ? `h-[400px]  2xl:h-[450px] 
                                     w-[300px]  2xl:w-[320px] 
                                  
                                  rounded-lg`
                                  : `h-[400px] 
                                     w-[300px] 
                                     
                                     rounded-lg`
                              } `}
                            />
                            <div className="mt-3  font-medium text-2xl font-lato">
                              <h3>{element.title}</h3>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          <div
            className={`  rounded-md bg-shadow h-[400px] 2xl:h-[450px] w-[300px]  2xl:w-[320px] !flex !justify-center !items-center !bg-no-repeat relative right-0 ${
              elements.length != 0 && !isLoading ? "!block" : "!hidden"
            } `}
          >
            <Link
              to={`explore/${what === "movies" ? "movies" : "shows"}`}
              className={`flex-1 flex justify-center items-center  `}
            >
              <div
                className={`bg-background1 hover:bg-background2 h-28 w-[50%] rounded-[30px] flex justify-center items-center flex-wrap text-center ${
                  elements.length != 0 && !isLoading ? "block" : "hidden"
                }`}
              >
                <span className="text-primary_text  md:text-xl font-lato font-medium  text-lg p-2 ">
                  Explore more {what === "movies" ? "movies" : "shows"}
                </span>
              </div>
            </Link>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default HomeCardSlider;
