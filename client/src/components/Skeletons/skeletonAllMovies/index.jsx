import React from "react";

const SkeletonAllMovies = () => {
  return (
    <div>
      <div className="justify-center items-center p-4  sm:px-10 bg-background1">
        <h2 className=" h-[2rem] sm:h-[2.5rem] w-full lg:w-[22.5%] bg-shadow  animate-pulse mb-4 rounded-xl"></h2>
        <div className="flex flex-col sm:flex-row gap-4 mb-5">
          <h2 className="h-[2.5rem] w-[70%] sm:w[50%] lg:w-[22.5%] bg-shadow  animate-pulse rounded-xl"></h2>
          <h2 className="h-[2.5rem] w-[70%] sm:w[50%] lg:w-[22.5%] bg-shadow  animate-pulse rounded-xl"></h2>
          <h2 className="h-[2.5rem] w-[70%] sm:w[50%] lg:w-[22.5%] bg-shadow  animate-pulse rounded-xl"></h2>
        </div>

        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className=" bg-background2 p-4 rounded-md shadow-md animate-pulse"
            >
              <div className="flex flex-col gap-y-3 text-primary_text">
                <div className="w-full h-72 bg-shadow mb-4 rounded-md"></div>
                <div className="h-[2rem]  bg-shadow animate-pulse rounded"></div>
                <div className="h-[2rem]  bg-shadow animate-pulse rounded"></div>
                <div className="h-[2rem]  bg-shadow animate-pulse rounded"></div>
                <div className="h-[2rem]  bg-shadow animate-pulse rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonAllMovies;

{
  /* {shows.map((show, index) => (
            <div key={index}>
              <ShowCard show={show} />
            </div>
          ))} */
}
