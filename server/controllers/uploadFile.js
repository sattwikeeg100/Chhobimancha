import express from "express";
import multer from "multer";
import storage from "../config/firebaseStorage.js";

const uploadRouter = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
});

uploadRouter.post("/image", upload.single("file"), async (req, res) => {
    try {
        // Check if file is present in request
        if (!req.file) {
            return res.status(400).json({ message: "Please upload a file" });
        }

        // get file from request
        const file = req.file;

        // create new filename
        const fileName = Date.now() + "-" + file.originalname;

        const blob = storage.file(fileName);
        const blobStream = blob.createWriteStream({
            resumable: false,
            metadata: {
                contentType: file.mimetype,
            },
        });

        // Handle blob stream events
        blobStream.on("error", (error) => {
            console.error("Error uploading file:", error);
            res.status(400).json({ message: error.message });
        });

        blobStream.on("finish", () => {
            // get the public URL
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.name}/o/${fileName}?alt=media`;
            // return the its public URL
            res.status(200).json(publicUrl);
            
        });

        // End blob stream with file buffer
        blobStream.end(file.buffer);
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(400).json({ error: error.message });
    }
});



export default uploadRouter;