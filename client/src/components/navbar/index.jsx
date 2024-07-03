import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LoginModal from "../modals/login";
import SignUpModal from "../modals/signup";
import ForgotPasswordModal from "../modals/forgotpassword";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../store/slices/userSlice";
import { setTheme } from "../../store/slices/themeSlice";
import { setLanguage } from "../../store/slices/languageSlice";
import { LuSunMedium } from "react-icons/lu";
import { RiMoonClearLine } from "react-icons/ri";
import { toast } from "sonner";
import { switchLoginModalOpen } from "../../store/slices/loginModalOpenSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSignupModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isForgotPassModalOpen, setIsForgotPassModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  const storedUser = useSelector((state) => state.user.userInfo);
  useEffect(() => {
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const getInitials = (name) => {
    const names = name.split(" ");
    const initials = names.map((n) => n[0]).join("");
    return initials.toUpperCase();
  };

  const openLoginModal = () => {
    dispatch(switchLoginModalOpen(true));
  };

  const toggleSignUpModal = () => {
    setIsSignUpModalOpen(!isSignupModalOpen);
  };

  const toggleForgotPassModal = () => {
    setIsForgotPassModalOpen(!isForgotPassModalOpen);
  };

  const switchToSignUpModal = () => {
    dispatch(switchLoginModalOpen(false));
    setIsSignUpModalOpen(true);
  };

  const switchToLoginModal = () => {
    setIsSignUpModalOpen(false);
    setIsForgotPassModalOpen(false);
    dispatch(switchLoginModalOpen(true));
  };

  const switchToForgotPassModal = () => {
    dispatch(switchLoginModalOpen(false));
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
    toast.success("Please visit again!");
  };

  const theme = useSelector((state) => state.theme);
  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    if (newTheme !== theme) {
      dispatch(setTheme(newTheme));
    }
    alert("The theme change functionality is coming soon...");
  };

  const language = useSelector((state) => state.language);
  const handleLangTranslation = () => {
    const newLang = language === "english" ? "bengali" : "english";
    if (newLang !== language) {
      dispatch(setLanguage(newLang));
    }
    alert("The language change functionality is coming soon...");
  };

  return (
    <div className=" bg-background2 text-white font-semibold py-4 px-8 flex justify-between items-center">
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
          end
        >
          Home
        </NavLink>
        <NavLink
          to="/explore/movies"
          className={({ isActive }) =>
            isActive ? "text-yellow-400" : "hover:text-gray-400"
          }
        >
          Explore Movies
        </NavLink>
        <NavLink
          to="/explore/shows"
          className={({ isActive }) =>
            isActive ? "text-yellow-400" : "hover:text-gray-400"
          }
        >
          Book a show
        </NavLink>
        <NavLink
          to="/subscribe"
          className={({ isActive }) =>
            isActive ? "text-yellow-400" : "hover:text-gray-400"
          } 
        >
          Buy Subscription
        </NavLink>
      </nav>

      <div className="flex justify-between space-x-6">
        <button onClick={() => handleThemeChange()} className="h-50 w-50">
          {theme === "dark" ? <LuSunMedium /> : <RiMoonClearLine />}
        </button>

        <button
          onClick={() => handleLangTranslation()}
          className="font-medium hover:font-bold"
        >
          {language === "english" ? "BENG" : "ENG"}
        </button>

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
                  onClick={toggleDropdown}
                >
                  {getInitials(user.name)}
                </div>
              )}
              {isDropdownOpen && (
                <div className="z-30 absolute right-0 mt-56 w-48 bg-white rounded-md shadow-lg py-2 text-gray-800">
                  <NavLink
                    to="/myfavourites"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    My Favorites
                  </NavLink>
                  <NavLink
                    to="/mybookings"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    My Bookings
                  </NavLink>
                  <NavLink
                    to="/myprofile"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    My Profile
                  </NavLink>
                  <button
                    className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={openLoginModal}
              className="bg-yellow-400 text-gray-900 px-4 py-2 rounded"
            >
              Login
            </button>
          )}
        </div>
      </div>

      <LoginModal
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
