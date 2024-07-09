import crypto from "crypto";
import asyncHandler from "express-async-handler";
import { instance } from "../config/paymentGatewayConfig.js";
import Show from "../models/showModel.js";
import Booking from "../models/bookingModel.js";
import nodemailer from "nodemailer";

// ************************* Private CONTROLLERS *********************

export const checkout = asyncHandler(async (req, res) => {
    if (!req.body.amount) {
        res.status(400);
        throw new Error("Checkout amount required");
    }
    const options = {
        amount: Number(req.body.amount * 100),
        currency: "INR",
    };
    const order = await instance.orders.create(options);

    res.status(200).json({
        success: true,
        order,
    });
});

export const paymentVerification = asyncHandler(async (req, res) => {
    try {
        const { orderId, paymentId, signatureId, show, seats, totalAmount } =
            req.body;

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

            const bookedShow = await Show.findById(show);
            await Show.findByIdAndUpdate(show, {
                bookedSeats: [...bookedShow.bookedSeats, ...seats],
            });

            const showDetails = await Show.findById(show).populate("theatre");

            res.status(201).json({
                message: "Booking confirmed",
                booking: { show: showDetails, seats, totalAmount },
            });
        }
    } catch (err) {
        // console.error(err);
        throw new Error("Payment Verification Failed!");
    }
});

export const sendEmailWithPDF = async (req, res) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.TEAM_EMAIL_ADDRESS,
            pass: process.env.TEAM_EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: "showtime360.team@gmail.com",
        to: req.body.email,
        subject: "Your Booking Confirmation",
        text: `Dear ${req.body.name},

Thank you for booking with Showtime360! Your seats for the upcoming Bengali theatre play are confirmed. We can't wait to have you join us for an evening of captivating performances and unforgettable moments.

See you at the show!

Warm regards,
The Showtime360 Team`,
        attachments: [
            {
                filename: `${req.body.showTitle}-ticket.pdf`,
                content: req.body.pdfBlob,
                encoding: "base64",
            },
        ],
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully.");
        res.status(200).json(info);
    } catch (error) {
        // console.error("Error sending email:", error);
        throw new Error("Failed to send email");
    }
};

export const getAllBookings = asyncHandler(async (req, res) => {
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

    res.json(bookings);
});