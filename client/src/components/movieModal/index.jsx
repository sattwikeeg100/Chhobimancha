// src/components/MovieModal.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const APIURL = import.meta.env.VITE_API_URL;

const MovieModal = ({ movie, onClose }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [coverImage, setCoverImage] = useState(null);
    const [poster, setPoster] = useState(null);
    const [video, setVideo] = useState(null);
    const [genre, setGenre] = useState("");
    const [language, setLanguage] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [duration, setDuration] = useState("");
    const [casts, setCasts] = useState([{ person: "", role: "" }]);
    const [crews, setCrews] = useState([{ person: "", role: "" }]);
    const [cineasts, setCineasts] = useState([]);
    const [user, setUser] = useState(null);
    const [coverImageFile, setCoverImageFile] = useState(null);
    const [posterFile, setPosterFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        fetchCineasts();
    }, []);

    const fetchCineasts = async () => {
        try {
            const response = await axios.get(`${APIURL}/cineasts`);
            setCineasts(response.data);
        } catch (error) {
            console.error("Error fetching cineasts:", error);
        }
    };

    useEffect(() => {
        if (movie) {
            setTitle(movie.title);
            setDescription(movie.description);
            setGenre(movie.genre);
            setLanguage(movie.language);
            setReleaseDate(movie.releaseDate);
            setDuration(movie.duration);
            setCasts(movie.casts);
            setCrews(movie.crews);
        }
    }, [movie]);

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const handleFileInputChange = (setter) => (e) => {
        setter(e.target.files[0]);
    };

    const handleArrayChange = (index, array, setArray) => (e) => {
        const { name, value } = e.target;
        const newArray = [...array];
        newArray[index][name] = value;
        setArray(newArray);
    };

    const addArrayItem = (setArray, array) => () => {
        setArray([...array, { person: "", role: "" }]);
    };

    const removeArrayItem = (index, array, setArray) => () => {
        const newArray = array.filter((_, i) => i !== index);
        setArray(newArray);
    };

    const handleImageFileUpload = async (urlSetter, fileSetter, file) => {
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            try {
                const response = await axios.post(
                    `${APIURL}/upload/image`,
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );
                urlSetter(response.data.url);
                fileSetter(null);
                console.log(response.data.url);
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        } else {
            return;
        }
    };

    const handleVideoFileUpload = async (urlSetter, fileSetter, file) => {
        if (file) {
            const formData = new FormData();
            formData.append("video", file);
            try {
                const response = await axios.post(
                    `${APIURL}/upload/video`,
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );
                urlSetter(response.data.url);
                fileSetter(null);
                console.log(response.data.url);
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        } else {
            return;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const movieData = {
                title,
                description,
                coverImage,
                poster,
                genre,
                language,
                releaseDate,
                duration,
                video,
                casts,
                crews,
            };

            if (movie) {
                await axios.put(`${APIURL}/movies/${movie._id}`, movieData, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
            } else {
                await axios.post(`${APIURL}/movies`, movieData, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
            }
            onClose();
        } catch (error) {
            console.error("Error saving movie:", error);
        }
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
                    {!movie && (
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
                            <button
                                type="button"
                                onClick={() =>
                                    handleImageFileUpload(
                                        setCoverImage,
                                        setCoverImageFile,
                                        coverImageFile
                                    )
                                }>
                                <u>Upload</u>
                            </button>
                        </div>
                    )}
                    {/* Poster */}
                    {!movie && (
                        <div className="flex flex-row justify-between">
                            <div className="mb-4">
                                <label className="block text-gray-700">
                                    Poster
                                </label>
                                <input
                                    className="w-full px-3 py-2 border rounded"
                                    type="file"
                                    onChange={handleFileInputChange(
                                        setPosterFile
                                    )}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={() =>
                                    handleImageFileUpload(
                                        setPoster,
                                        setPosterFile,
                                        posterFile
                                    )
                                }>
                                <u>Upload</u>
                            </button>
                        </div>
                    )}
                    {/* Genre */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Genre</label>
                        <input
                            className="w-full px-3 py-2 border rounded"
                            type="text"
                            value={genre}
                            onChange={handleInputChange(setGenre)}
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
                            Duration (minutes)
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded"
                            type="number"
                            value={duration}
                            onChange={handleInputChange(setDuration)}
                        />
                    </div>
                    {/* Video */}
                    {!movie && (
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
                            <button
                                type="button"
                                onClick={() =>
                                    handleVideoFileUpload(
                                        setVideo,
                                        setVideoFile,
                                        videoFile
                                    )
                                }>
                                <u>Upload</u>
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
                            onClick={onClose}
                            type="button">
                            Cancel
                        </button>
                        <button
                            className="bg-blue-500 text-white py-2 px-4 rounded"
                            type="submit">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MovieModal;