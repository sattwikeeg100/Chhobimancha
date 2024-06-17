import express from "express";
import {
    addToFavoriteMovies,
    buySubscription,
    cancelSubscription,
    changeUserPassword,
    deleteAllFavoriteMovies,
    deleteUser,
    deleteUserProfile,
    getAllFavoriteMovies,
    getAllUsers,
    getLoggedInUserDetails,
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
router.get("/userdetails", authenticate, getLoggedInUserDetails);
router.put("/", authenticate, updatedUserProfile);
router.delete("/", authenticate, deleteUserProfile);
router.put("/password", authenticate, changeUserPassword);
router.get("/favourites", authenticate, getAllFavoriteMovies);
router.post("/favourites", authenticate, addToFavoriteMovies);
router.delete("/favourites", authenticate, deleteAllFavoriteMovies);
router.post("/buy-subscription", authenticate, buySubscription);
router.post("/cancel-subscription", authenticate, cancelSubscription);

// ***************** ADMIN ROUTES ***********************
router.get("/", getAllUsers);
router.delete("/:id", authenticate, admin, deleteUser);

export default router;
