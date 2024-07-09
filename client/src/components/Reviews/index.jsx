import React from "react";
import { FaStar } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../pages/SingleMovie/styles.css";

const Reviews = ({ reviews }) => {
    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: reviews.length > 3,
        responsive: [
            {
                breakpoint: 1032,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: false,
                    dots: false,
                    arrows: reviews.length > 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
        ],
    };

    console.log(reviews);
    return reviews.length > 0 ? (
        <div className="text-left text-white flex flex-col gap-1 common-container">
            <h2 className="common-heading font-montserrat mx-10">Reviews:</h2>
            {reviews.length > 3 ? (
                <Slider {...sliderSettings}>
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="flex flex-row gap-5 mb-5 mt-5 p-5">
                            <div className="relative p-5 bg-shadow h-60 border border-gray-300 rounded-lg shadow-md flex flex-col">
                                <div className="sticky-top flex items-center gap-2 bg-shadow">
                                    <div className="flex-shrink-0 w-10 h-10">
                                        <img
                                            src={
                                                review.user && review.user.image
                                                    ? review.user.image
                                                    : "/avatar.jpg"
                                            }
                                            className="w-full h-full rounded-full object-cover"
                                            alt="User"
                                        />
                                    </div>
                                    <div className="text-white font-semibold font-roboto bg-shadow">
                                        {review.userName}
                                    </div>
                                    <div className="absolute top-2 right-2 text-highlight font-bold font-lato bg-shadow text-md flex items-center gap-1 ">
                                        <FaStar />
                                        {review.rating}/5
                                    </div>
                                </div>
                                {/* <div className="sticky-top top-7 right-5 text-highlight font-bold font-lato bg-shadow text-md flex items-center gap-1">
                    <FaStar />
                    {review.rating}/5
                  </div> */}
                                <div className="mt-4 text-left flex-grow review-text-container items-center">
                                    <p className="text-white text-sm review-text">
                                        {review.comment}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            ) : (
                <div className="flex gap-5 mb-5 mt-5">
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className={`w-[33%] p-5 bg-shadow h-60 border border-gray-300 rounded-lg shadow-md flex flex-col`}>
                            <div className="sticky-top flex items-center gap-2 bg-shadow">
                                <div className="flex-shrink-0 w-10 h-10">
                                    <img
                                        src={
                                            review.user && review.user.image
                                                ? review.user.image
                                                : "/avatar.jpg"
                                        }
                                        className="w-full h-full rounded-full object-cover"
                                        alt="User"
                                    />
                                </div>
                                <div className="text-white font-semibold font-roboto bg-shadow">
                                    {review.userName}
                                </div>
                                <div className="absolute top-2 right-2 text-highlight font-bold font-lato bg-shadow text-md flex items-center gap-1 ">
                                    <FaStar />
                                    {review.rating}/5
                                </div>
                            </div>

                            <div className="mt-4 text-left flex-grow review-text-container items-center">
                                <p className="text-white text-sm review-text">
                                    {review.comment}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    ) : (
        <div></div>
    );
};

export default Reviews;
