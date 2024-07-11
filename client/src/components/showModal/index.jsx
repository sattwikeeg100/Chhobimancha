// src/components/ShowModal.jsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "sonner";
import {
  handleImageFileDelete,
  handleImageFileUpload,
} from "../../utils/fileHandler";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ShowModal = ({ show, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [poster, setPoster] = useState(null);
  const [language, setLanguage] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [frontStall, setFrontStall] = useState(0);
  const [rearStall, setRearStall] = useState(0);
  const [balcony, setBalcony] = useState(0); // TODO: Remove the files state
  const [theatres, setTheatres] = useState([]);
  const [selectedTheatre, setSelectedTheatre] = useState("");
  const [casts, setCasts] = useState([{ person: "", role: "" }]);
  const [crews, setCrews] = useState([{ person: "", role: "" }]);
  const [cineasts, setCineasts] = useState([]);
  const [uploadingPoster, setUploadingPoster] = useState(false);
  const [deletingPoster, setDeletingPoster] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveRequire, setSaveRequire] = useState(false);

  useEffect(() => {
    if (show) {
      setTitle(show.title);
      setDescription(show.description);
      setPoster(show.poster);
      setLanguage(show.language);
      setDate(show.date);
      setTime(show.time);
      setFrontStall(show.ticketPrice.frontStall);
      setRearStall(show.ticketPrice.rearStall);
      setBalcony(show.ticketPrice.balcony);
      setSelectedTheatre(show.theatre || "");
      setCasts(show.casts);
      setCrews(show.crews);
    }
    fetchTheatres();
    fetchCineasts();
  }, [show]);

  const fetchTheatres = async () => {
    try {
      const response = await axiosInstance.get(`/theatres`);
      setTheatres(response.data);
    } catch (error) {
      console.error("Error fetching theatres:", error);
    }
  };

  const fetchCineasts = async () => {
    try {
      const response = await axiosInstance.get(`/cineasts`);
      setCineasts(response.data);
    } catch (error) {
      console.error("Error fetching cineasts:", error);
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  }; // TODO:

  // TODO: Remove the handleFile change

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!poster) {
      toast.warning("Upload show poster before saving!");
      return;
    }
    setLoading(true);
    try {
      const showData = {
        title,
        description,
        poster,
        language,
        date,
        time,
        ticketPrice: { frontStall, rearStall, balcony },
        theatre: selectedTheatre,
        casts,
        crews,
      };

      if (show) {
        await axiosInstance.put(`/shows/${show._id}`, showData);
        toast.success("Show updated successfully!");
      } else {
        await axiosInstance.post(`/shows`, showData);
        toast.success("Show added successfully!");
      }
      setSaveRequire(false);
      onClose();
    } catch (error) {
      console.error("Error saving show:", error);
      toast.error("Error saving show!");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    // TODO:
    if (show) {
      if (!poster || saveRequire) {
        toast.warning("You need to save the changes before leaving!");
        return;
      }
    } else if (poster) {
      try {
        await axiosInstance.delete(`/upload/image/${poster.split("/").pop()}`);
      } catch (error) {
        console.error("Error deleting uploaded file:", error);
      }
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background1  bg-opacity-50">
      <div className="bg-shadow p-8 rounded shadow-lg w-[60%] h-[95%] max-h-screen overflow-y-auto">
        <h2 className="text-3xl font-montserrat text-primary_text font-bold mb-4">
          {show ? "Edit Show" : "Add New Show"}
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
              value={title}
              onChange={handleInputChange(setTitle)}
            />
          </div>
          {/* Description */}
          <div className="mb-4">
            <label className="block text-xl font-lato text-primary_text">
              Description
            </label>
            <textarea
              className="px-4 gap-x-3 w-full py-2 border border-primary_text  text-primary_text bg-shadow rounded-lg  focus:outline-none focus:border focus:border-highlight"
              value={description}
              onChange={handleInputChange(setDescription)}
            />
          </div>
          {/* Poster TODO: */}
          <div className="flex flex-row items-center justify-between ">
            <label className="block text-xl font-lato text-primary_text ">
              Show Poster
            </label>
            <div className="flex items-center gap-x-3">
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
                className="hidden"
                onChange={(e) => {
                  // TODO:
                  setSaveRequire(true);
                  handleImageFileUpload(
                    e.target.files[0],
                    poster,
                    setPoster,
                    setUploadingPoster
                  );
                }}
              />
              {poster && (
                <div className="w-fit flex items-center gap-x-3 ">
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
                        // TODO:
                        setSaveRequire(false);
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
          {/* Language */}
          <div className="mb-4">
            <label className="block text-xl font-lato text-primary_text">
              Language
            </label>
            <input
              className="px-4 gap-x-3 w-full py-2 border border-primary_text  text-primary_text bg-shadow rounded-lg  focus:outline-none focus:border focus:border-highlight"
              type="text"
              value={language}
              onChange={handleInputChange(setLanguage)}
            />
          </div>
          {/* Date */}
          <div className="mb-4">
            <label className="block text-xl font-lato text-primary_text">
              Date
            </label>
            <input
              className="px-4 gap-x-3 w-full py-2 border border-primary_text  text-primary_text bg-shadow rounded-lg  focus:outline-none focus:border focus:border-highlight"
              type="date"
              value={date}
              onChange={handleInputChange(setDate)}
            />
          </div>
          {/* Time */}
          <div className="mb-4">
            <label className="block text-xl font-lato text-primary_text">
              Time
            </label>
            <input
              className="px-4 gap-x-3 w-full py-2 border border-primary_text  text-primary_text bg-shadow rounded-lg  focus:outline-none focus:border focus:border-highlight"
              type="time"
              value={time}
              onChange={handleInputChange(setTime)}
            />
          </div>
          {/* Ticket Price */}
          <label className="block text-xl font-lato text-primary_text">
            Ticket Prices
          </label>
          <div className="flex flex-row w-full justify-between mt-2">
            <div className="mb-4">
              <label className="block text-primary_text text-sm">
                Front Stall
              </label>
              <input
                className="px-4 gap-x-3 w-full py-2 border border-primary_text  text-primary_text bg-shadow rounded-lg  focus:outline-none focus:border focus:border-highlight"
                type="number"
                value={frontStall}
                onChange={handleInputChange(setFrontStall)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-primary_text text-sm">
                Rear Stall
              </label>
              <input
                className="px-4 gap-x-3 w-full py-2 border border-primary_text  text-primary_text bg-shadow rounded-lg  focus:outline-none focus:border focus:border-highlight"
                type="number"
                value={rearStall}
                onChange={handleInputChange(setRearStall)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-primary_text text-sm">Balcony</label>
              <input
                className="px-4 gap-x-3 w-full py-2 border border-primary_text  text-primary_text bg-shadow rounded-lg  focus:outline-none focus:border focus:border-highlight"
                type="number"
                value={balcony}
                onChange={handleInputChange(setBalcony)}
              />
            </div>
          </div>
          {/* Theatre */}
          <div className="mb-4">
            <label className="block text-xl font-lato text-primary_text">
              Theatre
            </label>
            <select
              className="px-4 gap-x-3 w-full py-2 border border-primary_text  text-primary_text bg-shadow rounded-lg  focus:outline-none focus:border focus:border-highlight"
              value={selectedTheatre}
              onChange={handleInputChange(setSelectedTheatre)}
            >
              <option value="">Select a theatre</option>
              {theatres.map((theatre) => (
                <option key={theatre._id} value={theatre._id}>
                  {theatre.name}
                </option>
              ))}
            </select>
          </div>

          {/* Casts */}

          <div className="mb-4">
            <label className="block text-xl font-lato text-primary_text">
              Casts
            </label>
            {casts.map((cast, index) => (
              <div key={index} className="flex mb-2">
                <select
                  name="person"
                  value={cast.person}
                  onChange={handleArrayChange(index, casts, setCasts)}
                  className="px-4 gap-x-3 w-full py-2 border border-primary_text  text-primary_text bg-shadow rounded-lg  focus:outline-none focus:border focus:border-highlight mr-2"
                >
                  <option value="">Select a cineast</option>
                  {cineasts.map((cineast) => (
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
              <div key={index} className="flex mb-2">
                <select
                  name="person"
                  value={crew.person}
                  onChange={handleArrayChange(index, crews, setCrews)}
                  className="px-4 gap-x-3 w-full py-2 border border-primary_text  text-primary_text bg-shadow rounded-lg  focus:outline-none focus:border focus:border-highlight mr-2"
                >
                  <option value="">Select a cineast</option>
                  {cineasts.map((cineast) => (
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

export default ShowModal;
