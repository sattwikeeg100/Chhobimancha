import React from "react";
import axiosInstance from "../config/axiosInstance";

export const handleImageFileUpload = async (
    file,
    existingImage,
    urlSetter,
    uploadStatus
) => {
    if (!file) return;

    uploadStatus(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await axiosInstance.post(`/upload/image`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        urlSetter(response.data.url);

        if (existingImage) {
            const filename = existingImage.split("/").pop();
            await axiosInstance.delete(`/upload/image/${filename}`);
        }
    } catch (error) {
        existingImage
            ? console.error("Error uploading new image file:", error)
            : console.error(
                  "Error uploading new file or deleting existing image file:",
                  error
              );
    } finally {
        uploadStatus(false);
    }
};

export const handleVideoFileUpload = async (
    file,
    existingVideo,
    urlSetter,
    uploadStatus
) => {
    console.log(file);
    if (!file) return;

    uploadStatus(true);
    const formData = new FormData();
    formData.append("video", file);

    try {
        const response = await axiosInstance.post(`/upload/video`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        urlSetter(response.data.url);

        if (existingVideo) {
            const filename = existingVideo.split("/").pop();
            await axiosInstance.delete(`/upload/video/${filename}`);
        }
    } catch (error) {
        existingVideo
            ? console.error("Error uploading new video file:", error)
            : console.error(
                  "Error uploading new file or deleting existing video file:",
                  error
              );
    } finally {
        uploadStatus(false);
    }
};

export const handleImageFileDelete = async (
    imageUrl,
    imageUrlDefaultSetter,
    deleteStatus
) => {
    try {
        deleteStatus(true);
        const filename = imageUrl.split("/").pop();
        await axiosInstance.delete(`/upload/image/${filename}`);
        imageUrlDefaultSetter("");
    } catch (error) {
        console.error("Error deleting image file:", error);
    } finally {
        deleteStatus(false);
    }
};

export const handleVideoFileDelete = async (
    videoUrl,
    videoUrlDefaultSetter,
    deleteStatus
) => {
    try {
        deleteStatus(true);
        const filename = videoUrl.split("/").pop();
        await axiosInstance.delete(`/upload/video/${filename}`);
        videoUrlDefaultSetter("");
    } catch (error) {
        console.error("Error deleting video file:", error);
    } finally {
        deleteStatus(false);
    }
};
