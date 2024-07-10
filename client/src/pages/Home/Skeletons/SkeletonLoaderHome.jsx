import React from 'react';
import Skeleton  ,{SkeletonTheme} from 'react-loading-skeleton';
import SkeletonMoviecard from '../../../components/SkeletonMovieCard/SkeletonMoviecard';


const SkeletonLoaderHome = () => {
    return (
        <div className="pb-16 w-screen h-fit flex flex-col items-center bg-background1 text-white font-semibold font-montserrat">
            <SkeletonTheme baseColor="#313131" highlightColor="#232222" >
            <header className='h-full w-full my-8'>
                <div className={`w-full h-full`}>
                    <div className="mx-10">
                        <Skeleton height={400} width="99%" className='animate-pulse rounded-lg' />
                    </div>
                </div>
            </header>
            <div className="w-screen h-full flex justify-center items-center">
                <div className="w-full h-full">
                    <div className='m-auto w-[90%]'>
                        <h3 className='text-2xl text-white font-normal'>
                            Latest movies
                        </h3>
                        <div className='my-5'>
                            <div className='grid grid-cols-4 gap-4'>
                                {[1, 2, 3, 4].map((item) => (
                                    <div key={item} className='font-normal'>                                        
                                        <SkeletonMoviecard />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='m-auto w-[90%]'>
                        <h3 className='text-2xl text-white font-normal'>
                            Popular movies
                        </h3>
                        <div className='my-5'>
                            <div className='grid grid-cols-4 gap-4'>
                                {[1, 2, 3, 4].map((item) => (
                                    <div key={item} className='font-normal'>
                                        <SkeletonMoviecard />
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                    </div>
                    <div className='m-auto w-[90%]'>
                        <h3 className='text-2xl text-white font-normal'>
                            Upcoming Shows
                        </h3>
                        <div className='my-5'>
                            <div className='grid grid-cols-4 gap-4'>
                                {[1, 2, 3, 4].map((item) => (
                                    <div key={item} className='font-normal'>
                                        <SkeletonMoviecard />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </SkeletonTheme>
        </div>
    );
};

export default SkeletonLoaderHome;
