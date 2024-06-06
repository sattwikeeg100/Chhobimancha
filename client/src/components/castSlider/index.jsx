import React, { useRef } from 'react';
import '../../pages/SingleMovie/styles.css';

const CastSlider = ({ casts }) => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full px-10">
      <h2 className="text-2xl font-bold mb-4 text-left px-10 text-white">Cast</h2>
      <div className="flex items-center">

        <button onClick={scrollLeft} className="p-3 mr-4 rounded-full bg-gray-300 hover:bg-gray-400">
          &lt;
        </button>

        <div ref={sliderRef} className="flex overflow-x-auto gap-[3rem] hide-scrollbar">

          {casts.map((member, index) => (

            <div key={index} className="flex-shrink-0 w-32">

              <img src={member.image} alt={member.name} className="w-full h-auto rounded-full mb-2" />

              <div className="text-center">
                <div className="font-semibold text-white">{member.name}</div>
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
