import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import axiosInstance from "../../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import Preloader from "../../components/PreLoader/PreLoader";
import { switchLoginModalOpen } from "../../store/slices/loginModalOpenSlice";

const WatchMovie = () => {
  const { slug } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const user = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchMovie = async () => {
    try {
      const response = await axiosInstance.get(`/movies/${slug}`);
      setMovie(response.data);
      setLoading(true);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch movie!");
      setLoading(false);
    }
    // finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchMovie();
      setTimeout(() => {
        setIsInitialLoad(false);
      }, 1000);
    };
    fetchData();
  }, []);

  if (loading && isInitialLoad) {
    return <Preloader setLoading={setLoading} />;
  }

  if (!user) {
    dispatch(switchLoginModalOpen(true));
    navigate(`/explore/movies/${slug}`);
  } else if (movie.isPremium && !user.isSubscriber) {
    navigate("/subscribe");
  } else {
    return (
      <div className="fixed bg-black inset-0 z-50">
        <ReactPlayer
          url={movie.video}
          className="absolute top-0 left-0"
          playing
          controls
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
    );
  }
};

export default WatchMovie;
