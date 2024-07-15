import React from 'react';
import Skeleton  ,{SkeletonTheme} from 'react-loading-skeleton';
import SkeletonMoviecard from '../../../components/SkeletonMovieCard/SkeletonMoviecard';


const SkeletonLoaderHeader = () => {
    return (
        <div className="pb-16 w-screen h-[100px] md:h-[30vw] flex flex-col items-center bg-background1 text-white font-semibold font-montserrat rounded-sm">
            <SkeletonTheme baseColor="#313131" highlightColor="#232222" >
            <header className='h-full w-full my-8'>
                <div className={`w-full h-full`}>
                    <div className="mx-10">
                        <Skeleton height={400} width="99%" className='animate-pulse rounded-lg  ' />
                    </div>
                </div>
            </header>
            </SkeletonTheme>
        </div>
    );
};

export default SkeletonLoaderHeader;
