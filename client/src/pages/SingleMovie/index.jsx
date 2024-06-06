
import React, { useState } from 'react';
import CastSlider from '../../components/castSlider/index';
import ReviewForm from '../../components/movieReviewForm/index';
import Modal from '../../components/movieReviewModal'; 
import { BiRightArrow } from "react-icons/bi";
import { FaStar } from "react-icons/fa6";
import { LuDot } from "react-icons/lu";
import './styles.css';
import Reviews from '../../components/Reviews';


const SingleMovie = () => {
  const [reviews, setReviews] = useState([]);//to add reviews
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility

//movie data
  const movie = {
    "_id": "664d5bbfb6c3bb004d8cd020",
    "userId": "664d4cef626eabc378610af1",
    "name": "Chhota Bheem and the Curse of Damyaan (Hindi)",
    "desc": "Two mature individuals from disparately different regions of India meet in a laughing class and fall in love. Will their families be able to ascribe to their contrasting cultures?",
    "titleImage": "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-250,h-390/et00394855-xcwqkafasa-portrait.jpg",
    "image": "https://assets-in.bmscdn.com/discovery-catalog/events/et00394855-ftkukbxcsf-landscape.jpg",
    "category": "Action, Adventure, Family, Fantasy",
    "language": "Bengali",
    "year": "2024",
    "time": 2,
    "video": "byomkesh.mp3",
    "averagerating": 0,
    "numberOfReviews": 0,
    "casts": [
        { 
            name: 'Saswata Chatterjee', 
            image: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/saswata-chatterjee-1054997-14-02-2017-06-03-53.jpg' 
        },
        { 
            name: 'Aparajita Adhya',
            image: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/aparajita-adhya-33234-28-03-2018-06-20-01.jpg' 
        },
        { 
            name: 'Kharaj Mukherjee',
         image: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/kharaj-mukherjee-16716-1659083642.jpg' 
        },
        { 
            name: 'Sohag Sen', 
            image: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/sohag-sen-27845-30-11-2016-03-48-58.jpg' 
        },
        { 
            name: 'Koneenica Banerjee', 
            image: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/koneenica-banerjee-40821-1713942607.jpg' 
        },
        { 
            name: 'Debdut Ghosh', 
            image: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/debdut-ghosh-18881-1713942545.jpg' 
        },
        { 
            name: 'Tareen Jahan',
            image: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/tareen-jahan-2036300-1712993076.jpg' 
        },
        { 
            name: 'Pooja Karmakar',
            image: 'https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/pooja-karmakar-2036301-1712993162.jpg'
         },
        { 
            name: 'Arya Dasgupta',
            image:' https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/arya-dasgupta-1049852-13-01-2022-02-49-43.jpg' 
        },
      ],
    "reviews": [],
    "createdAt": "2024-05-22T02:43:11.012Z",
    "updatedAt": "2024-05-22T02:43:11.012Z",
    "__v": 0
  };

//to add reviews and close the review form
  const handleReviewSubmit = (review) => {
    setReviews([...reviews, review]);
    movie.numberOfReviews++;
    setShowModal(false); // Close the modal after submitting the review
  };

  //for play now button
  const handleClick = (e) => {
    e.preventDefault();
    alert("Sorry, we don't have this movie available right now");
  };

  return (
    <div className='bg-black'>

      {/* background image */}
      <div className="relative w-full bg-cover bg-center 
      xl:h-[75vh] lg:h-[58vh] sm:h-[55vh] "
       style={{ backgroundImage: `url(${movie.image})` }}>

        {/* shadow */}
        <div className="flex flex-row h-full bg-black bg-opacity-80 gap-5">

          {/* left side */}
          <div className=" h-auto lg:ml-24 md:ml-10 sm:ml-5 flex flex-col 
          justify-center items-center
          xl:w-1/5 lg:w-1/4 md:w-1/5 sm:w-1/4">

            {/* poster image */}
            <img src={movie.titleImage} alt={`${movie.name} Poster`} className="w-auto h-auto mb-2 mt-3 p-2 rounded-xl " />

            <div id="button-div">

              {/* play now button */}
              <button id="button" onClick={handleClick} className='group rounded-lg mb-3 flex items-center 
                space-x-0.5 bg-red-600 hover:bg-red-800
                lg:px-[4.5rem] lg:py-2
                md:px-6 md:py-2 
                sm:px-10 sm:py-1'>

                <span className=' 
                font-semibold text-white
                lg:text-lg md:text-md sm:text-sm'>
                  Play Now
                  </span>

                <div className='flex items-center translate-x-1 transition-all duration-300'>
                  <BiRightArrow className=' text-white
                  lg:w-6 lg:h-5 md:w-4 md:h-4 sm:w-3 sm:h-3' />
                </div>

              </button>              
            </div>

          </div>

          {/* right side */}
          <div className="flex flex-col justify-center items-start text-white
          xl:w-2/5 lg:w-2/4 md:w-3/5 sm:w-2/4 
          lg:gap-5 md:gap-2 sm:gap-1">

            {/* movie name */}
            <div className=" tracking-normal text-left
            lg:text-4xl md:text-xl mb-6 md:mb-1 md:ml-3 sm:ml-1">
              <strong>{movie.name}</strong></div>

              <div className='flex flex-row items-center'>

                {/* duration */}
                <LuDot className='md:w-6 md:h-6 sm:w-3 sm:h-3' />
                <div className="lg:text-xl md:text-sm sm:text-xs lg:tracking-normal md:tracking-tight lg:mr-3 md:mr-2 sm:mr-1">{movie.time} hr</div>

                {/* year of release */}
                <LuDot className='md:w-6 md:h-6 sm:w-3 sm:h-3' />
                <div className="lg:text-xl md:text-sm sm:text-xs lg:tracking-normal md:tracking-tight mr-3">{movie.year}</div>

                {/* category */}
                <LuDot className='md:w-6 md:h-6 sm:w-3 sm:h-3' />
                <div className="lg:text-xl md:text-sm sm:text-xs lg:tracking-normal md:tracking-tight">{movie.category}</div>
                
              </div>


            <div className='flex flex-row gap-2 items-center py-3 md:ml-3 sm:ml-0 rounded-[8px]'>

                {/* average rating */}
                <FaStar className='h-4 w-4 sm:w-3 sm:h-3  text-white' />
                <div className="lg:text-xl md:text-sm sm:text-xs tracking-normal md:tracking-tight">{movie.averagerating}/5</div>

                {/* total ratings */}
                <div className="lg:text-xl md:text-sm sm:text-xs lg:ml-10 sm:ml-5 tracking-normal md:tracking-tight">{reviews.length} votes</div>

                {/* add review button */}
                <div className='lg:ml-10 md:ml-5 lg:text-md md:text-sm sm:text-xs sm:ml-3'>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg focus:outline-none focus:shadow-outline
                        sm:py-[.35rem] md:px-6 sm:px-3">
                        Add Review
                    </button>
                  </div>
            </div>

            {/* movie language */}
            <div className="bg-white text-black md:px-4 sm:py-1 sm:px-3  md:ml-3 sm:ml-0 lg:text-lg md:text-sm sm:text-xs mb-2 tracking-wide">
              <strong>{movie.language}</strong>
            </div>

          </div>
        </div>
      </div>


      {/* Movie Description */}
      <div className='lg:px-10 sm:px-5  mt-10 flex flex-col gap-4'>

        <div className=" text-left text-white flex flex-col gap-5 common-container">
          <h1 className="lg:text-2xl sm:text-xl font-bold tracking-wider common-heading">Description:</h1>
          <p className="lg:text-lg sm:text-md mb-2">{movie.desc}</p>
        </div>

        {/* Casts */}
        <div className='py-10'>
          <CastSlider casts={movie.casts}/>
        </div>

        {/* Crew */}
        <div>
          <CastSlider casts={movie.casts} />
        </div>

        {/* For displaying the review form */}
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <ReviewForm onSubmit={handleReviewSubmit} />
        </Modal>

        {/* Reviews */}
        <div>
          <Reviews reviews={reviews}/>
        </div>

      </div>
    </div>
  );
};

export default SingleMovie;

