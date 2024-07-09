// routes/oauthRoutes.js
import express from "express";
import passport from "passport";
import { googleAuth, googleAuthCallback } from "../controllers/oauthCtrl.js";

const router = express.Router();

// ***************** ROUTES ***********************

router.get("/google", googleAuth);
router.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    googleAuthCallback
);

export default router;