import axios from "axios";

const Axios = axios.create({
    baseURL: "http://localhost:500/api",
});

export default Axios;
