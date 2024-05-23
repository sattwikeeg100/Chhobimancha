import React from "react";

import "./style.scss";

import HeroBanner from "./heroBanner/HeroBanner";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";

const Home = () => {
    return (
        <div className="homePage">
            <HeroBanner />
            <TopRated />
        </div>
    );
};

export default Home;
