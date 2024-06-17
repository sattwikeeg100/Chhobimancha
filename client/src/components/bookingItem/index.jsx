// BookingItem.jsx
import React from "react";

const BookingItem = ({ booking }) => {
    const handleDownloadTicket = () => {
        // Implement ticket download logic here
        alert("Download ticket functionality to be implemented!");
    };

    return (
        <li className="bg-white shadow-md rounded-lg p-6">
            <p>
                <strong>Show Title:</strong> {booking.show.title}
            </p>
            <p>
                <strong>User Name:</strong> {booking.userId.name}
            </p>
            <p>
                <strong>User Email:</strong> {booking.userId.email}
            </p>
            <p>
                <strong>Show Date:</strong>{" "}
                {new Date(booking.show.date).toLocaleDateString()}
            </p>
            <p>
                <strong>Show Time:</strong> {booking.show.time}
            </p>
            <p>
                <strong>Theatre Name:</strong> {booking.show.theatre.name}
            </p>
            <p>
                <strong>Theatre Address:</strong> {booking.show.theatre.address}
            </p>
            <p>
                <strong>Booked Seats:</strong> {booking.seats.join(", ")}
            </p>
            <p>
                <strong>Total Amount:</strong> ${booking.totalAmount / 100}
            </p>
            <button
                onClick={handleDownloadTicket}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700">
                Download Ticket
            </button>
        </li>
    );
};

export default BookingItem;
