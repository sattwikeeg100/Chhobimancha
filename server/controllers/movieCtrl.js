import asyncHandler from "express-async-handler";
import Movie from "../models/movieModel.js";
import slugify from "slugify";
import mongoose from "mongoose";

// ************************* PUBLIC CONTROLLERS *********************

export const getAllMovies = asyncHandler(async (req, res) => {
    const movies = await Movie.find({})
        .populate("casts.person")
        .populate("crews.person");

    res.json(movies);
});

export const getMovieBySlugId = asyncHandler(async (req, res) => {
    const slug = req.params.slug;
    const movie = await Movie.findOne({ slug: slug })
        .populate({
            path: "reviews.user",
            select: "image",
            match: { _id: { $ne: null } },
        })
        .populate("casts.person")
        .populate("crews.person");

    if (movie) {
        res.json(movie);
    } else {
        res.status(404);
        throw new Error("Movie not found");
    }
});

// ************************* PRIVATE CONTROLLERS *********************

export const createMovieReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const movie = await Movie.findById(req.params.id);

    if (movie) {
        // check if the user already reviewed the movie
        const alreadyReviewed = movie.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            res.status(400);
            throw new Error("You already reviewed the movie");
        }

        const review = {
            user: req.user._id,
            userName: req.user.name,
            rating: Number(rating),
            comment,
        };

        movie.reviews.push(review);
        movie.numberOfReviews = movie.reviews.length;
        movie.averageRating =
            movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
            movie.reviews.length;

        try {
            await movie.save();
            res.status(201).json({
                message: "Review added successfully",
            });
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    } else {
        res.status(404);
        throw new Error("Movie not found");
    }
});

// ************************* ADMIN CONTROLLERS *********************

export const createMovie = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        coverImage,
        poster,
        genres,
        language,
        releaseDate,
        duration,
        video,
        casts,
        crews,
    } = req.body;
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-GB").replace(/\//g, "");
    };
    const slug = slugify(`${title}-${formatDate(releaseDate)}`, {
        remove: /[*+/~.()'"!:@]/g,
    }).toLowerCase();

    const movie = new Movie({
        userId: req.user._id,
        title,
        slug,
        description,
        coverImage,
        poster,
        genres,
        language,
        releaseDate,
        duration,
        video,
        casts,
        crews,
    });
    try {
        if (movie) {
            const createdMovie = await movie.save();
            res.status(201).json(createdMovie);
        }
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

export const updateMovie = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        coverImage,
        poster,
        genres,
        language,
        releaseDate,
        duration,
        video,
        casts,
        crews,
    } = req.body;

    const movie = await Movie.findById(req.params.id);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-GB").replace(/\//g, "");
    };

    let slug;
    if (title) {
        slug = slugify(
            `${title}-${
                releaseDate
                    ? formatDate(releaseDate)
                    : formatDate(movie.releaseDate)
            }`,
            {
                remove: /[*+/~.()'"!:@]/g,
            }
        ).toLowerCase();
    }
    if (movie) {
        movie.title = title || movie.title;
        movie.slug = slug || movie.slug;
        movie.description = description || movie.description;
        movie.coverImage = coverImage || movie.coverImage;
        movie.poster = poster || movie.poster;
        movie.genres = genres || movie.genres;
        movie.language = language || movie.language;
        movie.releaseDate = releaseDate || movie.releaseDate;
        movie.duration = duration || movie.duration;
        movie.video = video || movie.video;
        movie.casts = casts || movie.casts;
        movie.crews = crews || movie.crews;

        try {
            const updatedMovie = await movie.save();
            res.json(updatedMovie);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    } else {
        res.status(404);
        throw new Error("Movie not found");
    }
});

export const deleteMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (movie) {
        await Movie.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Movie removed successfully" });
    } else {
        res.status(404);
        throw new Error("Movie not found");
    }
});

export const deleteAllMovies = asyncHandler(async (req, res) => {
    await Movie.deleteMany({});
    res.status(200).json({ message: "All movies removed" });
});
