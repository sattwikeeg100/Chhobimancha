import Category from "../models/categoryModel.js";
import asyncHandler from "express-async-handler";

// ************************* PUBLIC CONTROLLERS *********************

// @desc: Get all categories
// @route: GET /api/categoriest
// @access: Public

export const getCategories = asyncHandler(async (req, res) => {
    try {
        // find all categories in database
        const categories = await Category.find({});
        // send all categories to the client
        res.json(categories);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// ************************* ADMIN CONTROLLERS *********************

// @desc: Create new category
// @route: POST /api/categories
// @access: Private/admin

export const createCategory = asyncHandler(async (req, res) => {
    try {
        // get title from request body
        const { title } = req.body;
        // create new category
        const category = new Category({
            title,
        });
        // save the category in database
        const createdCategory = await category.save();

        // send new category to the client
        res.status(201).json(createdCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc: Update category
// @route: PUT /api/categories/:id
// @access: Private/admin

export const updateCategory = asyncHandler(async (req, res) => {
    try {
        // get category id from request params
        const category = await Category.findById(req.params.id);

        if (category) {
            // update category title
            category.title = req.body.title || category.title;
            // save the updated category
            const updatedCategory = await category.save();
            // send the updated category to the client
            res.json(updatedCategory);
        } else {
            res.status(404).json({ message: "Category not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc: Delete category
// @route: DELETE /api/categories/:id
// @access: Private/admin

export const deleteCategory = asyncHandler(async (req, res) => {
    try {
        // get category id from request params
        const category = await Category.findById(req.params.id);

        if (category) {
            // delete the category from database
            await Category.deleteOne({ _id: req.params.id }); // Use deleteOne() method instead of category.remove() method
            // send success message to the client
            res.json({ message: "Category removed successfully" });
        } else {
            res.status(404).json({ message: "Category not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
