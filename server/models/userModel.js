import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your full name"],
        },
        email: {
            type: String,
            required: [true, "Please enter your email"],
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            minlength: [6, "Password must be at least 6 characters"],
        },
        googleId: {
            type: String,
            unique: true,
        },
        resetPasswordCode: { type: String },
        resetPasswordExpires: { type: Date },
        image: {
            type: String,
        },
        isOwner: {
            type: Boolean,
            required: true,
            default: false,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        isSubscriber: {
            type: Boolean,
            default: false,
        },
        subscriptionId: {
            type: String,
            default: "",
        },
        subscriptionStart: {
            type: Date,
        },
        subscriptionEnd: {
            type: Date,
        },
        favoriteMovies: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "Movie",
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);