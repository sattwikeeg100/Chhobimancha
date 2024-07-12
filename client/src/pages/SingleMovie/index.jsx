import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import CastSlider from "../../components/castSlider/index";
import ReviewForm from "../../components/movieReviewForm/index";
import Modal from "../../components/movieReviewModal";
import { BiRightArrow } from "react-icons/bi";
import { FaStar } from "react-icons/fa6";
import { LuDot } from "react-icons/lu";
import "./styles.css";
import Reviews from "../../components/Reviews";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "sonner";
import { switchLoginModalOpen } from "../../store/slices/loginModalOpenSlice";
import SkeletonSingleMovie from "../../components/Skeletons/skeletonSingleMovie/index.jsx";

const SingleMovie = () => {
  const [showModal, setShowModal] = useState(false); // State to control the modal visibility
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const navigate = useNavigate();
  const { slug } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [localLoading, setLocalLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.userInfo);

  const fetchMovie = async () => {
    try {
      const response = await axiosInstance.get(`/movies/${slug}`);
      setTimeout(() => {
        setMovie(response.data);
        setLocalLoading(false);
      }, 700);
      //   setMovie(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "An error occurred");
      setLocalLoading(false);
    }
    // } finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  //   if (loading) return <div>Loading...</div>;
  //   if (error) return <div>Error: {error}</div>;

  const handleReviewRequest = () => {
    if (user) setShowModal(true);
    else {
      dispatch(switchLoginModalOpen(true));
    }
  };

  //to add reviews and close the review form
  const handleReviewSubmit = async (review) => {
    try {
      await axiosInstance.post(`/movies/reviews/${movie._id}`, review);
      toast.success("Successfully added review");
    } catch (error) {
      console.error(error.message);
      toast.error("Error adding review!");
    } finally {
      setShowModal(false); // Close the modal after submitting the review
      fetchMovie();
    }
  };

  //for play now button
  const handleClick = (e) => {
    e.preventDefault();
    if (user?.isSubscriber) {
      if (movie.video) {
        setVideoModalOpen(true);
      } else {
        alert("Sorry, we don't have this movie available right now");
      }
    } else {
      navigate("/subscribe");
    }
  };

  if (localLoading) {
    return <SkeletonSingleMovie />;
  }

  return (
    <div className="bg-black">
      {videoModalOpen && (
        <div className="fixed bg-black inset-0 z-50">
          <ReactPlayer
            url={movie.video}
            className="absolute top-0 left-0"
            playing
            controls
            loop={true}
            width="100%"
            height="100%"
            config={{
              file: {
                attributes: { controlsList: "nodownload" },
              },
            }}
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      )}
      {!videoModalOpen && (
        <>
          {/* background image */}
          <div
            className="relative w-full bg-cover bg-center xl:h-[75vh] lg:h-[58vh] sm:h-[55vh] "
            style={{ backgroundImage: `url(${movie.coverImage})` }}
          >
            {/* shadow */}
            <div className="flex flex-row h-full bg-black bg-opacity-75 gap-5">
              {/* left side */}
              <div className=" h-auto lg:ml-24 md:ml-10 sm:ml-5 flex flex-col justify-center items-center xl:w-1/5 lg:w-1/4 md:w-1/5 sm:w-1/4">
                {/* poster image */}
                <img
                  src={movie.poster}
                  alt={`${movie.title} Poster`}
                  className="w-auto h-auto mb-2 mt-3 p-2 rounded-xl "
                />

                <div id="button-div">
                  {/* play now button */}
                  <button
                    id="button"
                    onClick={handleClick}
                    className="group rounded-lg mb-3 flex items-center space-x-0.5 bg-highlight hover:bg-highlight_hover lg:px-[4.5rem] lg:py-2 md:px-6 md:py-2 sm:px-10 sm:py-1"
                  >
                    <span className="font-semibold font-ubuntu text-white lg:text-lg md:text-md sm:text-sm">
                      Play Now
                    </span>

                    <div className="flex items-center translate-x-1 transition-all duration-300">
                      <BiRightArrow className=" text-white lg:w-6 lg:h-5 md:w-4 md:h-4 sm:w-3 sm:h-3" />
                    </div>
                  </button>
                </div>
              </div>

              {/* right side */}
              <div className="flex flex-col justify-center items-start text-white xl:w-2/5 lg:w-2/4 md:w-3/5 sm:w-2/4 lg:gap-5 md:gap-2 sm:gap-1">
                {/* movie name */}
                <div className=" tracking-normal text-left lg:text-4xl md:text-xl mb-6 md:mb-1 md:ml-3 sm:ml-1 font-montserrat">
                  <strong>{movie.title}</strong>
                </div>

                <div className="flex flex-row items-center">
                  {/* duration */}
                  <LuDot className="md:w-6 md:h-6 sm:w-3 sm:h-3" />
                  <div className="lg:text-xl md:text-sm sm:text-xs lg:tracking-normal md:tracking-tight lg:mr-3 md:mr-2 sm:mr-1 font-roboto">
                    {movie.duration} hr
                  </div>

                  {/* year of release */}
                  <LuDot className="md:w-6 md:h-6 sm:w-3 sm:h-3" />
                  <div className="lg:text-xl md:text-sm sm:text-xs lg:tracking-normal md:tracking-tight mr-3 font-roboto">
                    {moment(movie.releaseDate).year()}
                  </div>

                  {/* category */}
                  <LuDot className="md:w-6 md:h-6 sm:w-3 sm:h-3" />
                  <div className="lg:text-xl md:text-sm sm:text-xs lg:tracking-normal md:tracking-tight font-roboto">
                    {movie.genres.join(", ")}
                  </div>
                </div>

                <div className="flex flex-row gap-2 items-center py-3 md:ml-3 sm:ml-0 rounded-[8px]">
                  {/* average rating */}
                  <FaStar className="h-4 w-4 sm:w-3 sm:h-3  text-white" />
                  <div className="lg:text-xl md:text-sm sm:text-xs tracking-normal md:tracking-tight font-roboto">
                    {movie.averageRating}/5
                  </div>

                  {/* total ratings */}
                  <div className="lg:text-xl md:text-sm sm:text-xs lg:ml-10 sm:ml-5 tracking-normal md:tracking-tight font-roboto">
                    {movie.reviews.length} votes
                  </div>

                  {/* add review button */}
                  <div className="lg:ml-10 md:ml-5 lg:text-md md:text-sm sm:text-xs sm:ml-3">
                    <button
                      onClick={() => handleReviewRequest()}
                      className=" bg-highlight hover:bg-highlight_hover text-white font-semibold font-ubuntu rounded-lg focus:outline-none focus:shadow-outline
                        sm:py-[.35rem] md:px-6 sm:px-3"
                    >
                      Add Review
                    </button>
                  </div>
                </div>

                {/* movie language */}
                <div className="bg-white text-black md:px-4 sm:py-1 sm:px-3  md:ml-3 sm:ml-0 lg:text-lg md:text-sm sm:text-xs mb-2 tracking-wide font-roboto">
                  <strong>{movie.language}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Movie Description */}
          <div className="lg:px-10 sm:px-5  mt-10 flex flex-col gap-4">
            <div className=" text-left text-white flex flex-col gap-5 common-container">
              <h1 className="lg:text-2xl sm:text-xl font-bold font-montserrat tracking-wider common-heading px-10">
                Description:
              </h1>
              <p className="lg:text-lg sm:text-md mb-2 font-roboto px-10">
                {movie.description}
              </p>
            </div>

            {/* Casts */}
            <div className="">
              <CastSlider casts={movie.casts} who="casts" />
            </div>

            {/* Crew */}
            <div>
              <CastSlider casts={movie.crews} who="crews" />
            </div>

            {/* For displaying the review form */}
            <Modal show={showModal} onClose={() => setShowModal(false)}>
              <ReviewForm onSubmit={handleReviewSubmit} />
            </Modal>

            {/* Reviews */}
            <div>
              <Reviews reviews={movie.reviews} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleMovie;
