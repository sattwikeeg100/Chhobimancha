// src/components/theatreModal
import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosInstance";
import { toast } from "sonner";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  handleImageFileDelete,
  handleImageFileUpload,
} from "../../utils/fileHandler";

const TheatreModal = ({ theatre, onClose }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [owner, setOwner] = useState("");
  const [address, setAddress] = useState("");
  const [addressName, setAddressName] = useState("");
  const [phone, setPhone] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [deletingImage, setDeletingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveRequire, setSaveRequire] = useState(false);

  useEffect(() => {
    if (theatre) {
      setName(theatre.name);
      setImage(theatre.image);
      setOwner(theatre.owner);
      setAddress(theatre.address);
      setAddressName(theatre.addressName);
      setPhone(theatre.phone);
    }
  }, [theatre]);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.warning("Upload theatre image before saving!");
      return;
    }
    setLoading(true);
    try {
      if (theatre) {
        await axiosInstance.put(`/theatres/${theatre._id}`, {
          name,
          owner,
          image,
          address,
          addressName,
          phone,
        });
        toast.success("Theatre updated successfully!");
      } else {
        await axiosInstance.post(`/theatres`, {
          name,
          owner,
          image,
          address,
          addressName,
          phone,
        });
        toast.success("Theatre added successfully! ");
      }
      setSaveRequire(false);
      onClose();
    } catch (error) {
      console.error("Error saving theatre:", error);
      toast.error("Error Updating Theatre!");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (theatre) {
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
      <div className="bg-shadow p-5 sm:p-8 rounded shadow-lg w-[85%] h-[95%] md:w-[80%] lg:w-[60%] lg:h-auto  max-h-screen overflow-y-auto">
        <h2 className="text-3xl font-montserrat text-primary_text font-bold mb-4">
          {theatre ? "Edit Theatre" : "Add New Theatre"}
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
              required
              value={name}
              onChange={handleInputChange(setName)}
            />
          </div>
          {/* Image */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between ">
            <label className="block text-xl font-lato text-primary_text ">
              Theatre Photo
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
                // required
                className="hidden"
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
          {/* Address */}
          <div>
            <label className="block text-xl font-lato text-primary_text">
              Address
            </label>
            <input
              className="px-4 gap-x-3 w-full py-2 border border-primary_text  text-primary_text bg-shadow rounded-lg  focus:outline-none focus:border focus:border-highlight "
              type="text"
              required
              value={address}
              onChange={handleInputChange(setAddress)}
            />
          </div>

          <div>
            <label className="block text-xl font-lato text-primary_text">
              Address Name
            </label>
            <input
              className="px-4 gap-x-3 w-full py-2 border border-primary_text  text-primary_text bg-shadow rounded-lg  focus:outline-none focus:border focus:border-highlight "
              type="text"
              value={addressName}
              onChange={handleInputChange(setAddressName)}
            />
          </div>

          {/* Owner */}
          <div>
            <label className="block text-xl font-lato text-primary_text">
              Owner Name
            </label>
            <input
              className="px-4 gap-x-3 w-full py-2 border border-primary_text  text-primary_text bg-shadow rounded-lg  focus:outline-none focus:border focus:border-highlight "
              type="text"
              value={owner}
              onChange={handleInputChange(setOwner)}
            />
          </div>
          {/* Contact */}
          <div>
            <label className="block text-xl font-lato text-primary_text">
              Contact Number
            </label>
            <input
              className="px-4 gap-x-3 w-full py-2 border border-primary_text  text-primary_text bg-shadow rounded-lg  focus:outline-none focus:border focus:border-highlight "
              type="text"
              value={phone}
              onChange={handleInputChange(setPhone)}
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

export default TheatreModal;
