import asyncHandler from "express-async-handler";
import Shows from "../models/showModel.js";
import Bookings from "../models/bookingModel.js";

// ************************* Private CONTROLLERS *********************

// @desc: Book a show
// @route: POST /api/bookings
// @access: Private

export const bookAShow = asyncHandler(async (req, res) => {
    try {
        // get the details from req.body
        const { show, seats, transactionId } = req.body;
        // create new booking from the request body
        const newBooking = new Bookings({
            show,
            user: req.user._id,
            seats,
            transactionId, // we will get from stripe
        });
        await newBooking.save();

        const bookedshow = await Shows.findById(req.body.show);
        // update the list of booked seats for the show
        await Shows.findByIdAndUpdate(req.body.show, {
            bookedSeats: [...bookedshow.bookedSeats, ...req.body.seats],
        });

        // send the response to the client and also send the booking details
        res.status(201).json({
            success: true,
            message: "Show booked successfully",
            data: newBooking,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});

// @desc: Get all bookings by user
// @route: GET /api/bookings
// @access: Private

export const getAllBookings = asyncHandler(async (req, res) => {
    try {
        const bookings = await Bookings.find({ user: req.user._id })
            .populate("show")
            .populate({
                path: "show",
                populate: {
                    path: "theatre",
                    model: "Theatres",
                },
            })
            .populate("user");

        res.status(201).json({ bookings });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
