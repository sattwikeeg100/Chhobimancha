import React, { useState, useEffect } from "react";
import "./style.scss";
import ShowCard from "../../components/showCard/showCard";
import toast from "react-hot-toast";
import axios from "axios";
const APIURL = import.meta.env.VITE_API_URL;

const AllShows = () => {
    const [showsLists, setShowsLists] = useState([]);
    const GetAllShows = async () => {
        try {
            const response = await axios.get(`${APIURL}/shows`);
            setShowsLists(response.data);
        } catch (error) {
            console.error(error);
            toast.error(error);
        }
    };
    useEffect(() => {
        GetAllShows();
    }, []);

    return (
        <div className="show-list">
            {showsLists.map((show) => (
                <ShowCard key={show._id} show={show} />
            ))}
        </div>
    );
};

export default AllShows;
