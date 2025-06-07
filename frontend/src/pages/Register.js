import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthForm from "../components/auth/AuthForm";
import "./Auth.css";

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [error, setError] = useState("");

    const handleSubmit = async (formData) => {
        if (formData.password !== formData.confirmPassword) {
            setError("Mật khẩu không khớp");
            return;
        }

        try {
            await register(formData.name, formData.email, formData.password);
            navigate("/");
        } catch (err) {
            setError("Email đã được sử dụng");
        }
    };

    return <AuthForm type="register" onSubmit={handleSubmit} error={error} />;
};

export default Register;
