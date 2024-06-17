import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import AllMovies from "./pages/AllMovies";
import AllShows from "./pages/AllShows";
import SingleMovie from "./pages/SingleMovie";
import SingleShow from "./pages/SingleShow";
import AdminNavSidebar from "./components/adminNavbar";
import AdminDashboard from "./pages/AdminDashboard";
import AdminMovies from "./pages/AdminMovies";
import AdminShows from "./pages/AdminShows";
import AdminProfileSettings from "./pages/AdminSettings";
import AdminUsers from "./pages/AdminUsers";
import AdminTheatres from "./pages/AdminTheatres";
import AdminCineasts from "./pages/AdminCineasts";
import MyFavourites from "./pages/MyFavourites";
import MyBookings from "./pages/MyBookings";
import MyProfile from "./pages/MyProfile";
import SubscriptionPage from "./pages/SubscriptionPage";

const UserLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
};

const AdminLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex">
            <AdminNavSidebar
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
            />
            <div
                className={`flex-1 p-4 transition-all duration-300 ${
                    isSidebarOpen ? "ml-64" : "ml-0"
                }`}>
                <button
                    onClick={toggleSidebar}
                    className="mb-4 bg-gray-800 text-white px-4 py-2 rounded">
                    {isSidebarOpen ? "𐤕" : "☰"}
                </button>
                {children}
            </div>
        </div>
    );
};


function App() {
    // Initialize user state properly
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <Provider store={store}>
            <BrowserRouter>
                {user?.isAdmin ? (
                    <AdminLayout>
                        <Routes>
                            <Route
                                exact
                                path="/"
                                element={<AdminDashboard />}
                            />
                            <Route
                                exact
                                path="/users"
                                element={<AdminUsers />}
                            />
                            <Route
                                exact
                                path="/movies"
                                element={<AdminMovies />}
                            />
                            <Route
                                exact
                                path="/cineasts"
                                element={<AdminCineasts />}
                            />
                            <Route
                                exact
                                path="/shows"
                                element={<AdminShows />}
                            />
                            <Route
                                exact
                                path="/theatres"
                                element={<AdminTheatres />}
                            />
                            <Route
                                exact
                                path="/settings"
                                element={<AdminProfileSettings />}
                            />
                            <Route
                                path="*"
                                element={<div>Page not found(admin) ...</div>}
                            />
                        </Routes>
                    </AdminLayout>
                ) : (
                    <UserLayout>
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route
                                path="explore/movies"
                                element={<AllMovies />}
                            />
                            <Route
                                path="explore/shows"
                                element={<AllShows />}
                            />
                            <Route
                                path="explore/movies/:slug"
                                element={<SingleMovie />}
                            />
                            <Route
                                path="explore/shows/:slug"
                                element={<SingleShow />}
                            />
                            <Route
                                path="/myfavourites"
                                element={<MyFavourites />}
                            />
                            <Route
                                path="/mybookings"
                                element={<MyBookings />}
                            />
                            <Route path="/myprofile" element={<MyProfile />} />
                            <Route path="/myprofile" element={<MyProfile />} />
                            <Route path="/subscribe" element={<SubscriptionPage />} />
                            <Route
                                path="*"
                                element={<div>Page not found...</div>}
                            />
                        </Routes>
                    </UserLayout>
                )}
            </BrowserRouter>
        </Provider>
    );
}

export default App;