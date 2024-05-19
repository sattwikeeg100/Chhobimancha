import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";

import useFetch from "../../../hooks/useFetch";

import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { data, loading } = useFetch("/movie/upcoming");

    useEffect(() => {
        /* const bg =
            url.backdrop +
            data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path; */
        const bg = "";
        setBackground(bg);
    }, [data]);

    return (
        <div className="heroBanner">
            {!loading && (
                <div className="backdrop-img">
                    <Img src={background} />
                </div>
            )}

            <div className="opacity-layer">
                <ContentWrapper>
                    <div className="heroBannerContent">
                        <span className="title">Welcome to Showtime360!</span>
                        <span className="subTitle">
                            Millions of movies, TV shows and people to discover.
                            Explore now.
                        </span>
                    </div>
                    <div className="Navigatelinks">
                        <button onClick={() => navigate("/explore/movies")}>
                            Explore Movies
                        </button>
                        <button onClick={() => navigate("/shows")}>
                            Book for shows
                        </button>
                    </div>
                </ContentWrapper>
            </div>
        </div>
    );
};

export default HeroBanner;
