import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header1 from "./components/header1";
import Home from "./pages/Home";
import AllMovies from "./pages/AllMovies";
import AllShows from "./pages/AllShows";
import SingleMovie from "./pages/SingleMovie";
import SeatBookingPage from "./pages/SingleShow";

const Layout = ({ children }) => {
  return (
    <>
      <Header1 />
      {children}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="explore/movies" element={<AllMovies />} />
          <Route path="explore/shows" element={<AllShows />} />
          <Route path="explore/singlemovie" element={<SingleMovie />} />
          <Route path="explore/singleshow" element={<SeatBookingPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
