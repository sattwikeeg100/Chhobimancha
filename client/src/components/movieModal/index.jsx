// src/components/MovieModal.jsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "sonner";
import {
    handleImageFileDelete,
    handleImageFileUpload,
    handleVideoFileDelete,
    handleVideoFileUpload,
} from "../../utils/fileHandler";
import { MdDeleteForever } from "react-icons/md";
import { MdCloudDone } from "react-icons/md";
import Select from "react-select";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const genreOptions = [
    { value: "Drama", label: "Drama" },
    { value: "Thriller", label: "Thriller" },
    { value: "Romance", label: "Romance" },
    { value: "Comedy", label: "Comedy" },
    { value: "Action", label: "Action" },
    { value: "Crime", label: "Crime" },
    { value: "Horror", label: "Horror" },
    { value: "History", label: "History" },
    { value: "Documentary", label: "Documentary" },
    { value: "Science-Fiction", label: "Science Fiction" },
    { value: "Other", label: "Other" },
];

const MovieModal = ({ movie, onClose }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [coverImage, setCoverImage] = useState(null);
    const [poster, setPoster] = useState(null);
    const [video, setVideo] = useState(null);
    const [genres, setGenres] = useState([]);
    const [language, setLanguage] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [duration, setDuration] = useState("");
    const [casts, setCasts] = useState([{ person: "", role: "" }]);
    const [crews, setCrews] = useState([{ person: "", role: "" }]);
    const [cineasts, setCineasts] = useState([]);
    const [coverImageFile, setCoverImageFile] = useState(null);
    const [posterFile, setPosterFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploadingCover, setUploadingCover] = useState(false);
    const [uploadingPoster, setUploadingPoster] = useState(false);
    const [uploadingVideo, setUploadingVideo] = useState(false);
    const [deletingCover, setDeletingCover] = useState(false);
    const [deletingPoster, setDeletingPoster] = useState(false);
    const [deletingVideo, setDeletingVideo] = useState(false);
    const [saveRequire, setSaveRequire] = useState(false);

    useEffect(() => {
        fetchCineasts();
    }, []);

    const fetchCineasts = async () => {
        try {
            const response = await axiosInstance.get(`/cineasts`);
            setCineasts(response.data);
        } catch (error) {
            console.error("Error fetching cineasts:", error);
        }
    };

    useEffect(() => {
        if (movie) {
            setTitle(movie.title);
            setCoverImage(movie.coverImage);
            setPoster(movie.poster);
            setDescription(movie.description);
            setGenres(movie.genres);
            setLanguage(movie.language);
            setReleaseDate(movie.releaseDate);
            setDuration(movie.duration);
            setCasts(movie.casts);
            setCrews(movie.crews);
        }
    }, [movie]);

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
        setSaveRequire(true);
    };

    const handleFileInputChange = (setter) => (e) => {
        setter(e.target.files[0]);
        setSaveRequire(true);
    };

    const handleArrayChange = (index, array, setArray) => (e) => {
        const { name, value } = e.target;
        const newArray = [...array];
        newArray[index][name] = value;
        setArray(newArray);
        setSaveRequire(true);
    };

    const handleGenreChange = (selectedOptions) => {
        const newGenres = selectedOptions.map((option) => option.value);
        setGenres(newGenres);
        setSaveRequire(true);
    };

    const addArrayItem = (setArray, array) => () => {
        setArray([...array, { person: "", role: "" }]);
        setSaveRequire(true);
    };

    const removeArrayItem = (index, array, setArray) => () => {
        const newArray = array.filter((_, i) => i !== index);
        setArray(newArray);
        setSaveRequire(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!coverImage || !poster) {
            toast.warning("Upload movie cover image and poster before saving!");
            return;
        }

        setLoading(true);
        try {
            const movieData = {
                title,
                description,
                coverImage,
                poster,
                genres,
                language,
                releaseDate,
                duration,
                video,
                casts,
                crews,
            };

            if (movie) {
                await axiosInstance.put(
                    `/movies/${movie._id}`,
                    movieData
                );
                toast.success("Movie updated successfully!");
            } else {
                await axiosInstance.post(`/movies`, movieData);
                toast.success("Movie added successfully!");
            }
            setSaveRequire(false);
            onClose();
        } catch (error) {
            console.error("Error saving movie: ", error);
            toast.error("Error saving movie!");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async () => {
        if (movie && saveRequire) {
            toast.warning("You need to save the changes before leaving!");
            return;
        }

        if (!movie) {
            try {
                if (coverImage) {
                    await axiosInstance.delete(
                        `/upload/image/${coverImage.split("/").pop()}`
                    );
                }
                if (poster) {
                    await axiosInstance.delete(
                        `/upload/image/${poster.split("/").pop()}`
                    );
                }

                if (video) {
                    await axiosInstance.delete(
                        `/upload/video/${video.split("/").pop()}`
                    );
                }
            } catch (error) {
                console.error("Error deleting uploaded files:", error);
            }
        }
        onClose();
    };
    
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-lg w-[60%] h-[95%] max-h-screen overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">
                    {movie ? "Edit Movie" : "Add New Movie"}
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* Title */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Title</label>
                        <input
                            className="w-full px-3 py-2 border rounded"
                            type="text"
                            value={title}
                            onChange={handleInputChange(setTitle)}
                        />
                    </div>
                    {/* Description */}
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Description
                        </label>
                        <textarea
                            className="w-full px-3 py-2 border rounded"
                            value={description}
                            onChange={handleInputChange(setDescription)}
                        />
                    </div>
                    {/* Cover Image */}
                    <div className="flex flex-row justify-between">
                        <div className="mb-4">
                            <label className="block text-gray-700">
                                Cover Image
                            </label>
                            <input
                                className="w-full px-3 py-2 border rounded"
                                type="file"
                                onChange={handleFileInputChange(
                                    setCoverImageFile
                                )}
                            />
                        </div>
                        {coverImage && (
                            <>
                                <img
                                    src={coverImage}
                                    className="h-14 w-14 rounded-full"
                                />
                                {deletingCover ? (
                                    <AiOutlineLoading3Quarters className="animate-spin" />
                                ) : (
                                    <MdDeleteForever
                                        className="cursor-pointer"
                                        onClick={() =>
                                            handleImageFileDelete(
                                                coverImage,
                                                setCoverImage,
                                                setDeletingCover
                                            )
                                        }
                                    />
                                )}
                            </>
                        )}
                        <button
                            type="button"
                            onClick={() =>
                                handleImageFileUpload(
                                    coverImage,
                                    setCoverImage,
                                    setCoverImageFile,
                                    setUploadingCover,
                                    coverImageFile
                                )
                            }>
                            {uploadingCover ? (
                                <u className="cursor-not-allowed">
                                    Uploading...
                                </u>
                            ) : (
                                <u className="cursor-pointer">Upload</u>
                            )}
                        </button>
                    </div>
                    {/* Poster */}
                    <div className="flex flex-row justify-between">
                        <div className="mb-4">
                            <label className="block text-gray-700">
                                Poster
                            </label>
                            <input
                                className="w-full px-3 py-2 border rounded"
                                type="file"
                                onChange={handleFileInputChange(setPosterFile)}
                            />
                        </div>
                        {poster && (
                            <>
                                <img
                                    src={poster}
                                    className="h-14 w-14 rounded-full"
                                />
                                {deletingPoster ? (
                                    <AiOutlineLoading3Quarters className="animate-spin" />
                                ) : (
                                    <MdDeleteForever
                                        className="cursor-pointer"
                                        onClick={() =>
                                            handleImageFileDelete(
                                                poster,
                                                setPoster,
                                                setDeletingPoster
                                            )
                                        }
                                    />
                                )}
                            </>
                        )}
                        <button
                            type="button"
                            onClick={() =>
                                handleImageFileUpload(
                                    poster,
                                    setPoster,
                                    setPosterFile,
                                    setUploadingPoster,
                                    posterFile
                                )
                            }
                            className={
                                uploadingPoster
                                    ? "cursor-not-allowed"
                                    : "cursor-pointer"
                            }>
                            {uploadingPoster ? (
                                <u>Uploading...</u>
                            ) : (
                                <u>Upload</u>
                            )}
                        </button>
                    </div>
                    {/* Genre */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Genres</label>
                        <Select
                            isMulti
                            onChange={handleGenreChange}
                            options={genreOptions}
                        />
                    </div>
                    {/* Language */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Language</label>
                        <input
                            className="w-full px-3 py-2 border rounded"
                            type="text"
                            value={language}
                            onChange={handleInputChange(setLanguage)}
                        />
                    </div>
                    {/* Release Date */}
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Release Date
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded"
                            type="date"
                            value={releaseDate}
                            onChange={handleInputChange(setReleaseDate)}
                        />
                    </div>
                    {/* Duration */}
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Duration (hours)
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded"
                            type="number"
                            value={duration}
                            onChange={handleInputChange(setDuration)}
                        />
                    </div>
                    {/* Video */}
                    {(!movie || !movie.video) && (
                        <div className="flex flex-row justify-between">
                            <div className="mb-4">
                                <label className="block text-gray-700">
                                    Video
                                </label>
                                <input
                                    className="w-full px-3 py-2 border rounded"
                                    type="file"
                                    onChange={handleFileInputChange(
                                        setVideoFile
                                    )}
                                />
                            </div>
                            {video && (
                                <>
                                    {!uploadingVideo && (
                                        <MdCloudDone className="h-12 w-12" />
                                    )}
                                    {deletingVideo ? (
                                        <AiOutlineLoading3Quarters className="animate-spin" />
                                    ) : (
                                        <MdDeleteForever
                                            className="cursor-pointer"
                                            onClick={() =>
                                                handleVideoFileDelete(
                                                    video,
                                                    setVideo,
                                                    setDeletingVideo
                                                )
                                            }
                                        />
                                    )}
                                </>
                            )}
                            <button
                                type="button"
                                onClick={() =>
                                    handleVideoFileUpload(
                                        video,
                                        setVideo,
                                        setVideoFile,
                                        setUploadingVideo,
                                        videoFile
                                    )
                                }
                                className={
                                    uploadingVideo
                                        ? "cursor-not-allowed"
                                        : "cursor-pointer"
                                }>
                                {uploadingVideo ? (
                                    <u>Uploading...</u>
                                ) : (
                                    <u>Upload</u>
                                )}
                            </button>
                        </div>
                    )}
                    {/* Casts */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Casts</label>
                        {casts.map((cast, index) => (
                            <div key={index} className="flex mb-2">
                                <select
                                    name="person"
                                    value={cast.person}
                                    onChange={handleArrayChange(
                                        index,
                                        casts,
                                        setCasts
                                    )}
                                    className="w-full px-3 py-2 border rounded mr-2">
                                    <option value="">Select a cineast</option>
                                    {cineasts.map((cineast) => (
                                        <option
                                            key={cineast._id}
                                            value={cineast._id}>
                                            {cineast.name}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    name="role"
                                    value={cast.role}
                                    onChange={handleArrayChange(
                                        index,
                                        casts,
                                        setCasts
                                    )}
                                    className="w-full px-3 py-2 border rounded"
                                    type="text"
                                    placeholder="Role"
                                />
                                <button
                                    type="button"
                                    onClick={removeArrayItem(
                                        index,
                                        casts,
                                        setCasts
                                    )}
                                    className="ml-2 px-3 py-2 bg-red-500 text-white rounded">
                                    -
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addArrayItem(setCasts, casts)}
                            className="mt-2 px-3 py-2 bg-green-500 text-white rounded">
                            Add Cast
                        </button>
                    </div>
                    {/* Crews */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Crews</label>
                        {crews.map((crew, index) => (
                            <div key={index} className="flex mb-2">
                                <select
                                    name="person"
                                    value={crew.person}
                                    onChange={handleArrayChange(
                                        index,
                                        crews,
                                        setCrews
                                    )}
                                    className="w-full px-3 py-2 border rounded mr-2">
                                    <option value="">Select a cineast</option>
                                    {cineasts.map((cineast) => (
                                        <option
                                            key={cineast._id}
                                            value={cineast._id}>
                                            {cineast.name}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    name="role"
                                    value={crew.role}
                                    onChange={handleArrayChange(
                                        index,
                                        crews,
                                        setCrews
                                    )}
                                    className="w-full px-3 py-2 border rounded"
                                    type="text"
                                    placeholder="Role"
                                />
                                <button
                                    type="button"
                                    onClick={removeArrayItem(
                                        index,
                                        crews,
                                        setCrews
                                    )}
                                    className="ml-2 px-3 py-2 bg-red-500 text-white rounded">
                                    -
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addArrayItem(setCrews, crews)}
                            className="mt-2 px-3 py-2 bg-green-500 text-white rounded">
                            Add Crew
                        </button>
                    </div>
                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                            onClick={() => handleCancel()}
                            type="button">
                            Cancel
                        </button>
                        {loading ? (
                            <button className="bg-blue-400 text-white py-2 px-4 rounded cursor-not-allowed">
                                Saving...
                            </button>
                        ) : (
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded"
                                type="submit">
                                Save
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MovieModal;
