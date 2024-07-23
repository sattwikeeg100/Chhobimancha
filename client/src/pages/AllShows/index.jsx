import React, { useEffect, useState } from "react";
import ShowCard from "../../components/showCard";
import axios from "axios";
import SkeletonAllShow from "../../components/Skeletons/skeletonAllShow";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";
import { MdArrowDownward } from "react-icons/md";
import GoToTop from "../../components/goToTopButton";
import axiosInstance from "../../config/axiosInstance";

const AllShows = () => {
  const [shows, setShows] = useState([]);
  const [localLoading, setLocalLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({ date: "", time: "", address: "" });
  const [visibleCount, setVisibleCount] = useState(8); // Number of shows to display initially

  const GetAllShows = async () => {
    try {
      const response = await axiosInstance.get("/shows");
      const shows = response.data;

      const currentDate = new Date();

      // Filter shows to only include those that are not past the current date and time
      const upcomingShows = shows.filter((show) => {
        const [hours, minutes] = show.time.split(":");
        const [year, month, day] = show.date.split("T")[0].split("-");

        const showDateTime = new Date(year, month - 1, day, hours, minutes);
        return showDateTime >= currentDate;
      });

      // Set shows and update the loading state after a timeout
      setTimeout(() => {
        setShows(upcomingShows);
        setLocalLoading(false);
      }, 700); // 700ms timeout
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

  shows.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Filter shows based on the search query and filters
  const filteredShows = shows.filter((show) => {
    const matchesSearch = show.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDate = filters.date ? show.date.includes(filters.date) : true;
    const matchesTime = filters.time ? show.time.includes(filters.time) : true;

    return matchesSearch && matchesDate && matchesTime;
  });

  const handleApplyFilters = () => {
    setFilterModalOpen(false);
  };

  const handleResetFilters = () => {
    setFilters({ date: "", time: "", address: "" });
  };

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8); // Load 8 more shows
  };

  return (
    <div className="justify-center items-center px-5  pb-5 sm:px-10 bg-background1 min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-4xl text-primary_text py-4 font-semibold font-playfair tracking-tighter">
          Theatre Shows
        </h1>
        <div className="flex items-center justify-center gap-x-4">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search for shows..."
              className="text-primary_text bg-shadow rounded-lg focus:outline-none focus:border focus:border-highlight py-1 text-xs sm:text-base pl-10 sm:pl-10 mx-1 sm:px-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-3 text-primary_text w-4 h-4" />
          </div>
          <div>
            <FaFilter
              className="text-primary_text cursor-pointer w-4 h-4 sm:w-5 sm:h-5"
              onClick={() => setFilterModalOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Filter Modal */}

      {filterModalOpen && (
        <div className="fixed inset-0 bg-background1 bg-opacity-50 flex items-center justify-center">
          <div className="bg-background2 sm:w-[40%] xl:w-[30%] p-6 rounded-lg relative">
            <FaTimes
              className="absolute top-2 right-2 text-highlight hover:text-highlight_hover text-xl sm:text-2xl cursor-pointer"
              onClick={() => setFilterModalOpen(false)}
            />
            <h2 className="text-2xl lg:text-3xl text-primary_text font-bold mb-4 font-montserrat">
              Filter Shows
            </h2>

            <div className="mb-4">
              <label className="block text-secondary_text font-lato">
                Date
              </label>
              <input
                type="date"
                className="px-4 gap-x-3 w-full py-2 border border-primary_text text-primary_text bg-shadow rounded-lg focus:outline-none focus:border focus:border-highlight"
                value={filters.date}
                onChange={(e) =>
                  setFilters({ ...filters, date: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-secondary_text font-lato">
                Time
              </label>
              <input
                type="time"
                className="px-4 gap-x-3 w-full py-2 border border-primary_text text-primary_text bg-shadow rounded-lg focus:outline-none focus:border focus:border-highlight"
                value={filters.time}
                onChange={(e) =>
                  setFilters({ ...filters, time: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-x-4">
              <button
                className="bg-highlight_hover hover:bg-highlight text-primary_text font-bold py-2 px-4 rounded-lg"
                onClick={handleResetFilters}
              >
                Reset
              </button>
              <button
                className="bg-highlight hover:bg-highlight_hover text-primary_text font-bold py-2 px-4 rounded-lg"
                onClick={handleApplyFilters}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredShows.slice(0, visibleCount).map((show, index) => (
          <div key={index}>
            <ShowCard show={show} />
          </div>
        ))}
      </div>

      {filteredShows.length > visibleCount && (
        <div className="flex justify-center pt-5">
          <button
            onClick={handleLoadMore}
            className="bg-highlight hover:bg-highlight_hover text-primary_text font-bold py-2 px-4 rounded-md flex flex-row"
          >
            Load More
            <MdArrowDownward className="w-6 h-6 text-primary_text ml-1 font-semibold" />
          </button>
        </div>
      )}

      {/* <GoToTop /> */}
    </div>
  );
};

export default AllShows;
