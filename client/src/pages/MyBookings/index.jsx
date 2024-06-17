// MyBookings.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import BookingItem from "../../components/bookingItem";

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const APIURL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchBookings = async () => {
            const user = JSON.parse(localStorage.getItem("user"));
            try {
                const response = await axios.get(`${APIURL}/bookings`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
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