import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { switchLoginModalOpen } from "../../../store/slices/loginModalOpenSlice";

const LoginModal = ({ onSignUpClick, onForgotPassClick }) => {
    const isOpen = useSelector((state) => state.loginModalOpen);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [tab, setTab] = useState("user");

    const { loading, error } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLoginEvent = async (e) => {
        e.preventDefault();
        let payload = {
            email,
            password,
            isLoggingAsAdmin: tab === "admin",
        };

        try {
            const result = await dispatch(loginUser(payload)).unwrap();
            if (result) {
                setEmail("");
                setPassword("");
                toast.success(`Welcome Back to Showtime360! (${tab})`);
                navigate("/");
                window.location.reload();
            }
        } catch (error) {
            toast.error("Login failed");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <div className="flex mb-4">
                    <button
                        className={`w-1/2 py-2 ${
                            tab === "user"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-300"
                        }`}
                        onClick={() => setTab("user")}>
                        User Login
                    </button>
                    <button
                        className={`w-1/2 py-2 ${
                            tab === "admin"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-300"
                        }`}
                        onClick={() => setTab("admin")}>
                        Admin Login
                    </button>
                </div>
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
                            className="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            onClick={() => dispatch(switchLoginModalOpen(false))}>
                            Cancel
                        </button>
                        {loading ? (
                            <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-not-allowed">
                                Logging in...
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded">
                                Login
                            </button>
                        )}
                    </div>
                    {error && (
                        <div
                            className="alert alert-danger text-red-500"
                            role="alert">
                            {error} !
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={onForgotPassClick}
                        className="text-blue-500">
                        Forgot Password?
                    </button>
                    <div className="flex-row w-full text-black items-center">
                        Don't have an account?{" "}
                        <button
                            type="button"
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