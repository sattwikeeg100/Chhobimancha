import crypto from "crypto";
import asyncHandler from "express-async-handler";
import { instance } from "../config/paymentGatewayConfig.js";
import Show from "../models/showModel.js";
import Booking from "../models/bookingModel.js";
import { request } from "http";

// ************************* Private CONTROLLERS *********************

export const checkout = asyncHandler(async (req, res) => {
    try {
        const options = {
            amount: Number(req.body.amount * 100),
            currency: "INR",
        };
        const order = await instance.orders.create(options);
        console.log(order);
        res.status(200).json({
            success: true,
            order,
        });
    } catch (err) {
        console.error(err);
    }
});

export const paymentVerification = asyncHandler(async (req, res) => {
    try {
        const {
            orderId,
            paymentId,
            signatureId,
            show,
            seats,
            totalAmount,
        } = req.body;

        const body = orderId + "|" + paymentId;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === signatureId;

        if (isAuthentic) {
            const newBooking = new Booking({
                userId: req.user._id,
                show,
                seats,
                orderId,
                paymentId,
                signatureId,
                totalAmount,
            });
            await newBooking.save();

            // update the list of booked seats for the show

            const bookedshow = await Show.findById(show);
            await Show.findByIdAndUpdate(show, {
                bookedSeats: [...bookedshow.bookedSeats, ...seats],
            });

            res.status(201).json({ message: "Booking confirmed" });
        } else {
            res.status(400).json({ message: "Invalid signature" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Payment Verification Failed!" });
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
            .populate("userId");

        res.status(201).json({ bookings });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
