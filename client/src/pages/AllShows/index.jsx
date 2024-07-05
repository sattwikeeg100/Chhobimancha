import React, { useEffect, useState } from "react";
import ShowCard from "../../components/showCard";
import axios from "axios";
import SkeletonAllShow from "../../components/Skeletons/skeletonAllShow";

import { FaSearch } from "react-icons/fa";

const APIURL = import.meta.env.VITE_API_URL;

const AllShows = () => {
  const [shows, setShows] = useState([]);
  const [localLoading, setLocalLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const GetAllShows = async () => {
    try {
      const response = await axios.get(`${APIURL}/shows`);
      const shows = response.data;

      // Get the current date and time
      const currentDate = new Date();

      // Filter shows to only include those that are not past the current date and time
      const upcomingShows = shows.filter((show) => {
        // Split the time to get hours and minutes
        const [hours, minutes] = show.time.split(":");

        // Extract year, month, and day from ISO string date
        const [year, month, day] = show.date.split("T")[0].split("-");

        // Create a new Date object for the show date and time
        const showDateTime = new Date(year, month - 1, day, hours, minutes);
        return showDateTime >= currentDate;
      });

      // Set shows and update the loading state after a timeout
      setTimeout(() => {
        setShows(upcomingShows);
        setLocalLoading(false);
      }, 900); // 900ms timeout
    } catch (error) {
      console.error(error);
      setLocalLoading(false); // Ensure loading state is updated on error
    }
  };

  useEffect(() => {
    GetAllShows();
  }, []);

  if (localLoading) {
    return <SkeletonAllShow />;
  }

  return (
    <div className="justify-center items-center sm:px-10 bg-background1 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-5xl font-bold text-white py-4 font-montserrat">
          Natyo kola
        </h1>
        <div className="flex flex-row ">
          <FaSearch className="text-primary_text mr-3 mt-2 w-6 h-6" />
          <input
            type="text"
            placeholder="Search for movies....."
            className="text-primary_text bg-background2 px-4 py-2 rounded"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
        {shows.map((show, index) => (
          <div key={index}>
            <ShowCard show={show} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllShows;
