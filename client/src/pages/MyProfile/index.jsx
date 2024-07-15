// src/components/MyProfile.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../config/axiosInstance";
import ProfileModal from "../../components/profileModal";
import ProfileCard from "../../components/profileCard";
import { logoutUser } from "../../store/slices/userSlice";
import Preloader from "../../components/PreLoader/PreLoader";
import { toast } from "sonner";

const MyProfile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  const handleEditClick = () => {
    setModalOpen(true);
  };

  const handleDeleteClick = async () => {
    window.confirm("Are you sure you want to delete your account?");
    alert("Account once deleted cannot be recovered! Continue ?");

    try {
      if (user.image) {
        await axiosInstance.delete(
          `/upload/image/${user.image.split("/").pop()}`
        );
      }
      await axiosInstance.delete(`/users/`);
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

  useEffect(() => {
    try {
      setLoading(true);
    } catch (error) {
      setLoading(false);
      setIsInitialLoad(false);
    }
  }, []);

  if (loading) {
    return <Preloader setLoading={setLoading} />;
  }

  return (
    <div className="container mx-auto p-6 bg-background1 text-primary_text ">
      <h1 className="text-4xl font-montserrat font-bold mb-8 text-center">
        My Profile
      </h1>
      <div className="flex justify-center">
        <ProfileCard
          profile={user}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
      </div>
      {modalOpen && <ProfileModal profile={user} onClose={handleModalClose} />}
    </div>
  );
};

export default MyProfile;
