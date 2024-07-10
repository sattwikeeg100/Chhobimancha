// src/components/AdminUsers.jsx
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserCard from "../../components/userCard";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "sonner";

const AdminUsers = () => {
    const [AdminUsers, setAdminUsers] = useState([]);
    const [NonAdminUsers, setNonAdminUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const CurrUser = useSelector((state) => state.user.userInfo);
    const amOwner = CurrUser.isOwner;
    console.log(amOwner);

    const GetAllUsers = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/users`);
            const tempUserData = response.data;

            const admins = tempUserData.filter((user) => {
                return user.isAdmin && !user.isOwner
            })
            const non_admins = tempUserData.filter((user) => {
                return !user.isAdmin;
            });

            setAdminUsers(admins);
            setNonAdminUsers(non_admins);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetAllUsers();
    }, []);

    const handleAdminAuthorize = async (userId, userAdminStatus) => {
        if (!amOwner) return;
        try {
            const response = await axiosInstance.put(`/users/${userId}`, {
                isAdmin: !userAdminStatus,
            });
            toast.success("Admin authorization updated successfully");
            GetAllUsers();
        } catch (error) {
            console.error(error);
            toast.error("Error updating admin authorization");
        }
    };

    const handleDeleteClick = async(userId) => {
        if (!amOwner) return;
        try {
            const response = await axiosInstance.delete(`/users/${userId}`);
            toast.success("User deleted successfully");
            GetAllUsers();
        } catch (error) {
            console.error(error);
            toast.error("Error deleting user");
        }        
    }

    if (loading) {
        return <div className="text-5xl">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            {/* Admin Users */}
            {amOwner && (
                <>
                    <h1 className="text-2xl font-bold mb-4">All Admins</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {AdminUsers.map((user) => (
                            <UserCard
                                key={user._id}
                                user={user}
                                amOwner={amOwner}
                                onToggleAuthorizeAdmin={handleAdminAuthorize}
                                onDeleteClick={handleDeleteClick}
                            />
                        ))}
                    </div>
                </>
            )}
            {/* Non Admin Users */}
            <h1 className="text-2xl font-bold mb-4">All Users</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {NonAdminUsers.map((user) => (
                    <UserCard
                        key={user._id}
                        user={user}
                        amOwner={amOwner}
                        onToggleAuthorizeAdmin={handleAdminAuthorize}
                        onDeleteClick={handleDeleteClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default AdminUsers;