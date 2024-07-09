// OAuthHandler.js
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { oauthLoginUser } from "../store/slices/userSlice";

const OAuthHandler = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");
        if (token) {
            localStorage.setItem("OAuthToken", token);
            dispatch(oauthLoginUser()).then(() => {
                navigate("/");
                window.location.reload();
            });
        }
    }, [dispatch, location, navigate]);

    return (
        <div class="fixed flex justify-center items-center top-0 left-0 w-full h-full bg-gray-opacity-50 z-50">
            <div class="bg-white p-4 rounded shadow-md">Redirecting...</div>
        </div>
    );
};

export default OAuthHandler;
