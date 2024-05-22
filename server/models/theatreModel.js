import mongoose from "mongoose";

const theatreSchema = new mongoose.Schema(
    {
        theatreName: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        owner: {
            /* type: mongoose.Schema.Types.ObjectId,
            ref: "User", */
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Theatres", theatreSchema);
