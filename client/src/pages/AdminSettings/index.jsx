import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../config/axiosInstance";
import ProfileModal from "../../components/profileModal";
import ProfileCard from "../../components/profileCard";
import { logoutUser } from "../../store/slices/userSlice";
import Preloader from "../../components/PreLoader/PreLoader"; // Adjust path as needed
import { toast } from "sonner";

const AdminProfileSettings = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const user = useSelector((state) => state.user.userInfo);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating loading delay (replace with actual API calls)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Example: Fetch user profile data from API
        // Replace with your actual API call to fetch user data
        // const response = await axiosInstance.get('/user/profile');

        // Assuming API fetch is successful, update loading state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Error fetching profile!");
        setLoading(false); // Ensure loading state is set to false on error
      }
    };

    fetchData();
  }, []);

  const handleEditClick = () => {
    setModalOpen(true);
  };

  const handleDeleteClick = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      if (
        window.confirm("Account once deleted cannot be recovered! Continue ?")
      ) {
        try {
          // Example: Delete user's profile image
          await axiosInstance.delete(
            `/upload/image/${user.image.split("/").pop()}`
          );

          // Example: Delete user account
          await axiosInstance.delete(`/users`);

          // Example: Logout user (redux action)
          dispatch(logoutUser());

          // Example: Show success toast message
          toast.success("Profile deleted successfully");

          // Example: Redirect user to home page
          window.location.replace("/");
        } catch (error) {
          console.error("Error deleting profile:", error);
          toast.error("Error deleting profile!");
        }
      }
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  if (loading) {
    return <Preloader setLoading={setLoading} />; // Show preloader while loading is true
  }

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col items-center">
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
