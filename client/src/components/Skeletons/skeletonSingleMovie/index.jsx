import React from "react";
// Make sure to create appropriate styles for the skeletons

const SkeletonSingleMovie = () => {
  return (
    <div className="bg-background1">
      {/* Skeleton for the background image */}
      <div className="relative w-full bg-cover bg-center xl:h-[75vh] lg:h-[58vh] sm:h-[55vh] h-[32vh] bg-background1">
        {/* Content Skeleton */}
        <div className="flex flex-row h-full gap-3 p-5  ">
          {/* Skeleton for the left side (poster and button) */}
          <div className="h-auto gap-y-3 lg:ml-24 md:ml-16 sm:ml-5 ml-1 flex flex-col justify-center items-center xl:w-1/5 lg:w-1/4 md:w-1/5 sm:w-1/4 w-2/5">
            <div className="lg:w-64 xl:h-96 lg:h-72 md:h-56 md:w-40 sm:h-40 w-32  h-60  p-2 rounded-xl bg-shadow animate-pulse"></div>
            <div className="lg:w-64 lg:h-12 md:w-40 sm:h-8 sm:w-32 hidden sm:block  rounded-lg bg-shadow animate-pulse"></div>
          </div>

          {/* Skeleton for the right side (details) */}
          <div className="flex flex-col justify-center items-start ml-5 xl:w-2/5 lg:w-2/4 md:w-3/5 w-2/4 lg:gap-5 gap-y-3">
            <div className="lg:h-10  md:h-8 sm:h-6 h-6 w-[80%] rounded-lg skeleton-box bg-shadow animate-pulse"></div>

            <div className="lg:h-10  md:h-8 sm:h-6 h-6 w-[80%] rounded-lg skeleton-box bg-shadow animate-pulse"></div>
            <div className="lg:h-10  md:h-8 sm:h-6 h-6 w-[80%] rounded-lg skeleton-box bg-shadow animate-pulse"></div>
            <div className="lg:h-10  md:h-8 sm:h-6 h-6 w-[80%] rounded-lg skeleton-box bg-shadow animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="px-8 gap-x-4 flex flex-row justify-between sm:hidden mb-2">
        <div className="w-32 h-10 rounded-lg bg-shadow animate-pulse"></div>
        <div className="w-32 h-10 rounded-lg bg-shadow animate-pulse"></div>
      </div>

      {/* Movie Description Skeleton */}
      <div className="xl:px-24 lg:px-20 md:px-10 sm:px-5 px-0 mt-0 xl:mt-10 lg:mt-5 flex flex-col gap-4">
        <div className="text-left flex flex-col gap-5 common-container">
          <div className="sm:w-48 sm:h-12 w-36 h-8 mb-4 rounded-lg bg-shadow animate-pulse"></div>
          <div className="w-full h-40 mb-2 rounded-lg bg-shadow animate-pulse"></div>
        </div>

        {/* Casts Skeleton */}

        <div className="flex flex-col ml-4 sm:px-5 px-5 mt-10 animate-pulse rounded-lg">
          <div className="w-[8rem] h-[2rem] sm:w-[22rem] md:w-[8rem] lg:max-h-[3rem] lg:min-h-[3rem]  lg:w-[10rem] animate-pulse bg-shadow rounded-lg "></div>
          <div className="pt-7">
            <div className="flex gap-4 overflow-x-auto">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-32 h-32 rounded-full bg-shadow animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Crew Skeleton */}
        <div className="flex flex-col ml-4 sm:px-5 px-5 mt-10 animate-pulse rounded-lg">
          <div className="w-[8rem] h-[2rem] sm:w-[22rem] md:w-[8rem] lg:max-h-[3rem] lg:min-h-[3rem]  lg:w-[10rem] animate-pulse bg-shadow rounded-lg"></div>
          <div className="pt-7 pb-10">
            <div className="flex gap-4 overflow-x-auto">
              {Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-32 h-32 rounded-full bg-shadow"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonSingleMovie;
