import express from "express";
import {
    addLikedMovie,
    changeUserPassword,
    deleteLikedMovies,
    deleteUser,
    deleteUserProfile,
    getLikedMovies,
    getUsers,
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
router.get("/favourites", authenticate, getLikedMovies);
router.post("/favourites", authenticate, addLikedMovie);
router.delete("/favourites", authenticate, deleteLikedMovies);

// ***************** ADMIN ROUTES ***********************
router.delete("/favourites", authenticate, deleteLikedMovies);
router.delete("/favourites", authenticate, deleteLikedMovies);

// ***************** ADMIN ROUTES ***********************
router.get("/", authenticate, admin, getUsers);
router.delete("/:id", authenticate, admin, deleteUser);

export default router;
