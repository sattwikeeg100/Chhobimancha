import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import ShowDetails from "./pages/showDetails/showDetails";
import Login from "./pages/modals/login/Login";
import SignUp from "./pages/modals/signup/Signup";
import AllShows from "./pages/allShows/allShows";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:mediaType/:id" element={<Details />} />
                <Route path="/search/:query" element={<SearchResult />} />
                <Route path="/explore/movies" element={<Explore />} />
                <Route path="/shows" element={<AllShows />} />
                <Route path="/show/slug" element={<ShowDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/singlemovie" element={<Details />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
