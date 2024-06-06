import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LoginModal from "../modals/login";
import SignUpModal from "../modals/signup";
import ForgotPasswordModal from "../modals/forgotpassword";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/slices/userSlice";

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setIsSignUpModalOpen] = useState(false);
    const [isForgotPassModalOpen, setIsForgotPassModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
    };

    const getInitials = (name) => {
        const names = name.split(" ");
        const initials = names.map((n) => n[0]).join("");
        return initials.toUpperCase();
    };

    const toggleLoginModal = () => {
        setIsLoginModalOpen(!isLoginModalOpen);
    };

    const toggleSignUpModal = () => {
        setIsSignUpModalOpen(!isSignupModalOpen);
    };

    const toggleForgotPassModal = () => {
        setIsForgotPassModalOpen(!isForgotPassModalOpen);
    };

    const switchToSignUpModal = () => {
        setIsLoginModalOpen(false);
        setIsSignUpModalOpen(true);
    };

    const switchToLoginModal = () => {
        setIsSignUpModalOpen(false);
        setIsForgotPassModalOpen(false);
        setIsLoginModalOpen(true);
    };

    const switchToForgotPassModal = () => {
        setIsLoginModalOpen(false);
        setIsForgotPassModalOpen(true);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        setUser(null);
        setIsDropdownOpen(false);
        navigate("/");
        window.location.reload();
    };

    return (
        <div className="bg-gray-900 text-white font-semibold py-4 px-8 flex justify-between items-center">
            <div className="text-xl font-bold">
                <NavLink to="/" className="hover:text-gray-400">
                    Showtime360
                </NavLink>
            </div>
            <nav className="flex space-x-4">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "text-yellow-400" : "hover:text-gray-400"
                    }
                    end>
                    Home
                </NavLink>
                <NavLink
                    to="/explore/movies"
                    className={({ isActive }) =>
                        isActive ? "text-yellow-400" : "hover:text-gray-400"
                    }>
                    Explore Movies
                </NavLink>
                <NavLink
                    to="/explore/shows"
                    className={({ isActive }) =>
                        isActive ? "text-yellow-400" : "hover:text-gray-400"
                    }>
                    Book a show
                </NavLink>
                {user ? (
                    <NavLink
                        to="/favorites"
                        className={({ isActive }) =>
                            isActive ? "text-yellow-400" : "hover:text-gray-400"
                        }>
                        My Favorites
                    </NavLink>
                ) : null}
            </nav>

            <div className="flex justify-between space-x-6">
                <form onSubmit={handleSearch} className="flex items-center">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search..."
                        className="px-2 py-1 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-yellow-400"
                    />
                </form>

                <div className="relative ml-4 flex items-center">
                    {user ? (
                        <>
                            {user.image ? (
                                <img
                                    src={user.image}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full cursor-pointer"
                                    onClick={toggleDropdown}
                                />
                            ) : (
                                <div
                                    className="bg-gray-800 w-8 h-8 rounded-full flex items-center justify-center text-lg cursor-pointer"
                                    onClick={toggleDropdown}>
                                    {getInitials(user.name)}
                                </div>
                            )}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-56 w-48 bg-white rounded-md shadow-lg py-2 text-gray-800">
                                    <NavLink
                                        to="/favorites"
                                        className="block px-4 py-2 hover:bg-gray-200"
                                        onClick={() =>
                                            setIsDropdownOpen(false)
                                        }>
                                        My Favorites
                                    </NavLink>
                                    <NavLink
                                        to="/bookings"
                                        className="block px-4 py-2 hover:bg-gray-200"
                                        onClick={() =>
                                            setIsDropdownOpen(false)
                                        }>
                                        My Bookings
                                    </NavLink>
                                    <NavLink
                                        to="/profile"
                                        className="block px-4 py-2 hover:bg-gray-200"
                                        onClick={() =>
                                            setIsDropdownOpen(false)
                                        }>
                                        My Profile
                                    </NavLink>
                                    <button
                                        className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                                        onClick={handleLogout}>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <button
                            onClick={toggleLoginModal}
                            className="bg-yellow-400 text-gray-900 px-4 py-2 rounded">
                            Login
                        </button>
                    )}
                </div>
            </div>

            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={toggleLoginModal}
                onSignUpClick={switchToSignUpModal}
                onForgotPassClick={switchToForgotPassModal}
            />

            <SignUpModal
                isOpen={isSignupModalOpen}
                onClose={toggleSignUpModal}
                onLoginClick={switchToLoginModal}
            />

            <ForgotPasswordModal
                isOpen={isForgotPassModalOpen}
                onClose={toggleForgotPassModal}
                onLoginClick={switchToLoginModal}
            />
        </div>
    );
};

export default Navbar;