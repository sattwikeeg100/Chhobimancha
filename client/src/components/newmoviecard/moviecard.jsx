import React from "react";
import "./style.scss";

const MovieCard = ({ title, imageUrl, rating, year }) => {
    return (
        <div className="movie-card">
            <div
                className="movie-card__image"
                style={{ backgroundImage: `url(${imageUrl})` }}></div>
            <div className="movie-card__content">
                <h2 className="movie-card__title">{title}</h2>
                <div className="movie-card__info">
                    <span className="movie-card__year">{year}</span>
                    <span className="movie-card__rating">{rating}</span>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;