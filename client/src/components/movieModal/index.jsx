// src/components/MovieModal.jsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "sonner";
import classNames from "classnames";
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
  { value: "Mystery", label: "Mystery" },
  { value: "Crime", label: "Crime" },
  { value: "Horror", label: "Horror" },
  { value: "History", label: "History" },
  { value: "Documentary", label: "Documentary" },
  { value: "Classic", label: "Classic" },
  { value: "Other", label: "Other" },
];

const MovieModal = ({ movie, onClose }) => {
  const [isPremium, setIsPremium] = useState(false);
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
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingPoster, setUploadingPoster] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [deletingCover, setDeletingCover] = useState(false);
  const [deletingPoster, setDeletingPoster] = useState(false);
  const [deletingVideo, setDeletingVideo] = useState(false);
  const [loading, setSaving] = useState(false);
  const [saveRequire_Cover, setSaveRequire_Cover] = useState(false);
  const [saveRequire_Poster, setSaveRequire_Poster] = useState(false);

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
  };

  const handleArrayChange = (index, array, setArray) => (e) => {
    const { name, value } = e.target;
    const newArray = [...array];
    newArray[index][name] = value;
    setArray(newArray);
  };

  const handleGenreChange = (selectedOptions) => {
    const newGenres = selectedOptions.map((option) => option.value);
    setGenres(newGenres);
  };

  const addArrayItem = (setArray, array) => () => {
    setArray([...array, { person: "", role: "" }]);
  };

  const removeArrayItem = (index, array, setArray) => () => {
    const newArray = array.filter((_, i) => i !== index);
    setArray(newArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!coverImage || !poster) {
      toast.warning("Upload movie cover image and poster before saving!");
      return;
    }

    setSaving(true);
    try {
      const movieData = {
        isPremium,
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
        await axiosInstance.put(`/movies/${movie._id}`, movieData);
        toast.success("Movie updated successfully!");
      } else {
        await axiosInstance.post(`/movies`, movieData);
        toast.success("Movie added successfully!");
      }
      setSaveRequire_Cover(false);
      setSaveRequire_Poster(false);
      onClose();
    } catch (error) {
      console.error("Error saving movie: ", error);
      toast.error("Error saving movie!");
    } finally {
      setSaving(false);
    }
  };
  console.log(movie);

  const handleCancel = async () => {
    if (movie) {
      if (
        !coverImage ||
        !poster ||
        saveRequire_Cover ||
        saveRequire_Poster ||
        video
      ) {
        toast.warning("You need to save the changes before leaving!");
        return;
      }
    } else if (!movie && (coverImage || poster || video)) {
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
          await axiosInstance.delete(`/upload/video/${video.split("/").pop()}`);
        }
      } catch (error) {
        console.error("Error deleting uploaded files:", error);
      }
    }
    onClose();
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      padding: "4px 8px",
      borderRadius: "0.375rem",
      borderColor: state.isFocused ? "#e1251a" : "#d1d5db",
      backgroundColor: "#232222",
      color: "#ffffff",
      fontSize: "16px",
      boxShadow: state.isFocused ? "0 0 0 1px #e1251a" : null,
      "&:hover": {
        borderColor: "#e1251a",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#232222",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#e1251a",
      color: "#ffffff",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#ffffff",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#ffffff",
      ":hover": {
        backgroundColor: "#e1251a",
        color: "#000000",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#e1251a"
        : state.isFocused
        ? "#374151"
        : "#232222",
      color: "#ffffff",
    }),
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background1  bg-opacity-50">
      <div className="bg-shadow p-5 sm:p-8 rounded shadow-lg w-[85%] h-[95%] md:w-[80%] lg:w-[60%]  max-h-screen overflow-y-auto">
        <h2 className="text-3xl font-montserrat text-primary_text font-bold mb-4">
          {movie ? "Edit Movie" : "Add New Movie"}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label className="block text-xl font-lato text-primary_text">
              Title
            </label>
            <input
              className="px-4 gap-x-3 w-full py-2 border border-primary_text  text-primary_text bg-shadow rounded-lg  focus:outline-none focus:border focus:border-highlight"
              type="text"
              required
              value={title}
              onChange={handleInputChange(setTitle)}
            />
          </div>
          {/* Free or Premium */}
          <div className="mb-4 flex flex-col sm:flex-row items-start gap-3">
            <label className="text-xl font-lato text-primary_text">
              Choose whether free or premium view:
            </label>
            <div className="flex items-center justify-center">
              <input
                type="radio"
                name="plan"
                value="Free"
                checked={!isPremium}
                onChange={() => setIsPremium(false)}
                className="form-radio h-5 w-5 text-highlight"
              />
              <span className="ml-2 text-xl font-lato text-primary_text">
                Free
              </span>
            </div>
            <div className="flex items-center justify-center">
              <input
                type="radio"
                name="plan"
                value="Premium"
                checked={isPremium}
                onChange={() => setIsPremium(true)}
                className="form-radio h-5 w-5 text-highlight"
              />
              <span className="ml-2 text-xl font-lato text-primary_text">
                Premium
              </span>
            </div>
          </div>
          {/* Description */}
          <div className="mb-4">
            <label className="block text-xl font-lato text-primary_text">
              Description
            </label>
            <textarea
              className="px-4 gap-x-3 w-full py-2 border  h-32 border-primary_text  text-primary_text bg-shadow rounded-lg  focus:outline-none focus:border focus:border-highlight"
              value={description}
              required
              onChange={handleInputChange(setDescription)}
            />
          </div>
          {/* Cover Image */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <label className="block text-xl font-lato text-primary_text ">
              Cover Image
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {uploadingCover ? (
                <label className="bg-highlight hover:bg-highlight_hover text-primary_text px-4 py-2 rounded font-bold transition-all duration-300 cursor-pointer">
                  Uploading image...
                </label>
              ) : (
                <label
                  className="bg-highlight hover:bg-highlight_hover text-primary_text px-4 py-2 rounded font-bold transition-all duration-300 cursor-pointer"
                  htmlFor="coverImageUpload"
                >
                  Upload image
                </label>
              )}
              <input
                id="coverImageUpload"
                type="file"
                // required
                className="hidden"
                onChange={(e) => {
                  setSaveRequire_Cover(true);
                  handleImageFileUpload(
                    e.target.files[0],
                    coverImage,
                    setCoverImage,
                    setUploadingCover
                  );
                }}
              />
              {coverImage && (
                <div className="w-fit flex items-center gap-x-3">
                  <img
                    src={coverImage}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  {deletingCover ? (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  ) : (
                    <MdDeleteForever
                      size={46}
                      className="cursor-pointer h-8 w-8 rounded-lg bg-primary_text hover:bg-red-800 text-highlight hover:text-primary_text"
                      onClick={() => {
                        setSaveRequire_Cover(false);
                        handleImageFileDelete(
                          coverImage,
                          setCoverImage,
                          setDeletingCover
                        );
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
          {/* Poster */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <label className="block text-xl font-lato text-primary_text">
              Poster Image
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {uploadingPoster ? (
                <label className="bg-highlight hover:bg-highlight_hover text-primary_text px-4 py-2 rounded font-bold transition-all duration-300 cursor-pointer">
                  Uploading image...
                </label>
              ) : (
                <label
                  className="bg-highlight hover:bg-highlight_hover text-primary_text px-4 py-2 rounded font-bold transition-all duration-300 cursor-pointer"
                  htmlFor="posterUpload"
                >
                  Upload image
                </label>
              )}
              <input
                id="posterUpload"
                type="file"
                // required
                className="hidden"
                onChange={(e) => {
                  setSaveRequire_Poster(true);
                  handleImageFileUpload(
                    e.target.files[0],
                    poster,
                    setPoster,
                    setUploadingPoster
                  );
                }}
              />
              {poster && (
                <div className="w-fit flex items-center gap-x-3">
                  <img
                    src={poster}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  {deletingPoster ? (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  ) : (
                    <MdDeleteForever
                      size={46}
                      className="cursor-pointer h-8 w-8 rounded-lg bg-primary_text hover:bg-red-800 text-highlight hover:text-primary_text"
                      onClick={() => {
                        setSaveRequire_Poster(false);
                        handleImageFileDelete(
                          poster,
                          setPoster,
                          setDeletingPoster
                        );
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
          {/* Genre */}
          <div className="mb-4">
            <label className="block text-xl font-lato text-primary_text">
              Genres
            </label>
            <Select
              isMulti
              onChange={handleGenreChange}
              options={genreOptions}
              styles={customStyles}
              classNamePrefix="react-select" // Add a prefix to make it easier to target with Tailwind
            />
          </div>
          {/* Language */}
          <div className="mb-4">
            <label className="block text-xl font-lato text-primary_text">
              Language
            </label>
            <input
              className="px-4 gap-x-3 w-full py-2 border border-primary_text  text-primary_text bg-shadow rounded-lg  focus:outline-none focus:border focus:border-highlight"
              type="text"
              required
              value={language}
              onChange={handleInputChange(setLanguage)}
            />
          </div>

          {/* Release Date */}
          <div className="mb-4">
            <label className="block text-xl font-lato text-primary_text">
              Release Date
            </label>
            <input
              className="px-4 gap-x-3 w-full py-2 border border-primary_text  text-primary_text bg-shadow rounded-lg  focus:outline-none focus:border focus:border-highlight"
              type="date"
              // required
              value={releaseDate}
              onChange={handleInputChange(setReleaseDate)}
            />
          </div>
          {/* Duration */}
          <div className="mb-4">
            <label className="block text-xl font-lato text-primary_text">
              Duration (hours)
            </label>
            <input
              className="px-4 gap-x-3 w-full py-2 border border-primary_text  text-primary_text bg-shadow rounded-lg  focus:outline-none focus:border focus:border-highlight"
              type="number"
              // required
              value={duration}
              onChange={handleInputChange(setDuration)}
            />
          </div>
          {/* Video */}
          {(!movie || !movie.video) && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
              <label className="block text-xl font-lato text-primary_text ">
                Movie Video
              </label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                {uploadingVideo ? (
                  <label className="bg-highlight hover:bg-highlight_hover text-primary_text px-4 py-2 rounded font-bold transition-all duration-300 cursor-pointer">
                    Uploading video...
                  </label>
                ) : (
                  <label
                    className="bg-highlight hover:bg-highlight_hover text-primary_text px-4 py-2 rounded font-bold transition-all duration-300 cursor-pointer"
                    htmlFor="videoUpload"
                  >
                    Upload video
                  </label>
                )}
                <input
                  id="videoUpload"
                  type="file"
                  // required
                  className="hidden"
                  onChange={(e) =>
                    handleVideoFileUpload(
                      e.target.files[0],
                      video,
                      setVideo,
                      setUploadingVideo
                    )
                  }
                />
                {video && (
                  <div className="w-fit flex items-center gap-x-3 ">
                    {!uploadingVideo && <MdCloudDone className="h-12 w-12" />}
                    {deletingVideo ? (
                      <AiOutlineLoading3Quarters className="animate-spin" />
                    ) : (
                      <MdDeleteForever
                        size={46}
                        className="cursor-pointer h-8 w-8 rounded-lg bg-primary_text hover:bg-red-800 text-highlight hover:text-primary_text"
                        onClick={() =>
                          handleVideoFileDelete(
                            video,
                            setVideo,
                            setDeletingVideo
                          )
                        }
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Casts */}
          <div className="mb-4">
            <label className="block text-xl font-lato text-primary_text">
              Casts
            </label>
            {casts.map((cast, index) => (
              <div key={index} className="flex mb-3">
                <select
                  name="person"
                  // required
                  value={cast.person}
                  onChange={handleArrayChange(index, casts, setCasts)}
                  className="px-4 gap-x-3 w-full py-2 border border-primary_text  text-primary_text bg-shadow rounded-lg  focus:outline-none focus:border focus:border-highlight mr-2"
                >
                  <option value="">Select a cineast</option>
                  {cineasts
                    .slice()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((cineast) => (
                      <option key={cineast._id} value={cineast._id}>
                        {cineast.name}
                      </option>
                    ))}
                </select>
                <input
                  name="role"
                  value={cast.role}
                  onChange={handleArrayChange(index, casts, setCasts)}
                  className="px-4 gap-x-3 w-full py-2 border border-primary_text  text-primary_text bg-shadow rounded-lg  focus:outline-none focus:border focus:border-highlight"
                  type="text"
                  placeholder="Role"
                />
                <button
                  type="button"
                  onClick={removeArrayItem(index, casts, setCasts)}
                  className="ml-2 px-3 py-2 bg-primary_text hover:bg-red-800 text-highlight hover:text-primary_text rounded"
                >
                  -
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addArrayItem(setCasts, casts)}
              className="bg-highlight hover:bg-highlight_hover text-primary_text px-4 py-2 rounded font-bold transition-all duration-300"
            >
              Add Cast
            </button>
          </div>

          {/* Crews */}
          <div className="mb-4">
            <label className="block text-xl font-lato text-primary_text">
              Crews
            </label>
            {crews.map((crew, index) => (
              <div key={index} className="flex mb-3">
                <select
                  name="person"
                  // required
                  value={crew.person}
                  onChange={handleArrayChange(index, crews, setCrews)}
                  className="px-4 gap-x-3 w-full py-2 border border-primary_text  text-primary_text bg-shadow rounded-lg  focus:outline-none focus:border focus:border-highlight mr-2"
                >
                  <option value="">Select a cineast</option>
                  {cineasts
                    .slice()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((cineast) => (
                      <option key={cineast._id} value={cineast._id}>
                        {cineast.name}
                      </option>
                    ))}
                </select>
                <input
                  name="role"
                  value={crew.role}
                  onChange={handleArrayChange(index, crews, setCrews)}
                  className="px-4 gap-x-3 w-full py-2 border border-primary_text  text-primary_text bg-shadow rounded-lg  focus:outline-none focus:border focus:border-highlight"
                  type="text"
                  placeholder="Role"
                />
                <button
                  type="button"
                  onClick={removeArrayItem(index, crews, setCrews)}
                  className="ml-2 px-3 py-2 bg-primary_text hover:bg-red-800 text-highlight hover:text-primary_text rounded"
                >
                  -
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addArrayItem(setCrews, crews)}
              className="bg-highlight hover:bg-highlight_hover text-primary_text px-4 py-2 rounded font-bold transition-all duration-300"
            >
              Add Crew
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              className="bg-gray-500 hover:text-gray-700 text-primary_text px-4 py-2 rounded mr-2 transition-all duration-300 font-bold"
              onClick={() => handleCancel()}
              type="button"
            >
              Cancel
            </button>
            {loading ? (
              <button className="bg-highlight hover:bg-highlight_hover text-primary_text px-4 py-2 rounded font-bold transition-all duration-300 cursor-not-allowed">
                Saving...
              </button>
            ) : (
              <button
                className="bg-highlight hover:bg-highlight_hover text-primary_text px-4 py-2 rounded font-bold transition-all duration-300"
                type="submit"
              >
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
