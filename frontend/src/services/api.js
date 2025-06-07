import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // Unauthorized - Token hết hạn hoặc không hợp lệ
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                    break;
                case 403:
                    // Forbidden - Không có quyền truy cập
                    return Promise.reject(new Error("Bạn không có quyền thực hiện hành động này"));
                case 404:
                    // Not Found
                    return Promise.reject(new Error("Không tìm thấy tài nguyên"));
                case 500:
                    // Server Error
                    return Promise.reject(new Error("Lỗi máy chủ. Vui lòng thử lại sau"));
                default:
                    // Other errors
                    return Promise.reject(new Error(error.response.data.message || "Đã có lỗi xảy ra"));
            }
        } else if (error.request) {
            // Network error
            return Promise.reject(new Error("Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng"));
        } else {
            // Other errors
            return Promise.reject(new Error("Đã có lỗi xảy ra"));
        }
    }
);

// Auth service
export const authService = {
    login: (credentials) => api.post("/auth/login", credentials),
    register: (userData) => api.post("/auth/register", userData),
    getCurrentUser: () => api.get("/auth/me"),
};

// Category service
export const categoryService = {
    getAll: async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/categories`);
            return response.data;
        } catch (error) {
            console.error("Error fetching categories:", error);
            throw error;
        }
    },
    getById: (id) => api.get(`/categories/${id}`),
};

// Menu item service
export const menuItemService = {
    getAll: async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/menu-items`);
            return response.data;
        } catch (error) {
            console.error("Error fetching menu items:", error);
            throw error;
        }
    },
    getById: (id) => api.get(`/menu-items/${id}`),
    getByCategory: async (categoryId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/menu-items/category/${categoryId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching menu items by category:", error);
            throw error;
        }
    },
};

// Order service
export const orderService = {
    create: (orderData) => api.post("/orders", orderData),
    getAll: () => api.get("/orders"),
    getById: (id) => api.get(`/orders/${id}`),
    update: (id, orderData) => api.put(`/orders/${id}`, orderData),
    cancel: (id) => api.post(`/orders/${id}/cancel`),
};

// Table service
export const tableService = {
    getAll: () => api.get("/tables"),
    getById: (id) => api.get(`/tables/${id}`),
};

export default api;
