// src/components/MyProfile.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../config/axiosInstance";
import ProfileModal from "../../components/profileModal";
import ProfileCard from "../../components/profileCard";
import { logoutUser } from "../../store/slices/userSlice";
import { toast } from "sonner";

const AdminProfileSettings = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  const handleEditClick = () => {
    setModalOpen(true);
  };

  const handleDeleteClick = async () => {
    window.confirm("Are you sure you want to delete your account?");
    alert("Account once deleted cannot be recovered! Continue ?");

    try {
      await axiosInstance.delete(
        `/upload/image/${user.image.split("/").pop()}`
      );
      await axiosInstance.delete(`/users`);
      dispatch(logoutUser());
      toast.success("Profile deleted successfully");
      window.location.replace("/");
    } catch (error) {
      console.error("Error deleting profile:", error);
      toast.error("Error deleting profile!");
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-xl sm:text-4xl lg:text-5xl font-bold text-primary_text py-4 font-montserrat">
        My Profile
      </h1>
      <ProfileCard
        profile={user}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
      {modalOpen && <ProfileModal profile={user} onClose={handleModalClose} />}
    </div>
  );
};

export default AdminProfileSettings;
