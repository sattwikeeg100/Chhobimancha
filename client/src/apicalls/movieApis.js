import axios from "axios";
const APIURL = import.meta.env.VITE_API_URL;

// Get all movies
export const GetAllMovies = async () => {
    try {
        const response = await axios.get(`${APIURL}/movies`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Get a movie by id
export const GetMovie = async (id) => {
    try {
        const response = await axios.get(`${APIURL}/movies/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// *********************** signed in user apis ****************************

// Create a movie review
export const AddMovieReview = async (id, review) => {
    try {
        const response = await axios.post(`${APIURL}/movies/${id}/reviews`, review);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// *********************** admin apis ****************************

// Create a movie
export const CreateMovie = async (payload) => {
    try {
        const response = await axios.post(`${APIURL}/movies`, review);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Update a movie
export const UpdateMovie = async (id, payload) => {
    try {
        const response = await axios.put(`${APIURL}/movies/${id}`, payload);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Delete a movie
export const DeleteMovie = async (id) => {
    try {
        const response = await axios.delete(`${APIURL}/movies/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Delete all movies
export const DeleteAllMovies = async () => {
    try {
        const response = await axios.post(`${APIURL}/movies`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};