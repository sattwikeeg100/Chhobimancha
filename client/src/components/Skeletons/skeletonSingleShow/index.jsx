import React, { useState, useEffect } from "react";

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(getCurrentScreenSize());

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getCurrentScreenSize());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return screenSize;
};

const getCurrentScreenSize = () => {
  if (window.innerWidth >= 1536) return "2xl";
  if (window.innerWidth >= 1280) return "xl";
  if (window.innerWidth >= 1024) return "lg";
  if (window.innerWidth >= 768) return "md";
  return "sm";
};

const SkeletonSingleShow = () => {
  const screenSize = useScreenSize();
  const getCirclesCount = () => {
    switch (screenSize) {
      case "2xl":
        return 5;
      case "xl":
        return 4;
      case "lg":
        return 2;
      case "md":
        return 4;
      default:
        return 2;
    }
  };

  const circlesCount = getCirclesCount();

  return (
    <section className="px-10 py-5  bg-background1 flex flex-col gap-y-7 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-y-5 justify-center">
        {/* poster */}
        <div className="px-10  flex flex-col items-center justify-start gap-y-3 ">
          <div className="  lg:max-w-[30rem] gap-y-3 rounded-xl flex flex-col items-center justify-center">
            <div className="rounded-xl object-cover w-[16rem] h-[16rem] sm:w-[22rem]  lg:max-h-[30rem] lg:min-h-[30rem]  lg:w-[30rem] animate-pulse bg-shadow "></div>
            <div className="w-[18rem] h-[2rem] sm:w-[22rem] md:w-[35rem]  lg:max-h-[3rem] lg:min-h-[3rem]  lg:w-[30rem] animate-pulse bg-shadow"></div>
            <div className="w-[18rem] h-[2rem] sm:w-[22rem] md:h-[0rem]  lg:max-h-[3rem] lg:min-h-[3rem]  lg:w-[30rem] animate-pulse bg-shadow"></div>
          </div>
        </div>

        {/* Cast and Crews Section */}

        <div className="flex flex-col gap-y-16 lg:w-[56%] xl:w-[64%] lg:pr-10">
          {/* cast */}
          <div className=" flex flex-col lg:px-10 xl:pl-16">
            <div className="w-[8rem] h-[2rem] sm:w-[22rem]  lg:h-[2.5rem]  lg:w-[10rem] animate-pulse bg-shadow"></div>
            <div className="pt-7">
              {/* <TheatreCastCrew casts={show.casts} /> */}
              <div className="flex overflow-x-auto gap-x-[2rem] px-1 animate-pulse">
                {Array.from({ length: circlesCount }).map((_, index) => (
                  <div
                    key={index}
                    className=" bg-shadow w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden mb-2"
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* crew */}
          <div className=" flex flex-col lg:px-10 xl:pl-16">
            <div className="w-[8rem] h-[2rem] sm:w-[22rem]  lg:h-[2.5rem]  lg:w-[10rem] animate-pulse bg-shadow"></div>
            <div className="pt-7">
              {/* <TheatreCastCrew casts={show.casts} /> */}
              <div className="flex overflow-x-auto gap-x-[2rem] px-1 animate-pulse">
                {Array.from({ length: circlesCount }).map((_, index) => (
                  <div
                    key={index}
                    className=" bg-shadow w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden mb-2"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* about section */}

      <div className="px-0 lg:px-2  flex flex-col gap-y-3">
        <div className="w-[13rem] h-[3rem] sm:w-[22rem]  lg:max-h-[3rem] lg:min-h-[3rem]  lg:w-[12rem] animate-pulse bg-shadow"></div>
        <div className="w-full h-[20rem] animate-pulse bg-shadow"></div>
      </div>

      {/* booking */}

      <div className="px-0 lg:px-2 flex flex-col gap-y-3">
        <div className="w-[13rem] h-[3rem] sm:w-[22rem]  lg:max-h-[3rem] lg:min-h-[3rem]  lg:w-[10rem] animate-pulse bg-shadow"></div>
        <div className="w-full h-[50rem] animate-pulse bg-shadow"></div>
      </div>
    </section>
  );
};

export default SkeletonSingleShow;
