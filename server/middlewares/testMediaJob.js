import AWS from "aws-sdk";
const mediaconvert = new AWS.MediaConvert({
    endpoint: "https://abcd1234.mediaconvert.us-east-1.amazonaws.com",
});

async function createMediaConvertJobForABR(s3InputPath, s3OutputPath) {
    const params = {
        Role: "arn:aws:iam::123456789012:role/MediaConvert_Default_Role", // Replace with your IAM role ARN
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
                            ContainerSettings: {
                                Container: "M3U8",
                            },
                            VideoDescription: {
                                CodecSettings: {
                                    Codec: "H_264",
                                    H264Settings: {
                                        MaxBitrate: 1000000, // 1 Mbps
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
                                    },
                                },
                            ],
                        },
                        {
                            ContainerSettings: {
                                Container: "M3U8",
                            },
                            VideoDescription: {
                                CodecSettings: {
                                    Codec: "H_264",
                                    H264Settings: {
                                        MaxBitrate: 500000, // 500 kbps
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
                                    },
                                },
                            ],
                        },
                        {
                            ContainerSettings: {
                                Container: "M3U8",
                            },
                            VideoDescription: {
                                CodecSettings: {
                                    Codec: "H_264",
                                    H264Settings: {
                                        MaxBitrate: 250000, // 250 kbps
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
        const data = await mediaconvert.createJob(params).promise();
        console.log("MediaConvert job created:", data);
        return data;
    } catch (err) {
        console.error("Error creating MediaConvert job:", err);
        throw err;
    }
}

// Example usage
createMediaConvertJobForABR(
    "s3://your-bucket-name/videos/video.mp4",
    "s3://your-bucket-name/output/"
);
