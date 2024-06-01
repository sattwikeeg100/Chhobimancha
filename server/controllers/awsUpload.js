import AWS from "aws-sdk";
import fs from "fs";
import path from "path";


// Configure AWS SDK
AWS.config.update({
    region: "us-east-1",
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

/* export const uploadVideo = async (req, res) => {
    console.log(req.file);
    const filePath = req.file; // Adjusted to req.file.path to access the file path
    const fileName = path.basename(filePath);
    const fileContent = fs.readFileSync(filePath);

    const params = {
        Bucket: "myshowtime360", // Replace with your S3 bucket name
        Key: `videos/${fileName}`, // The path where the video will be stored
        Body: fileContent,
        ContentType: "video/mp4", // Adjust content type as needed
    };

    try {
        const data = await s3.upload(params).promise();
        console.log(`DATA: ${data}`);
        console.log(`File uploaded successfully. ${data.Location}`);
        res.status(200).send(data);
    } catch (err) {
        console.error("Error uploading file:", err);
        res.status(500).send({ error: "Error uploading file" });
    }
}; */


export const uploadVideo = async (req, res) => {
    
    

    try {
        console.log(req.body);
    } catch (err) {
        console.error("Error uploading file:", err);
        res.status(500).send({ error: "Error uploading file" });
    }
};

// Example usage (for demonstration purposes, not part of the actual server handler)
// uploadVideo({ file: { path: "/path/to/your/video.mp4" } }, { status: () => ({ send: console.log }) });
