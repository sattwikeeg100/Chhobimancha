import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { IoIosLogOut } from "react-icons/io";

const AdminNavSidebar = ({ open }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //   const user = useSelector((state) => state.user.userInfo);
  const [user, setUser] = useState(null);

  const loggedInUser = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const getInitials = (name) => {
    const names = name.split(" ");
    const initials = names.map((name) => name[0]).join("");
    return initials.toUpperCase();
  };

  const handleLogout = () => {
    try {
      dispatch(logoutUser());
      setUser(null);

      navigate("/");
      window.location.reload();
      toast.success("Please visit again!");
    } catch (e) {
      toast.error("Failed logging out! Please try again.");
    }
  };

  return (
    <div
      className={`fixed z-50 lg:flex inset-y-0 left-0 transform ${
        open ? "w-[200px]" : "w-[0px]"
      } overflow-auto transition-width duration-700 bg-background2 text-white flex flex-col items-center `}
    >
      <div className="p-4 flex flex-col justify-center items-center">
        <div className="flex-shrink-0 mb-2">
          {user ? (
            user.image ? (
              <img
                className="w-24 h-24 rounded-full"
                src={user.image}
                alt="User avatar"
              />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center bg-shadow rounded-full text-4xl font-semibold">
                {getInitials(user.name)}
              </div>
            )
          ) : (
            <img
              className="w-24 h-24 rounded-full"
              src="\avatar.jpg"
              alt="User avatar"
            />
          )}
        </div>
        <div className="ml-4">
          <p className="text-xl font-semibold">{user?.name}</p>
        </div>
      </div>
      <div className="p-4">
        <nav>
          <ul>
            <li className="mb-2">
              <NavLink
                to="/"
                className="block px-4 py-2 hover:bg-gray-700 rounded"
              >
                Dashboard
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/users"
                className="block px-4 py-2 hover:bg-gray-700 rounded"
              >
                Manage Users
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/movies"
                className="block px-4 py-2 hover:bg-gray-700 rounded"
              >
                Manage Movies
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/cineasts"
                className="block px-4 py-2 hover:bg-gray-700 rounded"
              >
                Manage Cineasts
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/shows"
                className="block px-4 py-2 hover:bg-gray-700 rounded"
              >
                Manage Shows
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/theatres"
                className="block px-4 py-2 hover:bg-gray-700 rounded"
              >
                Manage Theatres
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/settings"
                className="block px-4 py-2 hover:bg-gray-700 rounded"
              >
                Profile Settings
              </NavLink>
            </li>
            <li className="mb-2" onClick={handleLogout}>
              <NavLink className=" px-4 py-2 hover:bg-gray-700 flex flex-row text-md hover:underline hover:font-bold justify-center items-center gap-2">
                <button>Logout</button>
                <IoIosLogOut className="mt-1" />
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      {/* <button onClick={handleLogout}>
        <span className="flex flex-row text-md hover:underline hover:font-bold justify-center items-center gap-2">
          Logout
          <IoIosLogOut className="mt-1" />
        </span>
      </button> */}
    </div>
  );
};

export default AdminNavSidebar;
