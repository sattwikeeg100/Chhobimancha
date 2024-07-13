import React from "react";
// Make sure to create appropriate styles for the skeletons

const SkeletonSingleMovie = () => {
  return (
    <div className="bg-black">
      {/* Skeleton for the background image */}
      <div className="relative w-full bg-cover bg-center xl:h-[75vh] lg:h-[58vh] sm:h-[55vh] bg-background1">
        {/* Content Skeleton */}
        <div className="flex flex-row h-ful gap-5 p-5 pt-10">
          {/* Skeleton for the left side (poster and button) */}
          <div className="h-auto lg:ml-24 md:ml-10 sm:ml-5 flex flex-col justify-center items-center xl:w-1/5 lg:w-1/4 md:w-1/5 sm:w-1/4">
            <div className="w-64 h-96 mb-5 mt-3 p-2 rounded-xl bg-shadow animate-pulse"></div>
            <div className="w-64 h-12 mb-3 rounded-lg bg-shadow animate-pulse"></div>
          </div>

          {/* Skeleton for the right side (details) */}
          <div className="flex flex-col justify-center items-start xl:w-2/5 lg:w-2/4 md:w-3/5 sm:w-2/4 lg:gap-5 md:gap-2 sm:gap-1">
            <div className="w-1/2 h-10 mb-6 rounded-lg skeleton-box bg-shadow"></div>

            <div className="flex flex-row items-center gap-2">
              {/* <div className="w-6 h-6 bg-shadow"></div> */}
              <div className="w-24 h-7 skeleton-box bg-shadow rounded-lg animate-pulse"></div>
              {/* <div className="w-6 h-6 "></div> */}
              <div className="w-24 h-7 skeleton-box bg-shadow rounded-lg animate-pulse"></div>
              {/* <div className="w-6 h-6 "></div> */}
              <div className="w-24 h-7 skeleton-box bg-shadow rounded-lg animate-pulse"></div>
            </div>

            <div className="flex flex-row items-center gap-6 py-3">
              <div className="w-24 h-7 skeleton-box bg-shadow rounded-lg animate-pulse"></div>
              <div className="w-24 h-7 skeleton-box bg-shadow rounded-lg animate-pulse mr-4"></div>
              <div className="w-28 h-9 skeleton-box bg-shadow rounded-lg animate-pulse"></div>
            </div>

            <div className="w-36 h-8 bg-shadow rounded-lg skeleton-box"></div>
          </div>
        </div>
      </div>

      {/* Movie Description Skeleton */}
      <div className="lg:px-24 sm:px-5 mt-10 flex flex-col gap-4">
        <div className="text-left  flex flex-col gap-5 common-container">
          <div className="w-40 h-12 mb-4 rounded-lg bg-shadow"></div>
          <div className="w-[70%] h-16 mb-2 rounded-lg bg-shadow"></div>
        </div>

        {/* Casts Skeleton */}

        <div className="flex flex-col ml-4 sm:px-5 mt-10 animate-pulse rounded-lg">
          <div className="w-[8rem] h-[2rem] sm:w-[22rem]  lg:max-h-[3rem] lg:min-h-[3rem]  lg:w-[10rem] animate-pulse bg-shadow rounded-lg"></div>
          <div className="pt-7">
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

        {/* Crew Skeleton */}
        <div className="flex flex-col ml-4 px-32 sm:px-5 mt-10 animate-pulse rounded-lg">
          <div className="w-[8rem] h-[2rem] sm:w-[22rem]  lg:max-h-[3rem] lg:min-h-[3rem]  lg:w-[10rem] animate-pulse bg-shadow rounded-lg"></div>
          <div className="pt-7">
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
