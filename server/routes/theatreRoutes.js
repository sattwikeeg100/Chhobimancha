import express from "express";
import { admin, authenticate } from "../middlewares/auth.js";
import {
    createTheatre,
    deleteTheatre,
    getTheatres,
    updateTheatre,
} from "../controllers/theatreCtrl.js";

const router = express.Router();

// ***************** PUBLIC ROUTES ***********************
router.get("/", getTheatres);

// ***************** ADMIN ROUTES ***********************
router.post("/", authenticate, admin, createTheatre);
router.put("/:id", authenticate, admin, updateTheatre);
router.delete("/:id", authenticate, admin, deleteTheatre);

export default router;
