import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Tạo instance axios với baseURL
    const api = axios.create({
        baseURL: "http://localhost:5000/api",
        headers: {
            "Content-Type": "application/json",
        },
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            fetchUser();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUser = async () => {
        try {
            const response = await api.get("/auth/me");
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user:", error);
            localStorage.removeItem("token");
            delete api.defaults.headers.common["Authorization"];
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await api.post("/auth/login", {
                email,
                password,
            });

            if (!response.data || !response.data.token) {
                throw new Error("No token received from server");
            }

            const { token, user } = response.data;

            // Lưu token vào localStorage
            localStorage.setItem("token", token);

            // Thêm token vào header của tất cả các request
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            // Cập nhật state user
            setUser(user);

            return { success: true };
        } catch (error) {
            console.error("Login error:", error);
            return {
                success: false,
                error: error.response?.data?.message || "Login failed",
            };
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
