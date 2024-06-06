import React from "react";

const AdminDashboard = () => {
    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-2">Users</h2>
                    <p>Total Users: 100</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-2">Movies</h2>
                    <p>Total Movies: 50</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-2">Shows</h2>
                    <p>Total Shows: 20</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold mb-2">Settings</h2>
                    <p>Manage Admin Settings</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;