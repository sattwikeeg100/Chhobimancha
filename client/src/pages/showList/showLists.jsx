// ShowList.jsx
import React from "react";
import ShowCard from "../../components/showCard/showCard";
import shows from "./showsData"
import "./style.scss";

const ShowList = () => {
    return (
        <div className="show-list">
            {shows.map((show) => (
                <ShowCard key={show.id} show={show} />
            ))}
        </div>
    );
};

export default ShowList;
