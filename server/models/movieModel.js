import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
    {
        userName: { type: String, required: true },
        userImage: { type: String, required: false },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const moviesSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            lowercase: true,
        },
        desc: {
            type: String,
            required: true,
        },
        titleImage: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        language: {
            type: String,
            required: true,
        },
        year: {
            type: String,
            required: true,
        },
        time: {
            type: Number,
            required: true,
        },
        video: {
            type: String,
            required: true,
        },
        averagerating: {
            type: Number,
            required: true,
            default: 0,
        },
        numberOfReviews: {
            type: Number,
            required: true,
            default: 0,
        },
        reviews: [reviewSchema],
        casts: [
            {
                name: { type: String, required: true },
                image: { type: String, required: true },
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Movie", moviesSchema);
