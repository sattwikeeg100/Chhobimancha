import express from "express";
import { admin, authenticate } from "../middlewares/auth.js";
import {
    createShow,
    deleteAllShows,
    deleteShow,
    getAllShows,
    updateShow,
} from "../controllers/showCtrl.js";

const router = express.Router();

// ***************** PUBLIC ROUTES ***********************
router.get("/", getAllShows);

// ***************** ADMIN ROUTES ***********************
router.post("/", authenticate, admin, createShow);
router.put("/:id", authenticate, admin, updateShow);
router.delete("/:id", authenticate, admin, deleteShow);
router.delete("/", authenticate, admin, deleteAllShows);

export default router;
