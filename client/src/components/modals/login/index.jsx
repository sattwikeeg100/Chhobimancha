import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ isOpen, onClose, onSignUpClick, onForgotPassClick }) => {
    if (!isOpen) return null;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { loading, error } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLoginEvent = (e) => {
        e.preventDefault();
        let payload = {
            email,
            password,
        };
        dispatch(loginUser(payload)).then((result) => {
            if (result.payload) {
                setEmail("");
                setPassword("");
                navigate("/");
                window.location.reload();
            }
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <form onSubmit={handleLoginEvent}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="password"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                            onClick={onClose}>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded">
                            {loading ? "loading..." : "login"}
                        </button>
                    </div>
                    {error && (
                        <div className="alert alert-danger text-red-500" role="alert">
                            {JSON.stringify(error)}
                            {/* {typeof error === "string"
                                ? error
                                : JSON.stringify(error)} */}
                        </div>
                    )}
                    <button
                        onClick={onForgotPassClick}
                        className="text-blue-500">
                        Forgot Password?
                    </button>
                    <div className="flex-row w-full text-black items-center">
                        Don't have an account?{" "}
                        <button
                            onClick={onSignUpClick}
                            className="text-blue-500">
                            Sign Up Now
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
