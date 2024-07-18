import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import axiosInstance from "../../config/axiosInstance";

const WatchMovie = () => {
    const { slug } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchMovie = async () => {
        try {
            const response = await axiosInstance.get(`/movies/${slug}`);
            setMovie(response.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch movie!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovie();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
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
};

export default WatchMovie;
