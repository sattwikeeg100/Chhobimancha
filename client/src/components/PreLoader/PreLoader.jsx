import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/loader.json"; // Adjust the path as needed;

const PreLoader = ({ setLoading }) => {
  const [loadingStartTime] = useState(performance.now());
  const [loadingDuration, setLoadingDuration] = useState(0);

  useEffect(() => {
    const handleLoadingComplete = () => {
      const duration = performance.now() - loadingStartTime;
      setLoadingDuration(duration);

      // Wait for the animation to complete
      setTimeout(() => {
        setLoading(false);
      }, duration);
    };

    // Wait for the window to fully load
    window.addEventListener("load", handleLoadingComplete);

    // Cleanup the event listener
    return () => window.removeEventListener("load", handleLoadingComplete);
  }, [loadingStartTime, setLoading]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen min-w-2xl bg-background1">
      <div className="flex items-center justify-center w-full h-full">
        <Lottie options={defaultOptions} height={200} width={200} />
      </div>
    </div>
  );
};

export default PreLoader;
