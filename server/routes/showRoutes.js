import express from "express";
import { admin, authenticate } from "../middlewares/auth.js";
import {
    createShow,
    deleteShow,
    getShows,
    updateShow,
} from "../controllers/showCtrl.js";

const router = express.Router();

// ***************** PUBLIC ROUTES ***********************
router.get("/", getShows);

// ***************** ADMIN ROUTES ***********************
router.post("/", authenticate, admin, createShow);
router.put("/:id", authenticate, admin, updateShow);
router.delete("/:id", authenticate, admin, deleteShow);

export default router;
