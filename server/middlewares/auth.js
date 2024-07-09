import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// authentication middleware
export const authenticate = asyncHandler(async (req, res, next) => {
    let token;
    // Check if token exists in headers
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            // verify token and get user id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            req.user = req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

// admin middleware
export const admin = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error("Not authorized as an admin");
    }
});

// owner middleware
export const owner = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.isAdmin && req.user.isOwner) {
        next();
    } else {
        res.status(401);
        throw new Error("Not authorized as an owner");
    }
});