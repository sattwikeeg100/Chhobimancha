import React from 'react'
import Skeleton , {SkeletonTheme} from 'react-loading-skeleton'

const SkeletonMoviecard = () => {
  return (
    <div>
      <SkeletonTheme baseColor="#313131" highlightColor="#232222" >
        <div className=' shadow-lg bg-background2 h-fit p-5 rounded-md mx-1 ' >
                <Skeleton height={350} className=' my-3 animate-pulse rounded-lg' />
                {/* <div className=" flex justify-center items-center">
                    <Skeleton height={25} width={250} count={2} className='rounded-lg my-2' />
                </div>
                <div className="flex justify-center items-center">
                <Skeleton height={50} width={250} className='rounded-lg mt-2' />
                </div> */}
        </div>
      </SkeletonTheme>
    </div>
  )
}

export default SkeletonMoviecard
