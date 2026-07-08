import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost:8080",
    baseURL: "http://192.168.178.25:8080",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },

});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token && !config.url.includes("/api/auth/")) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
