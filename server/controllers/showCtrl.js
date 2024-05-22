import Shows from "../models/showModel.js";
import asyncHandler from "express-async-handler";
import slugify from "slugify";

// ************************* PUBLIC CONTROLLERS *********************

// @desc: Get all shows
// @route: GET /api/shows
// @access: Public

export const getShows = asyncHandler(async (req, res) => {
    try {
        // find all shows in database
        const shows = await Shows.find({}).populate("theatre");
        // send all shows to the client
        res.json(shows);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ************************* ADMIN CONTROLLERS *********************

// @desc: Create new show
// @route: POST /api/shows
// @access: Private/admin

export const createShow = asyncHandler(async (req, res) => {
    try {
        // get the show details from req.body
        const {
            showtitle,
            showdesc,
            language,
            date,
            time,
            ticketPrice,
            totalSeats,
            bookedSeats,
            theatre,
        } = req.body;

        const formatdate = (date) => {
            return new Date(date)
                .toLocaleDateString("en-GB")
                .replace(/\//g, "");
        };
        const slug = slugify(`${showtitle}-${formatdate(date)}`, {
            remove: /[*+/~.()'"!:@]/g,
        }).toLowerCase();

        // create new show from the request body
        const show = new Shows({
            showtitle,
            slug,
            showdesc,
            language,
            date,
            time,
            ticketPrice,
            totalSeats,
            bookedSeats,
            theatre,
        });

        // save the show in database
        const createdshow = await show.save();

        // send new show to the client
        res.status(201).json(createdshow);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc: Update Show
// @route: PUT /api/shows/:id
// @access: Private/admin

export const updateShow = asyncHandler(async (req, res) => {
    try {
        const { showtitle, showdesc, language, date, time, ticketPrice } = req.body;

        // get the show from show id from request params
        const show = await Shows.findById(req.params.id);

        const formatdate = (date) => {
            return new Date(date).toLocaleDateString("en-GB").replace(/\//g, "");
        }
        let slug;
        if (showtitle) {
            slug = slugify(
                `${showtitle}-${date ? formatdate(date) : formatdate(show.date)}`
            ).toLowerCase();
        }
        if (show) {
            // update show details
            show.showtitle = showtitle || show.showtitle;
            show.slug = slug || show.slug;
            show.showdesc = showdesc || show.showdesc;
            show.language = language || show.language;
            show.date = date || show.date;
            show.time = time || show.time;
            show.ticketPrice = ticketPrice || show.ticketPrice;

            // save the updated show
            const updatedshow = await show.save();
            // send the updated show to the client
            res.json(updatedshow);
        } else {
            res.status(404).json({ message: "Show not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc: Delete show
// @route: DELETE /api/shows/:id
// @access: Private/admin

export const deleteShow = asyncHandler(async (req, res) => {
    try {
        // get show id from request params
        const show = await Shows.findById(req.params.id);

        if (show) {
            // delete the show from database
            await show.deleteOne({ _id: req.params.id }); // Use deleteOne() method instead of show.remove() method
            // send success message to the client
            res.json({ message: "Show removed successfully" });
        } else {
            res.status(404).json({ message: "Show not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
