import Cineast from "../models/cineastModel.js";
import asyncHandler from "express-async-handler";

// ************************* PUBLIC CONTROLLERS *********************

export const getAllCineasts = asyncHandler(async (req, res) => {
    const cineasts = await Cineast.find({});
    res.json(cineasts);
});

// ************************* ADMIN CONTROLLERS *********************

export const createCineast = asyncHandler(async (req, res) => {
    const { name, image, details } = req.body;
    const cineast = new Cineast({
        name,
        image,
        details,
    });

    try {
        const createdcineast = await cineast.save();
        res.status(201).json(createdcineast);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

export const updateCineast = asyncHandler(async (req, res) => {
    const cineast = await Cineast.findById(req.params.id);

    if (cineast) {
        cineast.name = req.body.name || cineast.name;
        cineast.image = req.body.image || cineast.image;
        cineast.details = req.body.details || cineast.details;

        try {
            const updatedcineast = await cineast.save();
            res.json(updatedcineast);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    } else {
        res.status(404);
        throw new Error("Cineast not found");
    }
});

export const deleteCineast = asyncHandler(async (req, res) => {
    const cineast = await Cineast.findById(req.params.id);

    if (cineast) {
        await Cineast.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Cineast removed successfully" });
    } else {
        res.status(404);
        throw new Error("Cineast not found");
    }
});
