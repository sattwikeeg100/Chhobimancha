// src/components/VideoPlayer.jsx

import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoPlayer = ({ videoSource }) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const options = {
        autoplay: true,
        controls: true,
        sources: [
            {
                src: `${videoSource}`,
                type: "video/mp4",
            },
        ],
    };

    useEffect(() => {
        const videoElement = videoRef.current;

        if (videoElement && !playerRef.current) {
            playerRef.current = videojs(videoElement, options);
        }

        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, [options]);

    return (
        <div
            data-vjs-player
            className="fixed inset-0 z-50 bg-black flex items-center justify-center">
            <video
                ref={videoRef}
                className="video-js vjs-default-skin w-full h-full"
                controls
            />
        </div>
    );
};

export default VideoPlayer;