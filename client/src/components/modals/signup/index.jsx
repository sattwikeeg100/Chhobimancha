import React, { useState } from "react";
import axiosInstance from "../../../config/axiosInstance.js";
import { toast } from "sonner";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignUpModal = ({ isOpen, onClose, onLoginClick }) => {
    if (!isOpen) return null;

    const [imageFile, setImageFile] = useState(null);
    const [image, setImage] = useState();
    const [imageUploading, setImageUploading] = useState(false);
    const [error, setError] = useState(false);

    const APIURL = import.meta.env.VITE_API_URL;

    const handleImageFileUpload = async (imageFile) => {
        if (imageFile) {
            setImageUploading(true);
            const formData = new FormData();
            formData.append("file", imageFile);
            try {
                const response = await axiosInstance.post(
                    `${APIURL}/upload/image`,
                    formData
                );
                setImage(response.data.url);
                setImageFile(null);
                setImageUploading(false);
                console.log(response.data.url);
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        } else {
            return;
        }
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .matches(
                /^[a-zA-Z0-9_ ]*$/,
                "Name should not contain special characters"
            )
            .min(3, "Name must be at least 3 characters")
            .required("Username is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        const payload = {
            ...values,
            image,
        };
        try {
            const response = await axiosInstance.post(
                `${APIURL}/users`,
                payload
            );
            setError(null);
            toast.success("Registration successful !");
            onLoginClick();
        } catch (error) {
            console.log(error);
            setError(error.response.data.message);
            toast.error("Registration failed !");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                <Formik
                    initialValues={{
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}>
                    {({ isSubmitting, setFieldValue }) => (
                        <Form>
                            <div className="mb-4">
                                <label className="block text-gray-700">
                                    Name
                                </label>
                                <Field
                                    type="text"
                                    name="name"
                                    className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    autoComplete="username"
                                />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="text-red-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">
                                    Email
                                </label>
                                <Field
                                    type="email"
                                    name="email"
                                    className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    autoComplete="email"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-red-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">
                                    Password
                                </label>
                                <Field
                                    type="password"
                                    name="password"
                                    className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    autoComplete="password"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-red-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">
                                    Confirm Password
                                </label>
                                <Field
                                    type="password"
                                    name="confirmPassword"
                                    className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    autoComplete="password"
                                />
                                <ErrorMessage
                                    name="confirmPassword"
                                    component="div"
                                    className="text-red-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">
                                    Profile Image
                                </label>
                                <div className="flex flex-row gap-3">
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={(e) => {
                                            setImageFile(e.target.files[0]);
                                            setFieldValue(
                                                "image",
                                                e.target.files[0]
                                            );
                                        }}
                                        className="w-full text-black px-3 py-2 border rounded"
                                    />
                                    {image && (
                                        <img
                                            className="h-12 w-12 rounded-full"
                                            src={image}
                                        />
                                    )}
                                    {imageUploading ? (
                                        <button
                                            type="button"
                                            className="text-black cursor-not-allowed">
                                            Uploading...
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="text-black"
                                            onClick={() =>
                                                handleImageFileUpload(imageFile)
                                            }>
                                            <u>Upload</u>
                                        </button>
                                    )}
                                </div>
                            </div>
                            {error && (
                                <div
                                    className="alert alert-danger text-red-500"
                                    role="alert">
                                    {error} !
                                </div>
                            )}
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                    onClick={onClose}>
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                    disabled={isSubmitting}>
                                    {isSubmitting ? "Signing Up..." : "Sign Up"}
                                </button>
                            </div>
                            <div className="flex-row w-full text-black items-center">
                                Already a user?{" "}
                                <button
                                    type="button"
                                    onClick={onLoginClick}
                                    className="text-blue-500">
                                    Login
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default SignUpModal;