import axios from "axios";
const APIURL = import.meta.env.VITE_API_URL;

// Get all theatres
export const GetAllTheatres = async () => {
    try {
        const response = await axios.get(`${APIURL}/theatres`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// *********************** admin apis ****************************

// Add a new theatre
export const CreateTheatre = async (payload) => {
    try {
        const response = await axios.post(`${APIURL}/theatres`, payload);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Update a theatre
export const UpdateTheatre = async (id, payload) => {
    try {
        const response = await axios.put(`${APIURL}/theatres/${id}`, payload);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Delete a theatre
export const DeleteTheatre = async (id) => {
    try {
        const response = await axios.delete(`${APIURL}/theatres/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
