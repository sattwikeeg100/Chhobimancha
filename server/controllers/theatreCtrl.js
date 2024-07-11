import Theatre from "../models/theatreModel.js";
import asyncHandler from "express-async-handler";

// ************************* PUBLIC CONTROLLERS *********************

export const getAllTheatres = asyncHandler(async (req, res) => {
  const theatres = await Theatre.find({});
  res.json(theatres);
});

// ************************* ADMIN CONTROLLERS *********************

export const createTheatre = asyncHandler(async (req, res) => {
  const { name, image, address, addressName, phone, owner } = req.body;
  const theatre = new Theatre({
    name,
    image,
    address,
    addressName,
    phone,
    owner,
  });
  try {
    const createdtheatre = await theatre.save();
    res.status(201).json(createdtheatre);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export const updateTheatre = asyncHandler(async (req, res) => {
  const theatre = await Theatre.findById(req.params.id);

  if (theatre) {
    theatre.name = req.body.name || theatre.name;
    theatre.image = req.body.image || theatre.image;
    theatre.address = req.body.address || theatre.address;
    theatre.addressName = req.body.addressName || theatre.addressName;
    theatre.phone = req.body.phone || theatre.phone;
    theatre.owner = req.body.owner || theatre.owner;

    try {
      const updatedtheatre = await theatre.save();
      res.json(updatedtheatre);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  } else {
    res.status(404);
    throw new Error("Theatre not found");
  }
});

export const deleteTheatre = asyncHandler(async (req, res) => {
  const theatre = await Theatre.findById(req.params.id);

  if (theatre) {
    await theatre.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Theatre removed successfully" });
  } else {
    res.status(404);
    throw new Error("Theatre not found");
  }
});
