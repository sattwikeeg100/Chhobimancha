import express from "express";
import { authenticate } from "../middlewares/auth.js";
import { bookAShow, getAllBookings } from "../controllers/bookingCtrl.js";

const router = express.Router();

// ***************** PRIVATE ROUTES ***********************
router.post("/", authenticate, bookAShow );
router.get("/", authenticate, getAllBookings);

export default router;
