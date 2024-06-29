import React from 'react'
import { Link } from 'react-router-dom';
// import SwitchTabs from '../../SwitchTabs/SwitchTabs'
import movies from "./movies.js"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const LatestMovies = () => {

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
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };

    return (
        <div id='' className=' m-auto w-[90%] ' >
            <h3 id='' className=' text-2xl text-white font-normal' >
                Latest movies
            </h3>
            <div className='my-5' >
                <Slider {...settings}>


                    {
                        movies.map((movie, key) => (
                            <Link to="explore/shows/:slug" >
                                <div id={key} className=' font-normal '>
                                    <div className='p-2 flex justify-center items-center flex-wrap ' >
                                        <div id='moviePoster' className={' w-full text-center bg-cover '} >
                                            <img src={movie.image} alt="" className='h-full w-full bg-contain' />
                                            <div className='my-3 text-xl '>
                                                <h3>
                                                    {movie.title}
                                                </h3>
                                            </div>
                                        </div>
                                        <div id='movieDescription' className='' >
                                            {movie.Description + "  " + key}
                                        </div>

                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </Slider>
            </div>
        </div>
    )
}

export default LatestMovies
