import axios from "axios";
const APIURL = import.meta.env.VITE_API_URL;

// Get all categories
export const GetAllCategories = async () => {
    try {
        const response = await axios.get(`${APIURL}/categories`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// *********************** admin apis ****************************

// Create a new category
export const CreateCategory = async (payload) => {
    try {
        const response = await axios.post(`${APIURL}/categories`, payload);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Update a category
export const UpdateCategory = async (id, payload) => {
    try {
        const response = await axios.put(`${APIURL}/categories/${id}`, payload);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Delete a category
export const DeleteCategory = async (id) => {
    try {
        const response = await axios.delete(`${APIURL}/categories/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};