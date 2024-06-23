// src/components/AdminUsers.jsx
import React, { useState, useEffect } from "react";
import UserCard from "../../components/userCard";
import axiosInstance from "../../config/axiosInstance";

const APIURL = import.meta.env.VITE_API_URL;

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const GetAllUsers = async () => {
        try {
            const response = await axiosInstance.get(`${APIURL}/users`);
            setUsers(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetAllUsers();
    }, []);

    if (loading) {
        return <div className="text-5xl">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">All Users</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user) => (
                    <UserCard
                        key={user._id}
                        user={user}
                        //onDeleteClick={handleDeleteClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default AdminUsers;