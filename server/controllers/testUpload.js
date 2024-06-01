import express from "express";
import AWS from "aws-sdk";
import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";

const testRouter = express.Router();

const awsCredentials = {
    region: process.env.AWS_S3_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    },
};

// Create S3 client
const s3 = new S3Client(awsCredentials);

// Define multer storage for S3 upload
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET_NAME, // Replace with your S3 bucket name
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + path.extname(file.originalname)); // Preserve original file extension
        },
        contentType: multerS3.AUTO_CONTENT_TYPE, // Automatically set the correct content type
    }),
});

// Configure AWS SDK with credentials and region
AWS.config.update(awsCredentials);

// Create MediaConvert client
const mediaconvert = new AWS.MediaConvert();

const createMediaConvertJobForABR = async (s3InputPath, s3OutputPath) => {
    // Retrieve the MediaConvert endpoint
    const endpointData = await mediaconvert.describeEndpoints().promise();
    const endpoint = endpointData.Endpoints[0].Url;

    // Create a new MediaConvert client with the retrieved endpoint
    const mediaConvertClientWithEndpoint = new AWS.MediaConvert({
        endpoint: endpoint,
    });

    const params = {
        Role: process.env.AWS_MEDIACONVERT_ROLE, // IAM role ARN
        Settings: {
            OutputGroups: [
                {
                    Name: "HLS Group",
                    OutputGroupSettings: {
                        Type: "HLS_GROUP_SETTINGS",
                        HlsGroupSettings: {
                            Destination: s3OutputPath,
                            SegmentLength: 10,
                            MinSegmentLength: 0,
                            DirectoryStructure: "SINGLE_DIRECTORY",
                        },
                    },
                    Outputs: [
                        {
                            NameModifier: "_720p",
                            ContainerSettings: {
                                Container: "M3U8",
                            },
                            VideoDescription: {
                                CodecSettings: {
                                    Codec: "H_264",
                                    H264Settings: {
                                        Bitrate: 1000000, // 1 Mbps
                                        RateControlMode: "CBR",
                                    },
                                },
                                Width: 1280,
                                Height: 720,
                            },
                            AudioDescriptions: [
                                {
                                    CodecSettings: {
                                        Codec: "AAC",
                                        AacSettings: {
                                            AudioDescriptionBroadcasterMix:
                                                "NORMAL",
                                            Bitrate: 128000, // Adjusted bitrate
                                            RateControlMode: "CBR",
                                            CodingMode: "CODING_MODE_2_0",
                                            SampleRate: 48000,
                                            Specification: "MPEG4",
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            NameModifier: "_480p",
                            ContainerSettings: {
                                Container: "M3U8",
                            },
                            VideoDescription: {
                                CodecSettings: {
                                    Codec: "H_264",
                                    H264Settings: {
                                        Bitrate: 500000, // 500 kbps
                                        RateControlMode: "CBR",
                                    },
                                },
                                Width: 854,
                                Height: 480,
                            },
                            AudioDescriptions: [
                                {
                                    CodecSettings: {
                                        Codec: "AAC",
                                        AacSettings: {
                                            AudioDescriptionBroadcasterMix:
                                                "NORMAL",
                                            Bitrate: 96000, // Adjusted bitrate
                                            RateControlMode: "CBR",
                                            CodingMode: "CODING_MODE_2_0",
                                            SampleRate: 48000,
                                            Specification: "MPEG4",
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            NameModifier: "_360p",
                            ContainerSettings: {
                                Container: "M3U8",
                            },
                            VideoDescription: {
                                CodecSettings: {
                                    Codec: "H_264",
                                    H264Settings: {
                                        Bitrate: 250000, // 250 kbps
                                        RateControlMode: "CBR",
                                    },
                                },
                                Width: 640,
                                Height: 360,
                            },
                            AudioDescriptions: [
                                {
                                    CodecSettings: {
                                        Codec: "AAC",
                                        AacSettings: {
                                            AudioDescriptionBroadcasterMix:
                                                "NORMAL",
                                            Bitrate: 64000, // Adjusted bitrate
                                            RateControlMode: "CBR",
                                            CodingMode: "CODING_MODE_2_0",
                                            SampleRate: 48000,
                                            Specification: "MPEG4",
                                        },
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
            Inputs: [
                {
                    FileInput: s3InputPath,
                },
            ],
        },
    };

    try {
        const data = await mediaConvertClientWithEndpoint
            .createJob(params)
            .promise();
        console.log("MediaConvert job created:", data);
        return data;
    } catch (err) {
        console.error("Error creating MediaConvert job:", err);
        throw err;
    }
};




testRouter.post("/upload", upload.single("video"), async (req, res, next) => {
    const s3InputPath = req.file.location;
    const s3OutputPath = `s3://${req.file.bucket}/output/`; // Adjust the output path as needed

    try {
        await createMediaConvertJobForABR(s3InputPath, s3OutputPath);
        res.send(
            `Successfully uploaded ${req.file.originalname} and created MediaConvert job!`
        );
    } catch (error) {
        next(error);
    }
});

export default testRouter;
