// BookingItem.jsx
import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from "/logo.jpg";

const BookingItem = ({ booking }) => {
    const handleDownloadTicket = () => {
        const doc = new jsPDF();

        // Add the logo
        const img = new Image();
        img.src = logo;

        img.onload = () => {
            doc.addImage(img, "PNG", 14, 10, 50, 20);

            // Set the title below the logo
            doc.setFontSize(18);
            doc.text("Ticket Details", 14, 40);

            // Add booking details
            const details = [
                ["Show Title", booking.show.title],
                ["User Name", booking.userId.name],
                ["User Email", booking.userId.email],
                ["Show Date", new Date(booking.show.date).toLocaleDateString()],
                ["Show Time", booking.show.time],
                ["Theatre Name", booking.show.theatre.name],
                ["Theatre Address", booking.show.theatre.address],
                ["Booked Seats", booking.seats.join(", ")],
                ["Total Amount", `$${(booking.totalAmount / 100).toFixed(2)}`],
            ];

            // Use autoTable to add the details in a table format
            doc.autoTable({
                startY: 50,
                head: [["Field", "Details"]],
                body: details,
                theme: "striped",
            });
            const pdfBase64 = doc.output("datauristring");
            console.log(pdfBase64);
            // Save the PDF
            doc.save(`${booking.show.title}-ticket.pdf`);
        };
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