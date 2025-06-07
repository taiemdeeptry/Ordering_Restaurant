import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "../common/Button";
import "./AuthForm.css";

const AuthForm = ({ type, onSubmit, error }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="auth-form">
            <div className="auth-form__container">
                <div className="auth-form__header">
                    <h1 className="auth-form__title">{type === "login" ? "Đăng nhập" : "Đăng ký"}</h1>
                    <p className="auth-form__subtitle">{type === "login" ? "Chào mừng trở lại! Vui lòng đăng nhập vào tài khoản của bạn." : "Tạo tài khoản mới để bắt đầu đặt món."}</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form__form">
                    {type === "register" && (
                        <div className="auth-form__group">
                            <label htmlFor="name" className="auth-form__label">
                                Họ và tên
                            </label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="auth-form__input" placeholder="Nhập họ và tên" required />
                        </div>
                    )}

                    <div className="auth-form__group">
                        <label htmlFor="email" className="auth-form__label">
                            Email
                        </label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="auth-form__input" placeholder="Nhập email" required />
                    </div>

                    <div className="auth-form__group">
                        <label htmlFor="password" className="auth-form__label">
                            Mật khẩu
                        </label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="auth-form__input" placeholder="Nhập mật khẩu" required />
                    </div>

                    {type === "register" && (
                        <div className="auth-form__group">
                            <label htmlFor="confirmPassword" className="auth-form__label">
                                Xác nhận mật khẩu
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="auth-form__input"
                                placeholder="Nhập lại mật khẩu"
                                required
                            />
                        </div>
                    )}

                    {error && <div className="auth-form__error">{error}</div>}

                    {type === "login" && (
                        <div className="auth-form__forgot-password">
                            <Link to="/forgot-password" className="auth-form__link">
                                Quên mật khẩu?
                            </Link>
                        </div>
                    )}

                    <Button type="submit" variant="primary" size="large" fullWidth className="auth-form__submit">
                        {type === "login" ? "Đăng nhập" : "Đăng ký"}
                    </Button>

                    <div className="auth-form__footer">
                        <p className="auth-form__text">
                            {type === "login" ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
                            <Link to={type === "login" ? "/register" : "/login"} className="auth-form__link">
                                {type === "login" ? "Đăng ký ngay" : "Đăng nhập"}
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

AuthForm.propTypes = {
    type: PropTypes.oneOf(["login", "register"]).isRequired,
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
};

export default AuthForm;
