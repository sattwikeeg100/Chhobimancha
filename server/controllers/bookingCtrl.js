import asyncHandler from "express-async-handler";
import Show from "../models/showModel.js";
import Booking from "../models/bookingModel.js";

// ************************* Private CONTROLLERS *********************

// Book a show

export const bookAShow = asyncHandler(async (req, res) => {
    try {
        // get the details from req.body
        const { show, seats, transactionId } = req.body;
        // create new booking from the request body
        const newBooking = new Booking({
            userId: req.user._id,
            show,
            seats,
            transactionId, // we will get from stripe
        });
        await newBooking.save();

        const bookedshow = await Show.findById(req.body.show);
        // update the list of booked seats for the show
        await Show.findByIdAndUpdate(req.body.show, {
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

// Get all bookings by user

export const getAllBookings = asyncHandler(async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user._id })
            .populate("show")
            .populate({
                path: "show",
                populate: {
                    path: "theatre",
                    model: "Theatre",
                },
            })
            .populate("user");

        res.status(201).json({ bookings });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
