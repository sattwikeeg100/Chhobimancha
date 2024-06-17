import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";

const AdminNavSidebar = ({ isOpen, toggleSidebar }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [user, setUser] = useState(null);
    const loggedInUser = useSelector((state) => state.user.user);

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
        dispatch(logoutUser());
        setUser(null);
        navigate("/");
        window.location.reload();
    };

    return (
        <div
            className={`fixed inset-y-0 left-0 transform ${
                isOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out bg-gray-800 text-white w-64 flex flex-col justify-around`}>
            <div className="p-4 mt-12 mb-0 flex flex-col justify-center items-center">
                <div className="flex-shrink-0 mb-2">
                    {user ? (
                        user.image ? (
                            <img
                                className="w-24 h-24 rounded-full"
                                src={user.image}
                                alt="User avatar"
                            />
                        ) : (
                            <div className="w-24 h-24 flex items-center justify-center bg-gray-700 rounded-full text-4xl font-semibold">
                                {getInitials(user.name)}
                            </div>
                        )
                    ) : (
                        <img
                            className="w-24 h-24 rounded-full"
                            src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.1141335507.1717372800&semt=ais_user"
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
                                className="block px-4 py-2 hover:bg-gray-700 rounded">
                                Dashboard
                            </NavLink>
                        </li>
                        <li className="mb-2">
                            <NavLink
                                to="/users"
                                className="block px-4 py-2 hover:bg-gray-700 rounded">
                                Manage Users
                            </NavLink>
                        </li>
                        <li className="mb-2">
                            <NavLink
                                to="/movies"
                                className="block px-4 py-2 hover:bg-gray-700 rounded">
                                Manage Movies
                            </NavLink>
                        </li>
                        <li className="mb-2">
                            <NavLink
                                to="/cineasts"
                                className="block px-4 py-2 hover:bg-gray-700 rounded">
                                Manage Cineasts
                            </NavLink>
                        </li>
                        <li className="mb-2">
                            <NavLink
                                to="/shows"
                                className="block px-4 py-2 hover:bg-gray-700 rounded">
                                Manage Shows
                            </NavLink>
                        </li>
                        <li className="mb-2">
                            <NavLink
                                to="/theatres"
                                className="block px-4 py-2 hover:bg-gray-700 rounded">
                                Manage Theatres
                            </NavLink>
                        </li>
                        <li className="mb-2">
                            <NavLink
                                to="/settings"
                                className="block px-4 py-2 hover:bg-gray-700 rounded">
                                Settings
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default AdminNavSidebar;
