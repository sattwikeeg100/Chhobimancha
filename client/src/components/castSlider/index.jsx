import React, { useRef } from 'react';
import '../../pages/SingleMovie/styles.css';

const CastSlider = ({ casts, who }) => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full px-10">
      <h2 className="text-2xl font-bold font-montserrat mb-4 text-left px-10 text-white">{who === "casts"? "Casts": "Crews"}</h2>
      <div className="flex items-center">

        <button onClick={scrollLeft} className="p-3 mr-4 rounded-full bg-gray-300 hover:bg-gray-400">
          &lt;
        </button>

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
        <button onClick={scrollRight} className="p-3 ml-4 rounded-full bg-gray-300 hover:bg-gray-400">
          &gt;
        </button>
      </div>
    </div>
  );
};

export default CastSlider;
