import React, { useRef, useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import "../../pages/SingleMovie/styles.css";

const Reviews = ({ reviews }) => {
  const sliderRef = useRef(null);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const checkContentWidth = () => {
      if (sliderRef.current) {
        const { scrollWidth, clientWidth } = sliderRef.current;
        setShowButtons(scrollWidth > clientWidth);
      }
    };

    // Check content width on mount
    checkContentWidth();

    // Check content width whenever reviews change
    window.addEventListener("resize", checkContentWidth);
    return () => {
      window.removeEventListener("resize", checkContentWidth);
    };
  }, [reviews]);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return reviews.length > 0 ? (
    <div className="relative w-full lg:px-10 md:px-8 sm:px-0 px-0">
      <div className="sm:text-2xl text-base common-heading font-montserrat lg:px-10 md:px-8 sm:px-5 px-10">
        Reviews:
      </div>
      <div className="flex items-center">
        {showButtons ? (
          <button
            onClick={scrollLeft}
            className="p-2 mr-2 rounded-full bg-gray-300 hover:bg-gray-400"
          >
            &lt;
          </button>
        ) : (
          <div className="w-[2%] p-2 mr-2" /> // Placeholder for left side gap
        )}

        <div
          ref={sliderRef}
          className="flex overflow-x-auto gap-x-8 hide-scrollbar"
        >
          {reviews.map((review, index) => (
            <div key={index} className="flex-shrink-0 w-96">
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
                  <div className="text-primary_text font-semibold font-roboto bg-shadow ">
                    {review.userName}
                  </div>
                  <div className="absolute top-2 right-2 text-highlight font-bold font-lato bg-shadow text-base flex items-center gap-1 ">
                    <FaStar />
                    {review.rating}/5
                  </div>
                </div>
                <div className="mt-4 text-left flex-grow review-text-container items-center">
                  <p className="text-primary_text text-sm review-text">
                    {review.comment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showButtons ? (
          <button
            onClick={scrollRight}
            className="p-2 ml-2 rounded-full bg-gray-300 hover:bg-gray-400"
          >
            &gt;
          </button>
        ) : (
          <div className="w-[2%] p-2 ml-2" /> // Placeholder for right side gap
        )}
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default Reviews;
