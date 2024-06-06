// src/components/Settings.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileForm from "../../components/profileForm";

const APIURL = import.meta.env.VITE_API_URL;

const AdminProfileSettings = () => {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await axios.get(`${APIURL}/admin/profile`);
            setProfile(response.data);
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    const handleProfileUpdate = async (updatedProfile) => {
        try {
            await axios.put(`${APIURL}/admin/profile`, updatedProfile);
            setProfile(updatedProfile);
            alert("Profile updated successfully");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Settings</h1>
            <ProfileForm
                profile={profile}
                onProfileUpdate={handleProfileUpdate}
            />
        </div>
    );
};

export default AdminProfileSettings;