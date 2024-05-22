import mongoose from "mongoose";

const showSchema = new mongoose.Schema(
    {
        showtitle: {
            type: String,
            required: true,
        },
        showdesc: {
            type: String,
            required: true,
        },
        language: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        ticketPrice: {
            type: Number,
            required: true,
        },
        totalSeats: {
            type: Number,
            required: true,
        },
        bookedSeats: {
            type: Array,
            default: [],
        },
        theatre: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Theatres",
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Shows", showSchema);
