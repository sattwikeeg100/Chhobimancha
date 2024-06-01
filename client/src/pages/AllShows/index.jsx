import React from "react";
import ShowCard from "../../components/showCard";
import { shows } from "./showDataDummy"; 

const AllShows = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">All Shows</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {shows.map((show, index) => (
                    <div key={index}>
                        <ShowCard show={show} />
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Book Now
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllShows;
