// MyBookings.jsx
import React, { useEffect, useState } from "react";
import BookingItem from "../../components/bookingItem";
import axiosInstance from "../../config/axiosInstance";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get(`/bookings`);
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading)
    return (
      <p className="text-center pt-5 bg-background1  text-primary_text min-h-screen">
        Loading...
      </p>
    );
  if (error)
    return (
      <p className="text-center bg-background1 pt-5 text-red-500">
        Error: {error}
      </p>
    );

  return (
    <div className="container mx-auto p-6 bg-background1 min-h-screen">
      <h1 className="text-4xl font-montserrat font-bold mb-8 text-center text-primary_text">
        My Bookings
      </h1>
      <ul className="space-y-8">
        {bookings.map((booking) => (
          <BookingItem key={booking._id} booking={booking} />
        ))}
      </ul>
    </div>
  );
};

export default MyBookings;
