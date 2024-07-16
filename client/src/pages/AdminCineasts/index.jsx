import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosInstance.js";
import CineastAdminCard from "../../components/cineastAdminCard";
import CineastModal from "../../components/cineastModal";
import Preloader from "../../components/PreLoader/PreLoader.jsx";
import { toast } from "sonner";

import { FaSearch } from "react-icons/fa";

const AdminCineasts = () => {
  const [cineasts, setCineasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentCineast, setCurrentCineast] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const GetAllCineasts = async () => {
    try {
      const response = await axiosInstance.get("/cineasts");
      setCineasts(response.data);
      setLoading(true);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
    // finally {

    // }
  };

  useEffect(() => {
    const fetchData = async () => {
      await GetAllCineasts();
      setTimeout(() => {
        setIsInitialLoad(false); // Set isInitialLoad to false after a minimum duration
      }, 1000); // Adjust the timeout duration as needed (e.g., 1000ms = 1 second)
    };

    fetchData();
  }, []);

  const handleAddClick = () => {
    setCurrentCineast(null);
    setModalOpen(true);
  };

  const handleEditClick = (cineast) => {
    setCurrentCineast(cineast);
    setModalOpen(true);
  };

  const handleDeleteClick = async (cineast) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete the cineast ?"
    );
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(
        `/upload/image/${cineast.image.split("/").pop()}`
      );
      await axiosInstance.delete(`/cineasts/${cineast._id}`);
      toast.success("Cineast deleted successfully!");
      GetAllCineasts();
    } catch (error) {
      console.error("Error deleting cineast:", error);
      toast.error("Error deleting cineast!");
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    GetAllCineasts();
  };

  const filteredCineasts = cineasts.filter((cineast) => {
    const cineastName = cineast.name.toLowerCase();
    const searchQueryLowercase = searchQuery.toLowerCase();
    return cineastName.includes(searchQueryLowercase);
  });

  if (loading && isInitialLoad) {
    return <Preloader setLoading={setLoading} />;
  }

  return (
    <div className="container  mx-auto p-4 min-h-screen">
      <h1 className="text-xl sm:text-4xl lg:text-5xl font-bold text-primary_text py-4 font-montserrat">
        Admin Cineast Management
      </h1>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-y-3 mb-4">
        <button
          className="bg-highlight hover:bg-highlight_hover text-primary_text font-bold sm:text-xl  py-2 px-4 rounded "
          onClick={handleAddClick}
        >
          Add New Cineast
        </button>

        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search for cineasts..."
            className="text-primary_text bg-shadow rounded-lg focus:outline-none focus:border focus:border-highlight px-4 py-2 text-xs sm:text-base pl-10 sm:pl-10  px-0 sm:px-4 "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute left-3 text-primary_text w-4 h-4" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredCineasts.map((cineast) => (
          <CineastAdminCard
            key={cineast._id}
            cineast={cineast}
            onEditClick={handleEditClick}
            onDeleteClick={() => handleDeleteClick(cineast)}
          />
        ))}
      </div>
      {modalOpen && (
        <CineastModal cineast={currentCineast} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default AdminCineasts;
