import React, { createContext, useState, useContext, useEffect } from "react";
import { authService } from "../services/api";
import { websocketService } from "../services/websocket";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchCurrentUser();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchCurrentUser = async () => {
        try {
            const user = await authService.getCurrentUser();
            setUser(user);
            websocketService.connect();
        } catch (error) {
            console.error("Error fetching current user:", error);
            localStorage.removeItem("token");
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        const response = await authService.login(credentials);
        localStorage.setItem("token", response.token);
        setUser(response.user);
        websocketService.connect();
    };

    const register = async (userData) => {
        const response = await authService.register(userData);
        localStorage.setItem("token", response.token);
        setUser(response.user);
        websocketService.connect();
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        websocketService.disconnect();
    };

    return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
