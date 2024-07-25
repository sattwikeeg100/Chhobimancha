import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// components
import Navbar from "./components/navbar";
import AdminNavSidebar from "./components/adminNavbar";
import Footer from "./components/footer";
import SkeletonAllShow from "./components/Skeletons/skeletonAllShow";

// main pages
import Home from "./pages/Home";
import AllMovies from "./pages/AllMovies";
import AllShows from "./pages/AllShows";
import SingleMovie from "./pages/SingleMovie";
import SingleShow from "./pages/SingleShow";
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
import NotFound from "./pages/NotFound";

import { Toaster } from "sonner";
import OAuthHandler from "./utils/oauthHandler";
import { useSelector } from "react-redux";

// icons

import { RiMenuFold2Line, RiMenuUnfold2Line } from "react-icons/ri";
import ScrollToTop from "./components/scrollToTop";
import WatchMovie from "./pages/WatchMovie";

const UserLayout = ({ children }) => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <Navbar open={open} setOpen={setOpen} />
      {children}
      <Footer />
    </>
  );
};

const AdminLayout = ({ children }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex">
      <AdminNavSidebar open={open} setOpen={setOpen} />
      <div
        className={`flex-1  transition-all duration-700 ${
          open ? "lg:ml-[200px]" : "ml-0"
        }`}
      >
        <div
          className={`lg:hidden fixed z-50 bottom-0 transition-all duration-700 ${
            open ? "left-[12.5rem] px-2 py-1" : "left-0 p-1"
          }`}
        >
          {" "}
          <h1
            className="text-2xl bg-gray-50 p-2 rounded-xl font-semibold cursor-pointer transition-transform duration-700"
            onClick={() => {
              setOpen(!open);
            }}
          >
            {open ? <RiMenuUnfold2Line /> : <RiMenuFold2Line />}
          </h1>
        </div>
        <div className="p-4 bg-background1">{children}</div>
      </div>
    </div>
  );
};

function App() {
  const user = useSelector((state) => state.user.userInfo);

  return (
    <BrowserRouter>
      {user?.isAdmin ? (
        <>
          <Toaster richColors position="top-right" closeButton="true" />
          <AdminLayout>
            <ScrollToTop />
            <Routes>
              <Route exact path="/" element={<AdminDashboard />} />
              <Route exact path="/users" element={<AdminUsers />} />
              <Route exact path="/movies" element={<AdminMovies />} />
              <Route exact path="/cineasts" element={<AdminCineasts />} />
              <Route exact path="/shows" element={<AdminShows />} />
              <Route exact path="/theatres" element={<AdminTheatres />} />
              <Route
                exact
                path="/settings"
                element={<AdminProfileSettings />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AdminLayout>
        </>
      ) : (
        <>
          <Toaster
            richColors
            position="top-right"
            className="mt-10"
            closeButton="true"
          />
          <UserLayout>
            <ScrollToTop />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="explore/movies" element={<AllMovies />} />
              <Route path="explore/shows" element={<AllShows />} />
              <Route path="explore/movies/:slug" element={<SingleMovie />} />
              <Route
                path="explore/movies/:slug/watch"
                element={<WatchMovie />}
              />
              <Route path="explore/shows/:slug" element={<SingleShow />} />
              <Route path="/subscribe" element={<SubscriptionPage />} />
              {user && (
                <Route path="/myfavourites" element={<MyFavourites />} />
              )}
              {user && <Route path="/mybookings" element={<MyBookings />} />}
              {user && <Route path="/myprofile" element={<MyProfile />} />}
              <Route path="/oauth" element={<OAuthHandler />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </UserLayout>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
