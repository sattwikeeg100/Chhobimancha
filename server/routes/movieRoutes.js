import express from "express";
import { admin, authenticate } from "../middlewares/auth.js";
import {
    createMovie,
    createMovieReview,
    deleteAllMovies,
    deleteMovie,
    getMovieById,
    getMovies,
    getRandomMovies,
    getTopRatedMovies,
    importMovies,
    updateMovie,
} from "../controllers/movieCtrl.js";

const router = express.Router();

// ***************** PUBLIC ROUTES ***********************
router.post("/import", importMovies);
router.get("/", getMovies);
router.get("/:id", getMovieById);
router.get("/rated/top", getTopRatedMovies);
router.get("/random/all", getRandomMovies);

// ***************** PRIVATE ROUTES ***********************
router.post("/:id/reviews", authenticate, createMovieReview);

// ***************** ADMIN ROUTES ***********************
router.put("/:id", authenticate, admin, updateMovie);
router.delete("/:id", authenticate, admin, deleteMovie);
router.delete("/", authenticate, admin, deleteAllMovies);
router.post("/", authenticate, admin, createMovie);

export default router;
