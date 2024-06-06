import React, { useState } from 'react';
import CastSlider from '../../components/castSlider/index'
import ReviewForm from '../../components/movieReviewForm/index'; 
import { BiRightArrow } from "react-icons/bi";
import { FaStar } from "react-icons/fa6";
import { LuDot } from "react-icons/lu";
import './styles.css'; 

const SingleMovie = () => {
  const [reviews, setReviews] = useState([]); // State to store reviews

  const movie = {
    "_id": "664d5bbfb6c3bb004d8cd020",
    "userId": "664d4cef626eabc378610af1",
    "name": "Eta Amader Golpo",
    "desc": "Two mature individuals from disparately different regions of India meet in a laughing class and fall in love. Will their families be able to ascribe to their contrasting cultures?",
    "titleImage": "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-250,h-390/et00394855-xcwqkafasa-portrait.jpg",
    "image": "https://assets-in.bmscdn.com/discovery-catalog/events/et00394855-ftkukbxcsf-landscape.jpg",
    "category": "Drama, Romantic",
    "language": "Bengali",
    "year": "2024",
    "time": 2.2,
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

  const handleReviewSubmit = (review) => {
    setReviews([...reviews, review]); // Update the reviews state with the new review
    movie.numberOfReviews++;
  };

  const handleClick = (e) => {
    e.preventDefault();
    alert("Sorry, we don't have this movie available right now ");
  };

  return (
    <div className='bg-black'>

      <div className=" relative xl:h-[75vh] lg:h-[60vh] w-full bg-cover bg-center" style={{ backgroundImage: `url(${movie.image})` }}>

        <div className="flex flex-row h-full bg-black bg-opacity-80 gap-5">

            <div className="lg:w-1/5 h-auto ml-24  flex flex-col justify-center items-center">

                <img src={movie.titleImage} alt={`${movie.name} Poster`} className="w-auto h-auto mb-2 mt-3 p-2 rounded-lg " />

                        <div id="button-div">
                            <button id="button" onClick={handleClick} className='group rounded-lg mb-3 px-[4.5rem] py-2 flex items-center space-x-0.5 bg-red-600 hover:bg-red-800 '>
                                <span className='text-lg font-semibold text-white'>Play Now</span>
                                <div className='flex items-center translate-x-1 transition-all duration-300'>
                                    <BiRightArrow className='w-6 h-5 text-white' />
                                </div>
                            </button>
                        </div>

            </div>

            <div className="lg:w-2/5 flex flex-col justify-center items-start gap-5 text-white">
              <div className="text-4xl mb-6 ml-3 tracking-normal"><strong>{movie.name}</strong></div>

              <div className='flex flex-row items-center'>
                  <LuDot className='w-6 h-6'/>
                  <div className="text-xl tracking-normal mr-3">{movie.time} hours</div>
                  <LuDot className='w-6 h-10'/>
                  <div className="text-xl tracking-normal mr-3">{movie.year}</div>
                  <LuDot className='w-6 h-10'/>
                  <div className="text-xl tracking-normal">{movie.category}</div>
              </div>

              <div className='flex flex-row gap-2 items-center py-3 ml-3 rounded-[8px]'>
                <FaStar className='h-4 w-4 text-white'/>
                <div className="text-xl tracking-normal">{movie.averagerating}/5</div>
                <div className="text-xl ml-10 tracking-normal">{reviews.length} votes</div>
              </div>

              <div className="bg-white text-black px-4 py-1 ml-3 text-lg mb-2 tracking-wide">
                <strong>{movie.language}</strong>
              </div>
            </div>


        </div>

      </div>

      {/* Movie Description */}
      <div className='px-10 mt-10 flex flex-col gap-4'>

        <div className="px-20 py-5 text-left text-white flex flex-col gap-5">
          <h1 className="text-2xl font-bold tracking-wider">Description:</h1>
          <p className="text-lg mb-2">{movie.desc}</p>
        </div>

        <div className='py-10'>
          <CastSlider casts={movie.casts}/>
        </div>

        <div>
          <CastSlider casts={movie.casts}/>
        </div>

        {/* Review Form */}
        <ReviewForm onSubmit={handleReviewSubmit} />

        {/* Display Reviews */}
        <div className=" text-left text-white flex flex-col gap-5">
          <h2 className="text-2xl font-bold tracking-wider">Reviews:</h2>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="mb-4">
                <div className="text-lg font-bold">Rating: {review.rating}</div>
                <div className="text-lg">{review.comment}</div>
              </div>
            ))
          ) : (
            <p className="text-lg">No reviews yet.</p>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default SingleMovie;
