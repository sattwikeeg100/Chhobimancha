// MyBookings.jsx
import React, { useEffect, useState } from "react";
import BookingItem from "../../components/bookingItem";
import axiosInstance from "../../config/axiosInstance";

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const APIURL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axiosInstance.get(`${APIURL}/bookings`);
                setBookings(response.data.bookings);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    if (loading) return <p className="text-center mt-5">Loading...</p>;
    if (error)
        return <p className="text-center mt-5 text-red-500">Error: {error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 text-center">Bookings</h1>
            <ul className="space-y-4">
                {bookings.map((booking) => (
                    <BookingItem key={booking._id} booking={booking} />
                ))}
            </ul>
        </div>
    );
};

export default MyBookings;