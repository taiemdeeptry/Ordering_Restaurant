import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthForm from "../components/auth/AuthForm";
import "./Auth.css";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [error, setError] = useState("");

    const handleSubmit = async (formData) => {
        try {
            await login(formData.email, formData.password);
            navigate("/");
        } catch (err) {
            setError("Email hoặc mật khẩu không đúng");
        }
    };

    return <AuthForm type="login" onSubmit={handleSubmit} error={error} />;
};

export default Login;
