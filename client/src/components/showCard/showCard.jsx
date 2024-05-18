// ShowCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

const ShowCard = ({ show }) => {
    return (
        <div className="show-card">
            <h2>
                <Link to={`/show/slug`}>{show.title}</Link>
            </h2>
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
        </div>
    );
};

export default ShowCard;
