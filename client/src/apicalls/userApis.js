import axios from "axios";
const APIURL = import.meta.env.VITE_API_URL;

// Register a new user
export const Register = async (payload) => {
    try {
        const response = await axios.post(`${APIURL}/users`, payload);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Log in a user
export const Login = async ({ email, password }) => {
    try {
        const response = await axios.post(`${APIURL}/users/login`, {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// *********************** signed in user apis ****************************

// Update user profile
export const UpdateProfile = async (payload) => {
    try {
        const response = await axios.put(`${APIURL}/users`, payload);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Delete user profile
export const DeleteProfile = async () => {
    try {
        const response = await axios.delete(`${APIURL}/users`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Add movie to favourites
export const AddToFavourites = async (movieId) => {
    try {
        const response = await axios.post(`${APIURL}/users/favourites`, {
            movieId: movieId,
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Get all favorites
export const GetAllFavourites = async () => {
    try {
        const response = await axios.get(`${APIURL}/users/favourites`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Delete all favorites
export const DeleteAllFavourites = async () => {
    try {
        const response = await axios.delete(`${APIURL}/users/favourites`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// *********************** admin apis ****************************

// Get all users
export const GetAllUsers = async () => {
    try {
        const response = await axios.get(`${APIURL}/users`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Delete a user
export const DeleteAUser = async (id) => {
    try {
        const response = await axios.delete(`${APIURL}/users/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};