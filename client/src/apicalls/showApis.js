import axios from "axios";
const APIURL = import.meta.env.VITE_API_URL;

// Get all shows available
export const GetAllShows = async () => {
    try {
        const response = await axios.get(`${APIURL}/shows`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// *********************** admin apis ****************************

// Add a new show
export const CreateShow = async (payload) => {
    try {
        const response = await axios.post(`${APIURL}/shows`, payload);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Update a show
export const UpdateShow = async (id, payload) => {
    try {
        const response = await axios.put(`${APIURL}/shows/${id}`, payload);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Delete a show
export const DeleteShow = async (id) => {
    try {
        const response = await axios.delete(`${APIURL}/shows/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
