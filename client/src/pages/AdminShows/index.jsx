import React, { useState, useEffect } from "react";
import ShowAdminCard from "../../components/showAdminCard";
import ShowModal from "../../components/showModal";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "sonner";
import { FaSearch } from "react-icons/fa";
import Preloader from "../../components/PreLoader/PreLoader";

const AdminShows = () => {
  const [upcomingShows, setUpcomingShows] = useState([]);
  const [pastShows, setPastShows] = useState([]);
  const [filteredUpcomingShows, setFilteredUpcomingShows] = useState([]);
  const [filteredPastShows, setFilteredPastShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentShow, setCurrentShow] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const GetAllShows = async () => {
    try {
      const response = await axiosInstance.get(`/shows`);
      const shows = response.data;
      setLoading(true);
      const currentDate = new Date();

      const upcoming = [];
      const past = [];

      shows.forEach((show) => {
        const [hours, minutes] = show.time.split(":");
        const [year, month, day] = show.date.split("T")[0].split("-");

        const showDateTime = new Date(year, month - 1, day, hours, minutes);

        if (showDateTime >= currentDate) {
          upcoming.push(show);
        } else {
          past.push(show);
        }
      });

      upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
      past.sort((a, b) => new Date(b.date) - new Date(a.date));

      setUpcomingShows(upcoming);
      setPastShows(past);
      setFilteredUpcomingShows(upcoming);
      setFilteredPastShows(past);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    // finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    const fetchData = async () => {
      await GetAllShows();
      setTimeout(() => {
        setIsInitialLoad(false); // Set isInitialLoad to false after a minimum duration
      }, 1000); // Adjust the timeout duration as needed (e.g., 1000ms = 1 second)
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterShows();
  }, [searchQuery, upcomingShows, pastShows]);

  const filterShows = () => {
    if (!searchQuery) {
      setFilteredUpcomingShows(upcomingShows);
      setFilteredPastShows(pastShows);
      return;
    }

    const query = searchQuery.toLowerCase();

    const filteredUpcoming = upcomingShows.filter((show) =>
      show.title.toLowerCase().includes(query)
    );

    const filteredPast = pastShows.filter((show) =>
      show.title.toLowerCase().includes(query)
    );

    setFilteredUpcomingShows(filteredUpcoming);
    setFilteredPastShows(filteredPast);
  };

  const handleAddClick = () => {
    setCurrentShow(null);
    setModalOpen(true);
  };

  const handleEditClick = (show) => {
    setCurrentShow(show);
    setModalOpen(true);
  };

  const handleDeleteClick = async (show) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete the show?"
    );
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(
        `/upload/image/${show.poster.split("/").pop()}`
      );
      await axiosInstance.delete(`/shows/${show._id}`);
      toast.success("Show deleted successfully!");
      GetAllShows();
    } catch (error) {
      console.error("Error deleting show:", error);
      toast.error("Error deleting show!");
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    GetAllShows();
  };

  if (loading && isInitialLoad) {
    return <Preloader setLoading={setLoading} />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-semibold text-primary_text py-4 tracking-tighter font-playfair">
        Admin Show Management
      </h1>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-y-3 mb-4">
        <button
          className="bg-highlight hover:bg-highlight_hover text-primary_text font-medium font-ubuntu sm:text-base py-1 px-3 rounded"
          onClick={handleAddClick}
        >
          Add New Show
        </button>

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
      </div>
      <h3 className="text-lg sm:text-3xl font-montserrat  my-4 text-primary_text">
        Upcoming Shows
      </h3>
      {filteredUpcomingShows.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUpcomingShows.map((show) => (
            <ShowAdminCard
              key={show._id}
              show={show}
              onEditClick={handleEditClick}
              onDeleteClick={() => handleDeleteClick(show)}
            />
          ))}
        </div>
      ) : (
        <p className="text-secondary_text font-medium text-lg">
          No upcoming shows available
        </p>
      )}
      <h3 className="text-lg sm:text-3xl font-montserrat  my-4 text-primary_text">
        Past Shows
      </h3>

      {filteredPastShows.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPastShows.map((show) => (
            <ShowAdminCard
              key={show._id}
              show={show}
              onEditClick={handleEditClick}
              onDeleteClick={() => handleDeleteClick(show)}
            />
          ))}
        </div>
      ) : (
        <p className="text-secondary_text font-medium text-lg">
          No past shows available
        </p>
      )}

      {modalOpen && <ShowModal show={currentShow} onClose={handleModalClose} />}
    </div>
  );
};

export default AdminShows;
