import express from "express";
import { admin, authenticate } from "../middlewares/auth.js";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../controllers/categoryCtrl.js";

const router = express.Router();

// ***************** PUBLIC ROUTES ***********************
router.get("/", getCategories);

// ***************** ADMIN ROUTES ***********************
router.post("/", authenticate, admin, createCategory);
router.put("/:id", authenticate, admin, updateCategory);
router.delete("/:id", authenticate, admin, deleteCategory);

export default router;