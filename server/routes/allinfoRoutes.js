import express from "express";
import { admin, authenticate } from "../middlewares/auth.js";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Movie from "../models/movieModel.js";
import Show from "../models/showModel.js";
import Booking from "../models/bookingModel.js";

const router = express.Router();

// ***************** ADMIN ROUTES ***********************
router.get("/", authenticate, admin,
    asyncHandler(async (req, res) => {
        try {
            const totalUsers = await User.countDocuments({});
            const totalSubscribers = await User.countDocuments({
                isSubscriber: true,
            });
            const totalMovies = await Movie.countDocuments({});
            const totalShows = await Show.countDocuments({});
            const totalBookings = await Booking.countDocuments({});
            res.json({
                totalUsers: totalUsers,
                totalSubscribers: totalSubscribers,
                totalMovies: totalMovies,
                totalShows: totalShows,
                totalBookings: totalBookings,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    })
);

export default router;