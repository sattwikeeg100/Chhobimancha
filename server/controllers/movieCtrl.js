import asyncHandler from "express-async-handler";
import { MoviesData } from "../data/movieData.js";
import Movie from "../models/movieModel.js";

// ************************* PUBLIC CONTROLLERS *********************
// @desc: Import movies
// @route: GET /api/movies/import
// @access: Public

export const importMovies = asyncHandler(async (req, res) => {
    // first we make sure our movies table is empty by deleting all documents from the database
    await Movie.deleteMany({});
    // then we insert all the movies from MoviesData
    const movies = await Movie.insertMany(MoviesData);
    res.status(201).json(movies);
});

// @desc: Get all movies
// @route: GET /api/movies
// @access: Public

export const getMovies = asyncHandler(async (req, res) => {
    try {
        // Extract query parameters from req.query
        const { category, time, language, rate, year, search } = req.query;

        // Construct the MongoDB query object based on the provided parameters
        let query = {
            ...(category && { category }),
            ...(time && { time }),
            ...(language && { language }),
            ...(rate && { rate }),
            ...(year && { year }),
            ...(search && { name: { $regex: search, $options: "i" } }),
        };

        // Pagination settings
        const page = Number(req.query.pageNumber) || 1;
        const limit = 2; // Number of movies per page
        const skip = (page - 1) * limit;

        // Find movies matching the query, with pagination
        const movies = await Movie.find(query)
            .sort({ createdAt: -1 }) // Sort by creation date descending
            .skip(skip)
            .limit(limit);

        // Get total number of movies matching the query
        const count = await Movie.countDocuments(query);

        // Send response with movies, pagination information, and total number of movies
        res.json({
            movies,
            page,
            pages: Math.ceil(count / limit), // Calculate total number of pages
            totalMovies: count,
        });
    } catch (error) {
        // Catch and handle any errors that occur during the process
        res.status(400).json({ message: error.message });
    }
});

// @desc: Get movie by id
// @route GET /api/movies/:id
// @access Public

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

// @desc: Get top rated movies
// @route GET /api/movies/rated/top
// @access Public

export const getTopRatedMovies = asyncHandler(async (req, res) => {
    try {
        // find top rated movies
        const sortedmovies = await Movie.find({}).sort({ rate: -1 });
        // send top rated movies to the client
        res.json(sortedmovies);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// @desc: GET random movies
// @route: GET /api/movies/random/all
// @access Public

export const getRandomMovies = asyncHandler(async (req, res) => {
    try {
        const movies = await Movie.aggregate([{ $sample: { size: 8 } }]);
        res.json(movies);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// ************************* PRIVATE CONTROLLERS *********************

// @desc: Create movie review
// @route: POST /api/movies/:id/reviews
// @access: Private

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

// @desc: Update movie
// @route: PUT /api/movies/:id
// @access: Private/admin

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

        if (movie) {
            // update movie data
            movie.name = name || movie.name;
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

// @desc: Delete movie
// @route: DELETE /api/movies/:id
// @access: Private/Admin

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

// @desc: Delete all movie
// @route: DELETE /api/movies
// @access: Private/Admin

export const deleteAllMovies = asyncHandler(async (req, res) => {
    try {
        // delete all movies
        await Movie.deleteMany({});
        res.json({ message: "All movies removed" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc: Create movie
// @route: POST /api/movies
// @access Private/Admin

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

        // create a mew movie
        const movie = new Movie({
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
            userId: req.user._id,
        });

        // save the movie in database
        if (movie){
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
