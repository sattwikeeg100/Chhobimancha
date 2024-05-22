import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
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
            required: [true, "Please enter your password"],
            minlength: [6, "Password must be at least 6 characters"],
        },
        image: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        likedMovies: [
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