import React, { useEffect, useState } from "react";
import BookingItem from "../../components/bookingItem";
import axiosInstance from "../../config/axiosInstance";
import Preloader from "../../components/PreLoader/PreLoader";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get("/bookings");
        const sortedBookings = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setBookings(sortedBookings);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    // Simulate loading for 2 seconds (adjust as needed)
    const loadingTimeout = setTimeout(() => {
      fetchBookings();
    }, 1000);

    return () => clearTimeout(loadingTimeout); // Cleanup timeout on unmount
  }, []);

  if (loading) {
    // Show preloader for 2 seconds (adjust as needed)
    return <Preloader setLoading={setLoading} timeout={1000} />;
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 bg-background1 min-h-screen min-w-screen">
        <p className="text-center text-red-500">{`Error: ${error}`}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-background1 min-h-screen min-w-screen">
      <h1 className="text-4xl font-montserrat font-bold mb-8 text-center text-primary_text">
        My Bookings
      </h1>
      {bookings.length > 0 ? (
        <ul className="space-y-8">
          {bookings.map((booking) => (
            <BookingItem key={booking._id} booking={booking} />
          ))}
        </ul>
      ) : (
        <p className="text-center text-primary_text">
          Book a show to get the ticket
        </p>
      )}
    </div>
  );
};

export default MyBookings;
