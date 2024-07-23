import React, { useRef, useState, useEffect } from "react";
import "../../pages/SingleMovie/styles.css";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

const CastSlider = ({ casts, who }) => {
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

    // Check content width whenever casts change
    window.addEventListener("resize", checkContentWidth);
    return () => {
      window.removeEventListener("resize", checkContentWidth);
    };
  }, [casts]);

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

  return (
    <div className="relative w-full lg:px-10 md:px-8 sm:px-0 px-0">
      <h2 className="  text-2xl  font-bold font-montserrat mb-4 text-left lg:px-10 md:px-8 sm:px-5 px-10 text-primary_text">
        {who === "casts" ? "Casts:" : "Crews:"}
      </h2>
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

        <div ref={sliderRef} className="flex overflow-x-auto gap-x-[2rem] px-1">
          {casts.map((cast, index) => (
            <div key={index} className="flex-shrink-0 w-36">
              <div className="w-36 h-36 rounded-full overflow-hidden mb-2">
                <img
                  src={cast.person.image}
                  alt={cast.person.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center flex flex-col items-center justify-center">
                <div className="font-semibold text-primary_text">
                  {cast.person.name}
                </div>
                <div className="font-lato text-secondary_text">{cast.role}</div>
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
  );
};

export default CastSlider;
