import React from "react";

const SkeletonBuySubscription = () => {
  return (
    <div className="min-h-screen py-12 bg-background1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-background2 flex flex-col items-center gap-y-5 rounded-lg p-8 h-screen ">
          <div className="h-20 bg-shadow rounded-lg animate-pulse w-[18rem]"></div>
          <div className="h-20 bg-shadow rounded-lg animate-pulse w-full sm:w-[35rem]"></div>
          <div className="h-[10.5rem] bg-shadow rounded-lg animate-pulse w-full mt-2"></div>
          <div className="h-[10.5rem] bg-shadow rounded-lg animate-pulse w-full mt-2"></div>

          <div className="h-[10.5rem] bg-shadow rounded-lg animate-pulse w-full mt-2"></div>

          <div className="h-[10.5rem] bg-shadow rounded-lg animate-pulse w-full mt-2"></div>

          <div className="h-[10.5rem] bg-shadow rounded-lg animate-pulse w-full mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonBuySubscription;
