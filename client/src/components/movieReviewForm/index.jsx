import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading,setLoading]= useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    onSubmit({ rating, comment });
    setRating(0);
    setComment('');
    setLoading(false);
  };

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  return (
    <form onSubmit={handleSubmit} className=" mx-auto w-full max-w-2xl p-10 bg-shadow shadow-2xl rounded-lg m-10">
      <h2 className="text-xl font-semibold mb-4 text-secondary_text font-lato">How was the movie?</h2>

      <div className="flex flex-row items-center mb-8 gap-5 mx-auto justify-center">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={index < rating ? "text-red-600 cursor-pointer h-5 w-5" : "text-white cursor-pointer h-5 w-5"}
            
            onClick={() => handleStarClick(index)}
          />
        ))}
      </div>

      <div className="mb-8">
        <label className="block text-md font-semibold font-lato text-secondary_text mb-2" htmlFor="comment">
          Express more, write a review :
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="shadow-xl appearance border font-roboto rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          rows="4"
          placeholder="Write your review here..."
        ></textarea>
      </div>

      <div className="flex items-center justify-center">
        {loading ? <button
          className="bg-red-500 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline cursor-not-allowed"
        >
          Submitting...
        </button> : <button
          type="submit"
          className="bg-highlight hover:bg-highlight_hover text-white font-bold font-ubuntu py-2 px-8 rounded focus:outline-none focus:shadow-outline"
        >
          Submit Review
        </button>}
      </div>
    </form>
  );
};

export default ReviewForm;
