import asyncHandler from "express-async-handler";
import Movie from "../models/movieModel.js";
import slugify from "slugify";

// ************************* PUBLIC CONTROLLERS *********************

// Get all movies

export const getMovies = asyncHandler(async (req, res) => {
    try {
        const movies = await Movie.find({});

        res.status(200).json(movies);
    } catch (error) {
        // Catch and handle any errors that occur during the process
        res.status(400).json({ message: error.message });
    }
});

// Get movie by id

export const getMovieById = asyncHandler(async (req, res) => {
    try {
        // find movie by id in database
        const movie = await Movie.findById(req.params.id);
        // if the movie is found, send it to the client
        if (movie) {
            res.json(movie);
        } else {
            res.status(404);
            throw new Error("Movie not found");
        }
    } catch (error) {
        // Catch and handle any errors that occur during the process
        res.status(400).json({ message: error.message });
    }
});

// ************************* PRIVATE CONTROLLERS *********************

// Create movie review

export const createMovieReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    try {
        // find movie by id in database
        const movie = await Movie.findById(req.params.id);

        if (movie) {
            // check if the user already reviewed the movie
            const alreadyReviewed = movie.reviews.find(
                (r) => r.userId.toString() === req.user._id.toString()
            );

            // if the user already reviewed the movie, send 400 error
            if (alreadyReviewed) {
                res.status(400);
                throw new Error("You already reviewed the movie");
            }
            // otherwise create a new review
            const review = {
                userName: req.user.fullName,
                userId: req.user._id,
                userImage: req.user.image,
                rating: Number(rating),
                comment,
            };
            // push the new review to the reviews array
            movie.reviews.push(review);
            // increment the number of reviews
            movie.numberOfReviews = movie.reviews.length;

            // calculate the new averagerating
            movie.averagerating =
                movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
                movie.reviews.length;

            // save the movie in database
            await movie.save();
            // send the new movie to the client
            res.status(200).json({
                message: "Review added",
            });
        } else {
            res.status(404);
            throw new Error("Movie not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ************************* ADMIN CONTROLLERS *********************

// Add a movie

export const createMovie = asyncHandler(async (req, res) => {
    try {
        // get data from the request body
        const {
            name,
            desc,
            image,
            titleImage,
            averagerating,
            numberOfReviews,
            category,
            time,
            language,
            year,
            video,
            casts,
        } = req.body;

        const slug = slugify(`${name}-${year}`).toLowerCase();
        // create a mew movie
        const movie = new Movie({
            name,
            slug,
            desc,
            image,
            titleImage,
            averagerating,
            numberOfReviews,
            category,
            time,
            language,
            year,
            video,
            casts,
            userId: req.user._id,
        });

        // save the movie in database
        if (movie) {
            const createdMovie = await movie.save();
            res.status(201).json(createdMovie);
        } else {
            res.status(400);
            throw new Error("Invalid movie data");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a movie

export const updateMovie = asyncHandler(async (req, res) => {
    try {
        // get data from the request body
        const {
            name,
            desc,
            image,
            titleImage,
            averagerating,
            numberOfReviews,
            category,
            time,
            language,
            year,
            video,
            casts,
        } = req.body;

        // find movie by id in database
        const movie = await Movie.findById(req.params.id);

        let slug;
        if (name) {
            slug = slugify(
                `${name}-${year ? year : movie.year}`
            ).toLowerCase();
        }
        if (movie) {
            // update movie data
            movie.name = name || movie.name;
            movie.slug = slug || movie.slug;
            movie.desc = desc || movie.desc;
            movie.image = image || movie.image;
            movie.titleImage = titleImage || movie.titleImage;
            movie.averagerating = averagerating || movie.averagerating;
            movie.numberOfReviews = numberOfReviews || movie.numberOfReviews;
            movie.category = category || movie.category;
            movie.time = time || movie.time;
            movie.language = language || movie.language;
            movie.year = year || movie.year;
            movie.video = video || movie.video;
            movie.casts = casts || movie.casts;

            // save the movie in database
            const updatedMovie = await movie.save();
            // send the updated movie to the client
            res.status(201).json(updatedMovie);
        } else {
            res.status(404);
            throw new Error("Movie not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a movie

export const deleteMovie = asyncHandler(async (req, res) => {
    try {
        // find movie by id in database
        const movie = await Movie.findById(req.params.id);
        // if the movie is found, delete it
        if (movie) {
            await Movie.deleteOne({ _id: req.params.id }); // Use deleteOne() method instead of movie.remove() method
            res.json({ message: "Movie removed successfully" });
        }
        // if the movie is not found, send 404 error
        else {
            res.status(404);
            throw new Error("Movie not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete all movie

export const deleteAllMovies = asyncHandler(async (req, res) => {
    try {
        // delete all movies
        await Movie.deleteMany({});
        res.json({ message: "All movies removed" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});