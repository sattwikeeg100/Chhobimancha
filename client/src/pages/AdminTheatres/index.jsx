// src/components/AdminTheatres.jsx
import React, { useState, useEffect } from "react";
import TheatreAdminCard from "../../components/theatreAdminCard";
import TheatreModal from "../../components/theatreModal";
import axiosInstance from "../../config/axiosInstance";
import Preloader from "../../components/PreLoader/PreLoader";
import { toast } from "sonner";

import { FaSearch } from "react-icons/fa";

const AdminTheatres = () => {
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTheatre, setCurrentTheatre] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const GetAllTheatres = async () => {
    try {
      const response = await axiosInstance.get(`/theatres`);
      setTheatres(response.data);
      setLoading(true);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setIsInitialLoad(false);
    }
    // finally {
    //   setLoading(false);
    //
    // }
  };

  useEffect(() => {
    GetAllTheatres();
  }, []);

  const handleAddClick = () => {
    setCurrentTheatre(null);
    setModalOpen(true);
  };

  const handleEditClick = (theatre) => {
    setCurrentTheatre(theatre);
    setModalOpen(true);
  };

  const handleDeleteClick = async (theatre) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete the theatre?"
    );
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(
        `/upload/image/${theatre.image.split("/").pop()}`
      );
      await axiosInstance.delete(`/theatres/${theatre._id}`);
      toast.success("Theatre deleted successfully!");
      GetAllTheatres();
    } catch (error) {
      console.error("Error deleting theatre:", error);
      toast.error("Error deleting theatre!");
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    GetAllTheatres();
  };

  const filteredTheatres = theatres.filter((theatre) => {
    const theatreName = theatre.name.toLowerCase();
    const searchQueryLowercase = searchQuery.toLowerCase();
    return theatreName.includes(searchQueryLowercase);
  });

  if (loading) {
    return <Preloader setLoading={setLoading} />;
  }

  return (
    <div className="container mx-auto p-0 sm:p-4 min-h-screen">
      <h1 className=" text-xl sm:text-4xl lg:text-5xl font-bold text-primary_text py-4 font-montserrat">
        Admin Theatre Management
      </h1>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-y-3 mb-4">
        <button
          className="bg-highlight hover:bg-highlight_hover text-primary_text font-bold sm:text-xl  py-2 px-4 rounded "
          onClick={handleAddClick}
        >
          Add New Theatres
        </button>

        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search for theatres..."
            className="text-primary_text bg-shadow rounded-lg focus:outline-none focus:border focus:border-highlight px-4 py-2 text-xs sm:text-base pl-10 sm:pl-10  sm:px-4 "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute left-3 text-primary_text w-4 h-4" />
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2  gap-4">
        {filteredTheatres.map((theatre) => (
          <TheatreAdminCard
            key={theatre._id}
            theatre={theatre}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />
        ))}
      </div>
      {modalOpen && (
        <TheatreModal theatre={currentTheatre} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default AdminTheatres;
