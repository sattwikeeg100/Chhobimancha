import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import {
    comparePassword,
    generateToken,
    hashPassword,
} from "../utils/authUtils.js";
import { instance } from "../config/paymentGatewayConfig.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.TEAM_EMAIL_ADDRESS,
        pass: process.env.TEAM_EMAIL_PASSWORD,
    },
});

// **************************** PUBLIC CONTROLLERS *******************************

export const registerUser = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        password,
        confirmPassword,
        image,
    } = req.body;

    if (password !== confirmPassword) {
        res.status(400);
        throw new Error("Passwords do not match");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("Email already registered");
    }

    const hash = await hashPassword(password);

    const user = new User({
        name,
        email,
        password: hash,
        image,
    });

    try {
        await user.save();

        if (user) {
            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                favoriteMovies: user.favoriteMovies,
                token: generateToken(user._id),
            });
        }
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password, isLoggingAsAdmin } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error("User does not exist");
    }

    const validRole = isLoggingAsAdmin === user.isAdmin;
    if (!validRole) {
        res.status(401);
        throw new Error("Invalid login role");
    }

    const validPassword = await comparePassword(password, user.password);

    if (user && validPassword) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            image: user.image,
            isAdmin: user.isAdmin,
            isOwner: user.isOwner,
            isSubscriber: user.isSubscriber,
            subscriptionId: user.subscriptionId,
            favoriteMovies: user.favoriteMovies,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid password");
    }
});

export const requestPasswordReset = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).send("User does not exist");
    }

    const code = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit code
    user.resetPasswordCode = code;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    const mailOptions = {
        to: user.email,
        from: process.env.TEAM_EMAIL_ADDRESS,
        subject: "Chhobimancha: Password Reset Verification Code",
        text: `Your password reset verification code is ${code}. It is valid for 1 hour.`,
    };

    transporter.sendMail(mailOptions, (err) => { 
        if (err) {
            throw new Error("Error sending email");
        }
        res.send("Verification code sent");
    });
});

export const verifyCode = async (req, res) => {
    const { email, code } = req.body;
    const user = await User.findOne({
        email,
        resetPasswordCode: code,
        resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
        return res
            .status(400)
            .send("Verification code is invalid or has expired.");
    }
    res.send("Code is valid");
};

export const resetPassword = async (req, res) => {
    const { email, code, password } = req.body;
    const user = await User.findOne({
        email,
        resetPasswordCode: code,
        resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
        return res
            .status(400)
            .send("Verification code is invalid or has expired.");
    }

    user.password = await hashPassword(password);
    user.resetPasswordCode = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.send("Password has been reset");
};

// **************************** PRIVATE CONTROLLERS *******************************

export const getLoggedInUserDetails = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

export const updatedUserProfile = asyncHandler(async (req, res) => {
    const { name, email, image, isSubscriber, subscriptionId } = req.body;
    const user = await User.findById(req.user._id);
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

        try {
            const updatedUser = await user.save();
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                image: updatedUser.image,
                isAdmin: updatedUser.isAdmin,
                isSubscriber: updatedUser.isSubscriber,
                subscriptionId: updatedUser.subscriptionId,
                favoriteMovies: updatedUser.favoriteMovies,
                token: generateToken(updatedUser._id),
            });
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
    else {
        res.status(404);
        throw new Error("User does not exist");
    }
});

export const deleteUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        await User.deleteOne({ _id: req.user._id });
        res.status(200).json({ message: "User deleted successfully" });
    } else {
        res.status(404);
        throw new Error("User does not exist");
    }
});

export const changeUserPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    const validPassword = await comparePassword(oldPassword, user.password);

    if (user && validPassword) {
        user.password = await hashPassword(newPassword);
        await user.save();

        res.json({ message: "Password changed successfully" });
    } else {
        res.status(401);
        throw new Error("Invalid old password");
    }
});

export const getAllFavoriteMovies = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate("favoriteMovies");
    if (user) {
        res.json(user.favoriteMovies);
    }
    else {
        res.status(404);
        throw new Error("User not found");
    }
});

export const toggleAddToFavoriteMovies = asyncHandler(async (req, res) => {
    const { movieId } = req.body;
    const user = await User.findById(req.user._id);
    if (user) {
        if (user.favoriteMovies.includes(movieId)) {
            user.favoriteMovies.pull(movieId);
        }
        else {
            user.favoriteMovies.push(movieId);
        }
        await user.save();
        res.json(user.favoriteMovies);
    }
    else {
        res.status(404);
        throw new Error("User not found");
    }
});

export const buySubscription = asyncHandler(async (req, res) => {
    const { plan_id, customer_notify } = req.body;
    const userId = req.user._id;

    const subscription = await instance.subscriptions.create({
        plan_id,
        customer_notify,
        total_count: 6, // Monthly subscription for 6 months
    });

    const subscriptionStart = new Date();
    const subscriptionEnd = new Date(subscriptionStart);
    subscriptionEnd.setMonth(subscriptionEnd.getMonth() + 6);

    await User.findByIdAndUpdate(userId, {
        isSubscriber: true,
        subscriptionId: subscription.id,
        subscriptionStart,
        subscriptionEnd,
    });

    res.status(201).json(subscription);
});

export const cancelSubscription = asyncHandler(async (req, res) => {
    const { subscription_id } = req.body;
    const userId = req.user._id;

    const cancellationResponse = await instance.subscriptions.cancel(
        subscription_id
    );

    await User.findByIdAndUpdate(userId, {
        isSubscriber: false,
        subscriptionId: "",
        subscriptionStart: null,
        subscriptionEnd: null,
    });

    res.status(200).json(cancellationResponse);
});

// **************************** ADMIN CONTROLLERS *******************************

export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

// **************************** OWNER CONTROLLERS *******************************

export const authorizeAdmin = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        user.isAdmin = req.body.isAdmin;
        await user.save();
        res.status(200).json({
            message: "Admin authorization updated successfully",
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

export const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        await User.deleteOne(user);
        res.status(200).json({ message: "User deleted successfully" });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});