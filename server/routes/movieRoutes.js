import express from "express";
import { admin, authenticate } from "../middlewares/auth.js";
import {
    createMovie,
    createMovieReview,
    deleteAllMovies,
    deleteMovie,
    getMovieById,
    getMovies,
    updateMovie,
} from "../controllers/movieCtrl.js";

const router = express.Router();

// ***************** PUBLIC ROUTES ***********************
router.get("/", getMovies);
router.get("/:id", getMovieById);

// ***************** PRIVATE ROUTES ***********************
router.post("/:id/reviews", authenticate, createMovieReview);

// ***************** ADMIN ROUTES ***********************
router.post("/", authenticate, admin, createMovie);
router.put("/:id", authenticate, admin, updateMovie);
router.delete("/:id", authenticate, admin, deleteMovie);
router.delete("/", authenticate, admin, deleteAllMovies);

export default router;
