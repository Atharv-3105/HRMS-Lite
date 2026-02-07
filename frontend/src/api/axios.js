import axios from "axios";

const api = axios.create({
    baseURL: "https://hrms-lite-ds5d.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;