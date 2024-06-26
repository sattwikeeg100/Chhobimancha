import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import axiosInstance from "../../config/axiosInstance.js";

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const AdminDashboard = () => {
    const APIURL = import.meta.env.VITE_API_URL;
    const [allInfos, setAllInfos] = useState({});
    const [revenueData, setRevenueData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAllInfos = async () => {
        try {
            const response = await axiosInstance.get("/");
            setAllInfos(response.data);
        } catch (error) {
            console.error("Error fetching all infos:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRevenueData = async () => {
        try {
            const response = await axiosInstance.get("/revenue", {
                params: {
                    year: new Date().getFullYear(),
                },
            });
            setRevenueData(response.data);
        } catch (error) {
            console.error("Error fetching revenue data:", error);
        }
    };

    useEffect(() => {
        fetchAllInfos();
        fetchRevenueData();
    }, []);

    const bookingLabels = revenueData.map((item) => `Month ${item.month}`);
    const bookingRevenues = revenueData.map((item) => item.bookingRevenue);
    const subscriptionRevenues = revenueData.map(
        (item) => item.subscriptionRevenue
    );

    const bookingData = {
        labels: bookingLabels,
        datasets: [
            {
                label: "Booking Revenue",
                data: bookingRevenues,
                backgroundColor: ["rgba(75, 192, 192, 0.2)"],
                borderColor: ["rgba(75, 192, 192, 1)"],
                borderWidth: 1,
            },
        ],
    };

    const subscriptionData = {
        labels: bookingLabels,
        datasets: [
            {
                label: "Subscription Revenue",
                data: subscriptionRevenues,
                backgroundColor: ["rgba(153, 102, 255, 0.2)"],
                borderColor: ["rgba(153, 102, 255, 1)"],
                borderWidth: 1,
            },
        ],
    };

    const pieData = {
        labels: ["Booking Revenue", "Subscription Revenue"],
        datasets: [
            {
                data: [
                    bookingRevenues.reduce((a, b) => a + b, 0),
                    subscriptionRevenues.reduce((a, b) => a + b, 0),
                ],
                backgroundColor: [
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                ],
                borderColor: [
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const consolidatedData = {
        labels: ["Total Users", "Total Movies", "Total Shows"],
        datasets: [
            {
                label: "Statistics",
                data: [
                    allInfos.totalUsers || 0,
                    allInfos.totalMovies || 0,
                    allInfos.totalShows || 0,
                ],
                backgroundColor: [
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                ],
                borderColor: [
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
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
                        <h2 className="text-lg font-semibold mb-2">
                            Subscribers
                        </h2>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <p>
                                Total Subscribers: {allInfos.totalSubscribers}
                            </p>
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
            <div className="flex flex-col w-screen gap-10 mt-10 justify-center items-center">
                <div className="flex flex-row gap-10">
                    <div>
                        <h2>Total Revenue</h2>
                        <Pie data={pieData} />
                    </div>
                    <div>
                        <h2>Overall Statistics</h2>
                        <Bar data={consolidatedData} />
                    </div>
                </div>
                <div className="flex flex-row gap-10">
                    <div>
                        <h2>Booking Revenue (Last 6 Months)</h2>
                        <Bar data={bookingData} />
                    </div>
                    <div>
                        <h2>Subscription Revenue (Last 6 Months)</h2>
                        <Bar data={subscriptionData} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
