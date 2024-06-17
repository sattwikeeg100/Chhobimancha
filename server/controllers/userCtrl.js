import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import {
    comparePassword,
    generateToken,
    hashPassword,
} from "../utils/authUtils.js";
import { instance } from "../config/paymentGatewayConfig.js";

// **************************** PUBLIC CONTROLLERS *******************************

// Register a user

export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, image, isAdmin, isSubscriber } = req.body;
    try {
        const userExists = await User.findOne({ email });
        // check if the email is already registered
        if (userExists) {
            res.status(400);
            throw new Error("Email already registered");
        }

        // hash the password
        const hash = await hashPassword(password);
        // create user in DB
        const user = new User({
            name,
            email,
            password: hash, // hash of password
            image,
            isAdmin,
            isSubscriber,
        });

        await user.save();

        // if user is created successfully send user data and token to the client
        if (user) {
            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                isSubscriber: user.isSubscriber,
                favoriteMovies: user.favoriteMovies,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            // If an error occurs, let's pass it to the next middleware (error handling middleware)
            throw new Error("Invalid user data");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Login a user

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find the user in DB
        const user = await User.findOne({ email });
        // If the user is not found in the DB, throw error
        if (!user) {
            throw new Error("User does not exist");
        }

        // compare password entered with the actual hashed password
        const validPassword = await comparePassword(password, user.password);

        // If user exists, and given password is valid, then send user data and token to client
        if (user && validPassword) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                isSubscriber: user.isSubscriber,
                subscriptionId: user.subscriptionId,
                favoriteMovies: user.favoriteMovies,
                token: generateToken(user._id),
            });
        } else {
            res.status(401);
            throw new Error("Invalid password");
        }
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

// **************************** PRIVATE CONTROLLERS *******************************

// Get the details of logged in user

export const getLoggedInUserDetails = asyncHandler(async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

// Update user profile

export const updatedUserProfile = asyncHandler(async (req, res) => {
    const { name, email, image, isSubscriber, subscriptionId } = req.body;
    try {
        const user = await User.findById(req.user._id);
        // if user exists update user data and save it in DB
        if (user) {
            user.name = name || user.name;
            user.email = email || user.email;
            user.image = image || user.image;
            if (isSubscriber === false) {
                user.isSubscriber = false;
                user.subscriptionId = "";
            } else {
                user.isSubscriber = isSubscriber || user.isSubscriber;
                user.subscriptionId = subscriptionId || user.subscriptionId;
            }

            const updatedUser = await user.save();
            // send updated user data and token to the client
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                image: updatedUser.image,
                isAdmin: updatedUser.isAdmin,
                isSubscriber: updatedUser.isSubscriber,
                subscriptionId: updatedUser.subscriptionId,
                favoriteMovies: user.favoriteMovies,
                token: generateToken(updatedUser._id),
            });
        }
        // if user does not exist, send error message
        else {
            res.status(404);
            throw new Error("User does not exist");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete user profile

export const deleteUserProfile = asyncHandler(async (req, res) => {
    try {
        // Find the user by its ID
        const user = await User.findById(req.user._id);

        // If user exists, proceed with deletion
        if (user) {
            // Check if the user is an admin. Admin users can't be deleted.
            if (user.isAdmin) {
                res.status(403); // Change status code to 403 Forbidden
                throw new Error("Can't delete admin user");
            }

            // If the user is not an admin, proceed with deletion
            await User.deleteOne({ _id: req.user._id }); // Use deleteOne() method
            res.json({ message: "User deleted successfully" });
        } else {
            // If user doesn't exist, return a 404 error
            res.status(404);
            throw new Error("User does not exist");
        }
    } catch (error) {
        // Catch any errors that occur during the deletion process
        res.status(400).json({ message: error.message });
    }
});

// Change user password

export const changeUserPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        // find user in DB
        const user = await User.findById(req.user._id);
        // compare old password entered with the old existing hashed password
        const validPassword = await comparePassword(oldPassword, user.password);

        // if user exists compare old password with hashed password, then update user password and save it in the DB
        if (user && validPassword) {
            // Update user's password and save it in the database
            user.password = await hashPassword(newPassword); // hash new password
            await user.save(); // Save user in the DB

            res.json({ message: "Password changed successfully" });
        } else {
            // If old password is incorrect or user doesn't exist, send error message
            res.status(401);
            throw new Error("Invalid old password");
        }
    } catch (error) {
        // Catch any errors that occur during the password change process
        res.status(400).json({ message: error.message });
    }
});

// Get all favorite movies

export const getAllFavoriteMovies = asyncHandler(async (req, res) => {
    try {
        // find user in DB
        const user = await User.findById(req.user._id).populate(
            "favoriteMovies"
        );
        // if user exists send favorite movies to client
        if (user) {
            res.json(user.favoriteMovies);
        }
        // else send error message
        else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Add movie to favourites

export const addToFavoriteMovies = asyncHandler(async (req, res) => {
    const { movieId } = req.body;
    try {
        // find user in DB
        const user = await User.findById(req.user._id);
        // if user exists, add movie to favorite movies and save it in DB
        if (user) {
            // check if movie already added to favorites
            // if movie already added send error message
            if (user.favoriteMovies.includes(movieId)) {
                res.status(400);
                throw new Error("Movie already liked");
            }
            // else add movie to favorite movies and save it in DB
            user.favoriteMovies.push(movieId);
            await user.save();
            res.json(user.favoriteMovies);
        }
        // else send error message
        else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete all favorite movies

export const deleteAllFavoriteMovies = asyncHandler(async (req, res) => {
    try {
        // find user in DB
        const user = await User.findById(req.user._id);
        // if user exists delete all favorite movies and save it in DB
        if (user) {
            user.favoriteMovies = [];
            await user.save();
            res.json({ message: "All favorite movies deleted successfully." });
        }
        // else send error message
        else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Buy a subscription

export const buySubscription = asyncHandler(async (req, res) => {
    try {
        const { plan_id, customer_notify } = req.body;

        const subscription = await instance.subscriptions.create({
            plan_id,
            customer_notify,
            total_count: 6, // Monthly subscription for 6 months
        });

        res.status(200).json(subscription);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Cancel a subscription

export const cancelSubscription = asyncHandler(async (req, res) => {
    try {
        const { subscription_id } = req.body;

        const cancellationResponse = await instance.subscriptions.cancel(
            subscription_id
        );

        res.status(200).json(cancellationResponse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// **************************** ADMIN CONTROLLERS *******************************

// Get all the users

export const getAllUsers = asyncHandler(async (req, res) => {
    try {
        // find all users in DB
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a user

export const deleteUser = asyncHandler(async (req, res) => {
    try {
        // find user in DB
        const user = await User.findById(req.params.id);
        // if user exists delete user from DB
        if (user) {
            // if user is admin throw error message
            if (user.isAdmin) {
                res.status(400);
                throw new Error("Can't delete admin user");
            }
            // else delete user from DB
            await User.deleteOne(user); // Use deleteOne() method instead of user.remove() method
            res.json({ message: "User deleted successfully" });
        }
        // else send error message
        else {
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
