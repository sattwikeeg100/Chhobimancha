import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// Register a user
// @route: POST /api/users/

export const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, image } = req.body;
    try {
        const userExists = await User.findOne({ email });
        // check if the email is already registered
        if (userExists) {
            res.status(400);
            throw new Error("Email already registered");
        }
        // else create user
        const user = new User({
            fullName,
            email,
            password,
            image,
        });
        await user.save();

        return res.status(201).json({ user });
    } catch (error) {
        // If an error occurs, let's pass it to the next middleware (error handling middleware)
        throw new Error(error);
    }
});

// NOTE: The middleware will only execute if there's an error thrown in your route handlers or other middleware.