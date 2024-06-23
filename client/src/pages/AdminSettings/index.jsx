// src/components/MyProfile.jsx
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../config/axiosInstance";
import ProfileModal from "../../components/profileModal";
import ProfileCard from "../../components/profileCard";

const APIURL = import.meta.env.VITE_API_URL;

const AdminProfileSettings = () => {
    //const [profile, setProfile] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const user = useSelector((state) => state.user.userInfo);

    const handleEditClick = () => {
        setModalOpen(true);
    };

    const handleDeleteClick = async () => {
        try {
            await axiosInstance.delete(`${APIURL}/users/${user._id}`);
            localStorage.removeItem("user");
            alert("Profile deleted successfully");
            window.location.reload();
        } catch (error) {
            console.error("Error deleting profile:", error);
        }
    };

    const handleModalClose = () => {
        setModalOpen(false);
        //fetchUserProfile(user);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">My Profile</h1>
            <ProfileCard
                profile={user}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteClick}
            />
            {modalOpen && (
                <ProfileModal profile={user} onClose={handleModalClose} />
            )}
        </div>
    );
};

export default AdminProfileSettings;