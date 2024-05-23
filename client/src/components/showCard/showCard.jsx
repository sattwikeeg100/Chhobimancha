import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

const ShowCard = ({ show }) => {
    return (
        <div className="show-card">
            <h2>
                <Link to={`/show/${show.slug}`}>{show.showtitle}</Link>
            </h2>
            <p>{show.desc}</p>

            <p>
                <strong>Theatre:</strong>{" "}
                {show.theatre ? show.theatre.theatreName : "Not Available"}
            </p>
            <p>
                <strong>Ticket Price:</strong> {show.ticketPrice}
            </p>
            <p>
                <strong>Timing:</strong> {show.time}
            </p>
            <p>
                <strong>Total Seats:</strong> {show.totalSeats}
            </p>
        </div>
    );
};


export default ShowCard;
