import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header1 = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Initialize user state properly
  const [user, setUser] = useState({
    name: "Sattwikee Ghosh",
    image: "https://avatars.githubusercontent.com/u/105354525?v=4",
  });

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const getInitials = (name) => {
    const names = name.split(" ");
    const initials = names.map((n) => n[0]).join("");
    return initials.toUpperCase();
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
        {user ? (
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? "text-yellow-400" : "hover:text-gray-400"
            }
          >
            My Favorites
          </NavLink>
        ) : (
          <></>
        )}
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

        <div className="ml-4 flex items-center">
          {user ? (
            user.image ? (
              <img
                src={user.image}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="bg-gray-800 w-8 h-8 rounded-full flex items-center justify-center text-lg">
                {getInitials(user.name)}
              </div>
            )
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-yellow-400 text-gray-900 px-4 py-2 rounded"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header1;
