// ShowDetails.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SeatingChart from "../../components/seatingChart/seatingChart";
import "./style.scss";

const ShowDetails = ({ shows }) => {
    const { slug } = useParams();
    //const show = shows.find((s) => s.slug === slug);

    const show = {
        title: "Othello",
        description: "A romantic drama by William Shakespearew",
        theatre: "Nandan",
        address: "Kolkata",
        timing: "6:30 PM",
    }
    const handleBooking = (selectedSeats) => {
        // Implement booking logic with Stripe here
        console.log("booking done");
    };

    return (
        <div className="show-details">
            <h1>{show.title}</h1>
            <p>{show.description}</p>
            <p>
                <strong>Theatre:</strong> {show.theatre}
            </p>
            <p>
                <strong>Address:</strong> {show.address}
            </p>
            <p>
                <strong>Timing:</strong> {show.timing}
            </p>
            <SeatingChart onBooking={handleBooking} />
        </div>
    );
};

export default ShowDetails;
