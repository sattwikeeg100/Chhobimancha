import React, { useEffect, useState } from "react";
import ShowCard from "../../components/showCard";
import axios from "axios";

const APIURL = import.meta.env.VITE_API_URL;

const AllShows = () => {
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);

    const GetAllShows = async () => {
        try {
            const response = await axios.get(`${APIURL}/shows`);
            setShows(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetAllShows();
    }, []);

    if (loading) {
        return <div className="text-5xl">Loading...</div>;
    }
    
    return (
        <div className="justify-center items-center sm:mx-36">
            <h1 className="text-5xl font-bold my-4">All Shows</h1>
            <div className="grid grid-cols-1 max-w-7xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {shows.map((show, index) => (
                    <div key={index}>
                        <ShowCard show={show} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllShows;
