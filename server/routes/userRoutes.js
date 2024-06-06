import express from "express";
import {
    addToFavoriteMovies,
    changeUserPassword,
    deleteAllFavoriteMovies,
    deleteUser,
    deleteUserProfile,
    getAllFavoriteMovies,
    getAllUsers,
    loginUser,
    registerUser,
    updatedUserProfile,
} from "../controllers/userCtrl.js";
import { admin, authenticate } from "../middlewares/auth.js";

const router = express.Router();

// ***************** PUBLIC ROUTES ***********************
router.post("/", registerUser);
router.post("/login", loginUser);

// ***************** PRIVATE ROUTES ***********************
router.put("/", authenticate, updatedUserProfile);
router.delete("/", authenticate, deleteUserProfile);
router.put("/password", authenticate, changeUserPassword);
router.get("/favourites", authenticate, getAllFavoriteMovies);
router.post("/favourites", authenticate, addToFavoriteMovies);
router.delete("/favourites", authenticate, deleteAllFavoriteMovies);

// ***************** ADMIN ROUTES ***********************
router.get("/", getAllUsers);
router.delete("/:id", authenticate, admin, deleteUser);

export default router;
