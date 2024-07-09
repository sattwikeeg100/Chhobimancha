import Show from "../models/showModel.js";
import asyncHandler from "express-async-handler";
import slugify from "slugify";

// ************************* PUBLIC CONTROLLERS *********************

export const getAllShows = asyncHandler(async (req, res) => {
    const shows = await Show.find({}).populate("theatre");
    res.json(shows);
});

export const getShowBySlugId = asyncHandler(async (req, res) => {
    const slug = req.params.slug;
    const show = await Show.findOne({ slug: slug })
        .populate("theatre")
        .populate("casts.person")
        .populate("crews.person");

    if (show) {
        res.json(show);
    } else {
        res.status(404);
        throw new Error("Show not found");
    }
});

// ************************* ADMIN CONTROLLERS *********************

export const createShow = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        poster,
        language,
        date,
        time,
        ticketPrice,
        theatre,
        casts,
        crews,
    } = req.body;

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-GB").replace(/\//g, "");
    };
    const slug = slugify(`${title}-${formatDate(date)}`, {
        remove: /[*+/~.()'"!:@]/g,
    }).toLowerCase();

    const show = new Show({
        userId: req.user._id,
        title,
        slug,
        description,
        poster,
        language,
        date,
        time,
        ticketPrice,
        theatre,
        casts,
        crews,
    });

    try {
        const createdshow = await show.save();
        res.status(201).json(createdshow);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

export const updateShow = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        poster,
        language,
        date,
        time,
        ticketPrice,
        theatre,
        casts,
        crews,
    } = req.body;

    const show = await Show.findById(req.params.id);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-GB").replace(/\//g, "");
    };

    if (show) {
        let slug;
        if (title) {
            slug = slugify(
                `${title}-${date ? formatDate(date) : formatDate(show.date)}`,
                {
                    remove: /[*+/~.()'"!:@]/g,
                }
            ).toLowerCase();
        }

        show.title = title || show.title;
        show.slug = slug || show.slug;
        show.description = description || show.description;
        show.poster = poster || show.poster;
        show.language = language || show.language;
        show.date = date || show.date;
        show.time = time || show.time;
        show.ticketPrice = ticketPrice || show.ticketPrice;
        show.theatre = theatre || show.theatre;
        show.casts = casts || show.casts;
        show.crews = crews || show.crews;

        try {
            const updatedshow = await show.save();
            res.json(updatedshow);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    } else {
        res.status(404);
        throw new Error("Show not found");
    }
});

export const deleteShow = asyncHandler(async (req, res) => {
    const show = await Show.findById(req.params.id);

    if (show) {
        await show.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Show removed successfully" });
    } else {
        res.status(404).json({ message: "Show not found" });
    }
});

export const deleteAllShows = asyncHandler(async (req, res) => {
    await Show.deleteMany({});
    res.status(200).json({ message: "All shows removed" });
});