import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        show: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Show",
            required: true,
        },
        seats: {
            type: Array,
            required: true,
        },
        transactionId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
