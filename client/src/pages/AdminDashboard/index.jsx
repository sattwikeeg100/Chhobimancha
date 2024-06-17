import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance.js";

const AdminDashboard = () => {
    const APIURL = import.meta.env.VITE_API_URL;
    const [allInfos, setAllInfos] = useState({});
    const [loading, setLoading] = useState(true);
    const fetchAllInfos = async () => {
        const response = await axiosInstance.get("/");
        setAllInfos(response.data);
        setLoading(false);
    };
    useEffect(() => {
        fetchAllInfos();
    }, []);

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-2">Users</h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <p>Total Users: {allInfos.totalUsers}</p>
                    )}
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-2">Subscribers</h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <p>Total Users: {allInfos.totalSubscribers}</p>
                    )}
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-2">Movies</h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <p>Total Movies: {allInfos.totalMovies}</p>
                    )}
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-2">Shows</h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <p>Total Shows: {allInfos.totalShows}</p>
                    )}
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-2">
                        Show Bookings
                    </h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <p>Total Bookings: {allInfos.totalBookings}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
