import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "sonner";
import {
  handleImageFileDelete,
  handleImageFileUpload,
} from "../../utils/fileHandler";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CineastModal = ({ cineast, onClose }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [details, setDetails] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [deletingImage, setDeletingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveRequire, setSaveRequire] = useState(false);

  useEffect(() => {
    if (cineast) {
      setName(cineast.name);
      setImage(cineast.image);
      setDetails(cineast.details);
    }
  }, [cineast]);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.warning("Upload cineast image before saving!");
      return;
    }
    setLoading(true);
    try {
      if (cineast) {
        await axiosInstance.put(`/cineasts/${cineast._id}`, {
          name,
          image,
          details,
        });
        toast.success("Cineast updated successfully!");
      } else {
        await axiosInstance.post(`/cineasts`, {
          name,
          image,
          details,
        });
        toast.success("Cineast added successfully!");
      }
      setSaveRequire(false);
      onClose();
    } catch (error) {
      console.error("Error saving cineast:", error);
      toast.error("Error saving cineast");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (cineast) {
      if (!image || saveRequire) {
        toast.warning("You need to save the changes before leaving!");
        return;
      }
    } else if (image) {
      try {
        await axiosInstance.delete(`/upload/image/${image.split("/").pop()}`);
      } catch (error) {
        console.error("Error deleting uploaded file:", error);
      }
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background1 bg-opacity-50">
      <div className="bg-shadow p-8 lg:w-[40%] md:w-[60%] w-full m-4 rounded shadow-lg">
        <h2 className="text-3xl font-montserrat text-primary_text font-bold mb-4">
          {cineast ? "Edit Cineast" : "Add New Cineast"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col  gap-y-5">
          {/* Name */}
          <div>
            <label className="block text-xl font-lato text-primary_text">
              Name
            </label>
            <input
              className="px-4 gap-x-3 w-full py-2 border border-primary_text  text-primary_text bg-shadow rounded-lg  focus:outline-none focus:border focus:border-highlight "
              type="text"
              value={name}
              required
              onChange={handleInputChange(setName)}
            />
          </div>
          {/* Image */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ">
            <label className="block text-xl font-lato text-primary_text ">
              Cineast Photo
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {uploadingImage ? (
                <label className="bg-highlight hover:bg-highlight_hover text-primary_text px-4 py-2 rounded font-bold transition-all duration-300 cursor-pointer">
                  Uploading image...
                </label>
              ) : (
                <label
                  className="bg-highlight hover:bg-highlight_hover text-primary_text px-4 py-2 rounded font-bold transition-all duration-300 cursor-pointer"
                  htmlFor="imageUpload"
                >
                  Upload image
                </label>
              )}
              <input
                id="imageUpload"
                type="file"
                className="hidden"
                required
                onChange={(e) => {
                  setSaveRequire(true);
                  handleImageFileUpload(
                    e.target.files[0],
                    image,
                    setImage,
                    setUploadingImage
                  );
                }}
              />
              {image && (
                <div className="w-fit flex items-center gap-x-3 ">
                  <img
                    src={image}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  {deletingImage ? (
                    <AiOutlineLoading3Quarters className="animate-spin text-primary_text" />
                  ) : (
                    <MdDeleteForever
                      className="cursor-pointer h-8 w-8 rounded-lg bg-primary_text hover:bg-red-800 text-highlight hover:text-primary_text"
                      onClick={() => {
                        setSaveRequire(false);
                        handleImageFileDelete(
                          image,
                          setImage,
                          setDeletingImage
                        );
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
          {/* Details */}
          <div className="">
            <label className="block text-xl font-lato text-primary_text">
              Details
            </label>
            <textarea
              className="px-4 gap-x-3 w-full py-2 border border-primary_text  text-primary_text bg-shadow rounded-lg  h-36 focus:outline-none focus:border focus:border-highlight "
              value={details}
              onChange={handleInputChange(setDetails)}
            />
          </div>

          <div className="flex justify-end">
            <button
              className="bg-gray-500 hover:text-gray-700 text-primary_text px-4 py-2 rounded mr-2 transition-all duration-300 font-bold"
              onClick={() => handleCancel()}
              type="button"
            >
              Cancel
            </button>
            {loading ? (
              <button
                className="bg-highlight hover:bg-highlight_hover text-primary_text px-4 py-2 rounded font-bold transition-all duration-300 cursor-not-allowed"
                type="submit"
              >
                Saving...
              </button>
            ) : (
              <button
                className="bg-highlight hover:bg-highlight_hover text-primary_text px-4 py-2 rounded font-bold transition-all duration-300 "
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

export default CineastModal;
