import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import SkeletonMoviecard from '../../../components/SkeletonMovieCard/SkeletonMoviecard';

const SkeletonLoaderHeader = () => {
    return (
        <div className=" w-screen flex flex-col items-center bg-background1 text-white font-semibold font-montserrat rounded-sm">
            <SkeletonTheme baseColor="#313131" highlightColor="#232222">
                <header className='h-full w-full my-8'>
                    <div className="w-full h-full">
                        <div className="md:mx-10 mx-4 ">
                            <Skeleton 
                                height="60vw"
                                className="md:!h-[30vw] w-full animate-pulse rounded-xl" 
                            />
                        </div>
                    </div>
                </header>
            </SkeletonTheme>
        </div>
    );
};

export default SkeletonLoaderHeader;
