import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// Thêm interceptor để tự động thêm token vào header
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        console.log("API Request Config:", {
            url: config.url,
            method: config.method,
            headers: config.headers,
            token: token,
            fullUrl: `${config.baseURL}${config.url}`,
            withCredentials: config.withCredentials,
        });
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error("API Request Error:", error);
        return Promise.reject(error);
    }
);

// Thêm interceptor để log response
api.interceptors.response.use(
    (response) => {
        console.log("API Response:", {
            status: response.status,
            data: response.data,
            headers: response.headers,
            config: response.config,
        });
        return response;
    },
    (error) => {
        console.error("API Response Error:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            headers: error.response?.headers,
            config: error.config,
        });
        return Promise.reject(error);
    }
);

export default api;
