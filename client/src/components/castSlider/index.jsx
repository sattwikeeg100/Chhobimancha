import React, { useRef, useState, useEffect } from 'react';
import '../../pages/SingleMovie/styles.css';
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
    <div className="relative w-full px-10">
      <h2 className="text-2xl font-bold font-montserrat mb-4 text-left px-10 text-white">
        {who === "casts" ? "Casts" : "Crews"}
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

        <div ref={sliderRef} className="flex overflow-x-auto gap-[3rem] hide-scrollbar">
          {casts.map((cast, index) => (
            <div key={index} className="flex-shrink-0 w-32">
              <img src={cast.person.image} alt={cast.person.name} className="w-28 h-28 rounded-full mb-2" />
              <div className="text-center flex flex-col">
                <div className="font-semibold font-lato text-white">{cast.person.name}</div>
                <div className="text-white font-roboto">{cast.role}</div>
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
