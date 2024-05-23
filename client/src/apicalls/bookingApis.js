import axios from "axios";
const APIURL = import.meta.env.VITE_API_URL;


// *********************** signed in user apis ****************************

// Get all bookings by the user
export const GetAllBookings = async () => {
    try {
        const response = await axios.get(`${APIURL}/bookings`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Book a show
export const BookAShow = async (payload) => {
    try {
        const response = await axios.post(`${APIURL}/bookings`, payload);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
