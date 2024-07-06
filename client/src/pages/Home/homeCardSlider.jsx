import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import MovieCard from '../../components/movieCard/index.jsx';
import ShowCard from '../../components/showCard/index.jsx';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from 'sonner';

const HomeCardSlider = ({ elements, title, what }) => {
    const APIURL = import.meta.env.VITE_API_URL;

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
                    dots: false,
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

    const handleAddToFavorites = async (movieId) => {
        try {
            const response = await axiosInstance.post(`${APIURL}/users/favourites`, {
                movieId: movieId,
            });
            toast.success("Successfully added to favorites");
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    return (
        <div className="m-auto w-[90%]">
            <h3 className="text-2xl text-white font-normal">
                {title}
            </h3>
            <div className="my-5">
                <Slider {...settings} className='mx-0 md:mx-5'>
                    {elements.map((element, key) => (
                        <div key={key} className="px-2 flex items-stretch"> {/* Added flex and items-stretch */}
                            <Link to={`explore/${what === "movies" ? "movies" : "shows"}/${element.slug}`} className="flex-1">
                                {what === "movies" ? (
                                    <MovieCard
                                        movie={element}
                                        onAddToFavorites={() => handleAddToFavorites(element._id)}
                                        className="flex flex-col justify-between h-full"
                                    />
                                ) : (
                                    <ShowCard
                                        show={element}
                                        className="flex flex-col justify-between h-full"
                                    />
                                )}
                            </Link>
                        </div>
                    ))}
                    <div className=' h-[39vw] w-full !flex !justify-center !items-center ' >
                    <Link to={`explore/${what === "movies" ? "movies" : "shows"}`} className="flex-1 !flex !justify-center !items-center">
                        <div className='bg-background2 h-28 w-[60%] rounded-full !flex !justify-center !items-center ' >
                            Show All
                        </div>
                    </Link>
                    </div>
                </Slider>
            </div>
        </div>
    );
};

export default HomeCardSlider;
