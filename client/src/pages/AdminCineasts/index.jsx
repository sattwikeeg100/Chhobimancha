import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosInstance.js";
import CineastAdminCard from "../../components/cineastAdminCard";
import CineastModal from "../../components/cineastModal";
import Preloader from "../../components/PreLoader/PreLoader.jsx";
import { toast } from "sonner";

import { FaSearch } from "react-icons/fa";
import GoToTop from "../../components/goToTopButton/index.jsx";

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

  const filteredCineasts = cineasts
    .filter((cineast) => {
      const cineastName = cineast.name.toLowerCase();
      const searchQueryLowercase = searchQuery.toLowerCase();
      return cineastName.includes(searchQueryLowercase);
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  if (loading && isInitialLoad) {
    return <Preloader setLoading={setLoading} />;
  }

  return (
    <div className="container min-h-screen">
      <h1 className="text-4xl font-semibold text-primary_text pb-4 sm:pt-4 tracking-tighter font-playfair">
        Admin Cineast Management
      </h1>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-y-3 mb-4">
        <button
          className="bg-highlight hover:bg-highlight_hover text-primary_text font-medium font-ubuntu sm:text-base py-2 px-4 rounded"
          onClick={handleAddClick}
        >
          Add New Cineast
        </button>

        <div className="relative w-full sm:w-fit flex items-center">
          <input
            type="text"
            placeholder="Search for cineasts..."
            className="w-full text-primary_text bg-shadow rounded-lg focus:outline-none focus:border focus:border-highlight 
            
            text-base sm:text-base 
            pl-10 sm:pl-10  
            py-2
            sm:px-4"
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
      <GoToTop />
    </div>
  );
};

export default AdminCineasts;
