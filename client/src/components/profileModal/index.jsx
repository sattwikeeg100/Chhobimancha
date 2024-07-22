// src/components/ProfileModal.jsx
import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/slices/userSlice";
import { toast } from "sonner";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  handleImageFileDelete,
  handleImageFileUpload,
} from "../../utils/fileHandler";

const ProfileModal = ({ profile, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageDeleting, setImageDeleting] = useState(false);
  const [saveRequire, setSaveRequire] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
      setImage(profile.image);
    }
  }, [profile]);

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image && profile.image) {
      toast.warning("Upload profile image before saving!");
      return;
    }
    setLoading(true);
    try {
      const profileData = { name, email, image };
      dispatch(updateUser(profileData));
      toast.success("Profile updated successfully!");
      setSaveRequire(false);
      onClose();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile!");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (!image && profile.image) {
      toast.warning("Upload profile image before leaving!");
      return;
    }
    if (saveRequire) {
      toast.warning("You need to save the changes before leaving!");
      return;
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background1 bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
      <div className=" bg-shadow text-primary_text p-6 rounded-lg shadow-lg w-[90%]  sm:w-full max-w-[22rem] sm:max-w-md transform transition-transform duration-300 scale-105">
        <h2 className="text-3xl font-montserrat font-bold mb-4">
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-secondary_text mb-1">Name</label>
            <input
              className="w-full px-4 py-2 border rounded-lg bg-shadow text-primary_text focus:outline-none focus:ring-2 focus:ring-highlight"
              type="text"
              value={name}
              onChange={handleInputChange(setName)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-secondary_text mb-1">Email</label>
            <input
              className="w-full px-4 py-2 border rounded-lg bg-shadow text-primary_text focus:outline-none focus:ring-2 focus:ring-highlight"
              type="email"
              value={email}
              onChange={handleInputChange(setEmail)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-secondary_text mb-1">
              Profile Image
            </label>
            <div className="flex items-center space-x-3">
              {imageUploading ? (
                <label className="bg-highlight hover:bg-highlight_hover text-primary_text px-4 py-2 rounded transition-all duration-300 cursor-pointer font-ubuntu font-semibold">
                  Uploading image...
                </label>
              ) : (
                <label
                  className="bg-highlight hover:bg-highlight_hover text-primary_text px-4 py-2 rounded transition-all duration-300 cursor-pointer font-ubuntu font-semibold"
                  htmlFor="imageUpload"
                >
                  Upload image
                </label>
              )}
              <input
                id="imageUpload"
                type="file"
                className="hidden"
                onChange={(e) => {
                  setSaveRequire(true);
                  handleImageFileUpload(
                    e.target.files[0],
                    image,
                    setImage,
                    setImageUploading
                  );
                }}
              />
            </div>
            {image && (
              <div className="mt-4 w-fit flex items-center gap-x-3 ">
                <img
                  src={image}
                  alt="Profile"
                  className="h-32 w-32 rounded-full object-cover"
                />
                {imageDeleting ? (
                  <AiOutlineLoading3Quarters className="animate-spin text-primary_text" />
                ) : (
                  <MdDeleteForever
                    size={32}
                    onClick={() =>
                      handleImageFileDelete(image, setImage, setImageDeleting)
                    }
                    className="cursor-pointer h-8 w-8 rounded-lg bg-primary_text hover:bg-red-800 text-highlight hover:text-primary_text"
                  />
                )}
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-primary_text px-4 py-2 rounded mr-2 transition-all duration-300 font-semibold"
              onClick={() => handleCancel()}
              type="button"
            >
              Cancel
            </button>
            {loading ? (
              <button className="bg-highlight_hover cursor-not-allowed text-primary_text px-4 py-2 rounded transition-all duration-300 font-semibold">
                Saving...
              </button>
            ) : (
              <button
                className="bg-highlight hover:bg-highlight_hover text-primary_text px-4 py-2 rounded transition-all duration-300 font-semibold"
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

export default ProfileModal;
