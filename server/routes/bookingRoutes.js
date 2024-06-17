import express from "express";
import { authenticate } from "../middlewares/auth.js";
import { checkout, getAllBookings, paymentVerification } from "../controllers/bookingCtrl.js";

const router = express.Router();

// ***************** PRIVATE ROUTES ***********************

// ------------------ Booking Routes -----------------------
router.get("/", authenticate, getAllBookings);

// ------------------ Payment Routes -----------------------
router.post("/checkout", checkout);
router.post("/paymentverification", authenticate, paymentVerification);

export default router;