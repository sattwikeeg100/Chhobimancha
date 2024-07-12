import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CustomSlick.css";
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
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };


    return (
        <div className=" mr-3">
            <div className="container max-w-screen md:max-w-[900px] mx-auto overflow-x-hidden h-40">
                <h1 className="text-2xl font-bold mb-4 text-white ">Admin Dashboard</h1>
                <div className=" w-full">
                <Slider {...settings} id="AdminDashboardSlider" className="mx-14 ">
                    <div className="bg-white p-4 rounded-lg shadow-md !w-60 lg:!mr-7 md:!mr-11 ">
                        <h2 className="text-lg font-semibold mb-2">Users</h2>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <p>Total Users: {allInfos.totalUsers}</p>
                        )}
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md !w-60">
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
                    <div className="bg-white p-4 rounded-lg shadow-md !w-60">
                        <h2 className="text-lg font-semibold mb-2">Movies</h2>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <p>Total Movies: {allInfos.totalMovies}</p>
                        )}
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md !w-60">
                        <h2 className="text-lg font-semibold mb-2">Shows</h2>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <p>Total Shows: {allInfos.totalShows}</p>
                        )}
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md !w-60">
                        <h2 className="text-lg font-semibold mb-2">
                            Show Bookings
                        </h2>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <p>Total Bookings: {allInfos.totalBookings}</p>
                        )}
                    </div>
                    </Slider>
                </div>
            </div>
            <div className=" w-[90%]  flex flex-col my-20 justify-around items-stretch flex-wrap">
                <div className="flex flex-row  flex-wrap justify-around items-stretch">
                    <div className="bg-background2 p-5 rounded-lg my-10">
                        <h2 className="text-white font-montserrat my-5">Total Revenue</h2>
                        <Pie data={pieData} className="bg-gray-950 " />
                    </div>
                    <div className="bg-background2 p-5 rounded-lg my-10">
                        <h2 className="text-white font-montserrat my-5">Overall Statistics</h2>
                        <Bar data={consolidatedData} className="bg-gray-950 "  />
                    </div>
                </div>
                <div className="flex flex-row gap-10 my-10 flex-wrap justify-around items-stretch">
                    <div className="bg-background2 p-5 rounded-lg my-10">
                        <h2 className="text-white font-montserrat my-5">Booking Revenue (Last 6 Months)</h2>
                        <Bar data={bookingData} className="bg-gray-950 "  />
                    </div>
                    <div className="bg-background2 p-5 rounded-lg my-10" >
                        <h2 className="text-white font-montserrat my-5">Subscription Revenue (Last 6 Months)</h2>
                        <Bar data={subscriptionData} className="bg-gray-950 "  />
                    </div>
                </div>
            </div>
            </div>
    );
};

export default AdminDashboard;
