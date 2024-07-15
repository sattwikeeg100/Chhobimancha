// src/components/PlayFillLoader.jsx
import React, { useEffect } from "react";
import "./PreLoader.css";

const Preloader = ({ setLoading }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Preloader will disappear after 1.5 seconds

    return () => clearTimeout(timer);
  }, [setLoading]);
  return (
    <div className="play-fill-loader">
      <div className="loader-container">
        <svg className="loader-svg" viewBox="0 0 100 100">
          <circle className="loader-circle" cx="50" cy="50" r="45" />
        </svg>
        <div className="triangle"></div>
      </div>
    </div>
  );
};

export default Preloader;
